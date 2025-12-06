// ==UserScript==
// @name         Discogs Grading & Location Helper Panel
// @namespace    http://tampermonkey.net/
// @version      5.6
// @description  Adds a sticky panel to Discogs with grading, location, "In collection" filter, and "Unique items" filter, with dark theme. Now with dynamic loading of all custom fields via API token.
// @author       You
// @match        https://www.discogs.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

(async function () {
    'use strict';

    // =================DEFINITIONS=================
    const PANEL_STATE_STORAGE_KEY = 'dhp_panel_state';
    const SELECTIONS_STORAGE_KEY = 'dhp_selections';
    const TOKEN_STORAGE_KEY = 'dhp_api_token';
    const SCRIPT_VERSION = '5.6';
    let allCustomFields = [];

    // Persisted query hash for the SINGLE item note edit, captured from user's network traffic
    const EDIT_ITEM_NOTE_HASH = "759194518a1e8634735edc1b68d5c511b467fd1901249a7ac7d2d8387f7899db";

    const COLLECTION_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" alt="Collection"><title>Collection</title><path d="M19.5846 20.5964C18.8055 20.5964 18.1719 19.9628 18.1719 19.1837V4.41267C18.1719 3.63359 18.8055 3 19.5846 3C20.3636 3 20.9972 3.63359 20.9972 4.41267V19.1837C20.9972 19.9628 20.3636 20.5964 19.5846 20.5964Z" fill="#FEFEFE"></path><path d="M15.858 20.5964C15.0789 20.5964 14.4453 19.9628 14.4453 19.1837V4.41267C14.4453 3.63359 15.0789 3 15.858 3C16.6371 3 17.2707 3.63359 17.2707 4.41267V19.1837C17.2707 19.9628 16.6371 20.5964 15.858 20.5964Z" fill="#FEFEFE"></path><path d="M12.1236 20.5964C11.3445 20.5964 10.7109 19.9628 10.7109 19.1837V4.41267C10.7109 3.63359 11.3445 3 12.1236 3C12.9027 3 13.5363 3.63359 13.5363 4.41267V19.1837C13.5363 19.9628 12.9027 20.5964 12.1236 20.5964Z" fill="#FEFEFE"></path><path d="M3.41022 20.1624C3.25167 20.1624 3.09016 20.1369 2.93517 20.0799C2.20063 19.8168 1.82059 19.0092 2.08305 18.2747L7.06454 4.36827C7.3276 3.63373 8.13518 3.25369 8.86973 3.51616C9.60427 3.77862 9.98431 4.5868 9.72185 5.32134L4.74036 19.2278C4.53134 19.8044 3.98978 20.1618 3.41022 20.1618V20.1624Z" fill="#FEFEFE"></path></svg>`;

    // =================UTILITIES=================

    async function fetchDiscogsUsername(token) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://api.discogs.com/oauth/identity",
                headers: {
                    "User-Agent": `DiscogsGradingHelperPanel/${SCRIPT_VERSION}`,
                    "Authorization": `Discogs token=${token}`
                },
                onload: res => (res.status === 200) ? resolve(JSON.parse(res.responseText).username || null) : resolve(null),
                onerror: () => resolve(null)
            });
        });
    }

    async function getCustomFields() {
        const token = GM_getValue(TOKEN_STORAGE_KEY, '');
        if (!token) return { error: true, status: 'No Token', responseText: 'Please enter and save your token.' };
        const username = await fetchDiscogsUsername(token);
        if (!username) return { error: true, status: 'Invalid Token', responseText: 'Could not fetch username. Please check your token.' };

        const url = `https://api.discogs.com/users/${username}/collection/fields`;
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "GET", url,
                headers: {
                    "User-Agent": `DiscogsGradingHelperPanel/${SCRIPT_VERSION}`,
                    "Authorization": `Discogs token=${token}`
                },
                onload: function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        const data = JSON.parse(response.responseText);
                        allCustomFields = data.fields || [];
                        const fetched = { mc: {}, sc: {}, or: {}, pl: {} };
                        allCustomFields.forEach(f => {
                            if (f.type === "dropdown" && f.options) {
                                const opts = f.options.reduce((acc, opt) => { acc[opt] = opt; return acc; }, {});
                                const name = f.name.toLowerCase();
                                if (name === 'media condition') fetched.mc = opts;
                                else if (name === 'sleeve condition') fetched.sc = opts;
                                else if (name === 'origin') fetched.or = opts;
                                else if (name === 'placement') fetched.pl = opts;
                            }
                        });
                        resolve(fetched);
                    } else {
                        resolve({ error: true, status: response.status, responseText: response.responseText });
                    }
                },
                onerror: (error) => resolve({ error: true, status: 'Network Error', responseText: JSON.stringify(error) })
            });
        });
    }

    // =================UI HELPERS=================

    let statusTimeout;
    function displayStatusMessage(text, type = 'error', duration = 5000) {
        const statusArea = document.getElementById('dhp-status-area');
        if (!statusArea) return;
        clearTimeout(statusTimeout);
        statusArea.innerText = text;
        statusArea.style.display = 'block';
        statusArea.style.color = type === 'success' ? '#28a745' : (type === 'info' ? '#17a2b8' : '#dc3545');
        if (duration > 0) {
            statusTimeout = setTimeout(() => { statusArea.style.display = 'none'; }, duration);
        }
    }

    function createTokenInput(id, savedToken) {
        const container = document.createElement('div');
        container.id = 'dhp-token-container';
        Object.assign(container.style, { display: 'flex', flexDirection: 'column', marginBottom: '15px' });
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = 'Discogs API Token';
        Object.assign(label.style, { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', color: 'white' });
        const inputContainer = document.createElement('div');
        Object.assign(inputContainer.style, { display: 'flex', gap: '5px' });
        const input = document.createElement('input');
        input.type = 'password';
        input.id = id;
        input.value = savedToken;
        input.placeholder = 'Paste token here';
        Object.assign(input.style, { flex: '1', padding: '6px', borderRadius: '4px', border: '1px solid #555', backgroundColor: 'rgb(80, 80, 80)', color: 'white' });
        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'Save';
        Object.assign(saveBtn.style, { padding: '6px 10px', borderRadius: '4px', border: 'none', backgroundColor: '#00c700', color: 'white', cursor: 'pointer' });
        
        saveBtn.addEventListener('click', () => {
            const token = input.value.trim();
            if (token) {
                GM_setValue(TOKEN_STORAGE_KEY, token);
                displayStatusMessage("Token saved. Reloading page...", 'success', 0);
                setTimeout(() => location.reload(), 1500);
            } else {
                displayStatusMessage("Token input was empty.", 'error');
            }
        });
        container.appendChild(label);
        inputContainer.appendChild(input);
        inputContainer.appendChild(saveBtn);
        container.appendChild(inputContainer);
        return container;
    }

    function createSelectField(labelText, id, optionsMap) {
        const container = document.createElement('div');
        Object.assign(container.style, { display: 'flex', flexDirection: 'column', marginBottom: '10px' });
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = labelText;
        Object.assign(label.style, { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', color: 'white' });
        const select = document.createElement('select');
        select.id = id;
        Object.assign(select.style, { padding: '6px', borderRadius: '4px', border: '1px solid #555', backgroundColor: 'rgb(80, 80, 80)', color: 'white', fontFamily: 'inherit' });
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "-- Select --";
        select.appendChild(defaultOption);
        Object.entries(optionsMap).forEach(([value, text]) => select.add(new Option(text, value)));
        container.appendChild(label);
        container.appendChild(select);
        return container;
    }

    async function applyBulkEdit(selections) {
        const itemsToUpdate = Array.from(document.querySelectorAll('div.MuiDataGrid-row[data-id]'));
        if (itemsToUpdate.length === 0) return displayStatusMessage("No collection items found on this page to edit.", 'info');

        const fieldNameToId = allCustomFields.reduce((acc, field) => { acc[field.name.toLowerCase()] = field.id; return acc; }, {});
        const notesToUpdate = [];
        if (selections.mediaCondition) notesToUpdate.push({ fieldId: fieldNameToId['media condition'], value: selections.mediaCondition });
        if (selections.sleeveCondition) notesToUpdate.push({ fieldId: fieldNameToId['sleeve condition'], value: selections.sleeveCondition });
        if (selections.origin) notesToUpdate.push({ fieldId: fieldNameToId['origin'], value: selections.origin });
        if (selections.placement) notesToUpdate.push({ fieldId: fieldNameToId['placement'], value: selections.placement });

        if (notesToUpdate.length === 0) return displayStatusMessage("No selections to apply.", 'info');

        let successfulFieldsUpdated = 0;
        for (let i = 0; i < itemsToUpdate.length; i++) {
            const item = itemsToUpdate[i];
            const collectionItemId = parseInt(item.dataset.id, 10);
            if (!collectionItemId) continue;

            for (let j = 0; j < notesToUpdate.length; j++) {
                const note = notesToUpdate[j];
                displayStatusMessage(`Updating item ${i + 1}/${itemsToUpdate.length} (field ${j + 1}/${notesToUpdate.length})...`, 'info', 0);
                
                const graphqlPayload = {
                    "operationName": "EditCollectionItemNote",
                    "variables": {
                        "input": {
                            "discogsItemId": collectionItemId,
                            "discogsNoteTypeId": note.fieldId,
                            "noteText": note.value
                        }
                    },
                    "extensions": {
                        "persistedQuery": {
                            "version": 1,
                            "sha256Hash": EDIT_ITEM_NOTE_HASH
                        }
                    }
                };

                await new Promise(resolve => {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "https://www.discogs.com/service/catalog/api/graphql",
                        headers: { "Content-Type": "application/json" },
                        data: JSON.stringify(graphqlPayload),
                        onload: (response) => {
                            if (response.status === 200) {
                                try {
                                    const responseData = JSON.parse(response.responseText);
                                    if (responseData.errors && responseData.errors.length > 0) {
                                        displayStatusMessage(`GraphQL Error on item ${collectionItemId}: ${responseData.errors[0].message}`, 'error', 0);
                                        console.error(`DHP: GraphQL error on item ${collectionItemId}:`, responseData.errors);
                                    } else {
                                        successfulFieldsUpdated++;
                                    }
                                } catch (e) {
                                    displayStatusMessage(`Error parsing response for item ${collectionItemId}.`, 'error', 0);
                                    console.error(`DHP: Error parsing response for item ${collectionItemId}:`, e);
                                }
                            } else {
                                displayStatusMessage(`Error: ${response.status} for item ${collectionItemId}. See console.`, 'error', 0);
                                console.error(`DHP: API error for item ${collectionItemId}: Status ${response.status}`, response);
                            }
                            setTimeout(resolve, 200); // 200ms delay between requests
                        },
                        onerror: (error) => {
                            displayStatusMessage(`Network error for item ${collectionItemId}. See console.`, 'error', 0);
                            console.error(`DHP: Network error for item ${collectionItemId}:`, error);
                            setTimeout(resolve, 200);
                        }
                    });
                });
            }
        }
        
        displayStatusMessage(`Finished: Successfully updated ${successfulFieldsUpdated} fields across ${itemsToUpdate.length} items. Reloading...`, 'success', 0);
        setTimeout(() => location.reload(), 1500);
    }

    // =================UI CONSTRUCTION=================
    const panelContainer = document.createElement('div');
    Object.assign(panelContainer.style, { position: 'fixed', top: '120px', right: '0px', zIndex: '9999', display: 'flex', alignItems: 'flex-start', transition: 'transform 0.3s ease-in-out', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: 'white', transform: (GM_getValue(PANEL_STATE_STORAGE_KEY, true)) ? 'translateX(0)' : 'translateX(calc(100% - 30px))' });
    document.head.appendChild(document.createElement('style')).innerHTML = `.hidden { display: none !important; }`;
    const toggleTab = document.createElement('div');
    toggleTab.innerText = (GM_getValue(PANEL_STATE_STORAGE_KEY, true)) ? '→' : '←';
    Object.assign(toggleTab.style, { backgroundColor: 'rgb(51, 51, 51)', color: 'white', padding: '10px 0', width: '30px', textAlign: 'center', cursor: 'pointer', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', fontWeight: 'bold', userSelect: 'none', boxShadow: '-2px 2px 5px rgba(0,0,0,0.3)' });
    const contentArea = document.createElement('div');
    contentArea.id = 'dhp-content-area';
    Object.assign(contentArea.style, { position: 'relative', backgroundColor: 'rgb(51, 51, 51)', padding: '15px', border: '1px solid rgb(80, 80, 80)', borderRight: 'none', borderBottomLeftRadius: '8px', boxShadow: '-2px 2px 5px rgba(0,0,0,0.2)', minWidth: '240px', display: 'flex', flexDirection: 'column' });
    const title = document.createElement('h3');
    title.innerText = "Discogs Panel";
    Object.assign(title.style, { margin: '0 0 10px 0', fontSize: '18px', textAlign: 'center', color: 'white' });
    contentArea.appendChild(title);
    
    const statusArea = document.createElement('div');
    statusArea.id = 'dhp-status-area';
    Object.assign(statusArea.style, { fontSize: '12px', textAlign: 'center', marginBottom: '10px', display: 'none', padding: '5px', borderRadius: '4px' });
    contentArea.appendChild(statusArea);

    const tokenContainer = createTokenInput('dhp-token', GM_getValue(TOKEN_STORAGE_KEY, ''));
    contentArea.appendChild(tokenContainer);

    const fetchedCustomFields = await getCustomFields();

    if (fetchedCustomFields && !fetchedCustomFields.error) {
        tokenContainer.style.display = 'none';

        const logoutLink = document.createElement('a');
        logoutLink.href = "#";
        logoutLink.innerText = "Log out";
        Object.assign(logoutLink.style, {
            position: 'absolute', top: '10px', right: '10px',
            fontSize: '11px', color: '#ccc', textDecoration: 'underline',
            cursor: 'pointer', backgroundColor: 'transparent', border: 'none'
        });
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            GM_deleteValue(TOKEN_STORAGE_KEY); // Removed confirm
            displayStatusMessage("API Token cleared. Reloading page...", 'info', 0);
            setTimeout(() => location.reload(), 1500);
        });
        contentArea.appendChild(logoutLink);

        const isCollectionPage = /^\/user\/[^\/]+\/collection/.test(window.location.pathname);

        if (isCollectionPage) {
            const separator1 = document.createElement('hr');
            Object.assign(separator1.style, { border: 'none', borderTop: '1px solid rgb(80, 80, 80)', margin: '25px 0 15px 0' });
            contentArea.appendChild(separator1);

            const bulkEditTitle = document.createElement('h4');
            bulkEditTitle.innerText = "Bulk edit";
            Object.assign(bulkEditTitle.style, { margin: '0 0 10px 0', fontSize: '14px', color: 'white', textAlign: 'center' });
            contentArea.appendChild(bulkEditTitle);

            contentArea.appendChild(createSelectField('Media Condition', 'dhp-media', fetchedCustomFields.mc || {}));
            contentArea.appendChild(createSelectField('Sleeve Condition', 'dhp-sleeve', fetchedCustomFields.sc || {}));
            contentArea.appendChild(createSelectField('Origin', 'dhp-origin', fetchedCustomFields.or || {}));
            contentArea.appendChild(createSelectField('Placement', 'dhp-placement', fetchedCustomFields.pl || {}));
            
            setTimeout(() => {
                const storedSelections = GM_getValue(SELECTIONS_STORAGE_KEY, {});
                const keyMap = { media: 'mediaCondition', sleeve: 'sleeveCondition', origin: 'origin', placement: 'placement' };
                Object.keys(keyMap).forEach(key => {
                    const el = document.getElementById(`dhp-${key}`);
                    const storedKey = keyMap[key];
                    const storedValue = storedSelections[storedKey];
                    if (el && storedValue) el.value = storedValue;
                });
            }, 0);
            
            const submitBtn = document.createElement('button');
            submitBtn.innerText = "Apply Selections";
            Object.assign(submitBtn.style, { marginTop: '15px', padding: '10px', backgroundColor: '#00c700', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit' });
            submitBtn.onmouseover = () => submitBtn.style.backgroundColor = '#00a300';
            submitBtn.onmouseout = () => submitBtn.style.backgroundColor = '#00c700';
            submitBtn.addEventListener('click', () => {
                const selections = {
                    mediaCondition: document.getElementById('dhp-media').value,
                    sleeveCondition: document.getElementById('dhp-sleeve').value,
                    origin: document.getElementById('dhp-origin').value,
                    placement: document.getElementById('dhp-placement').value,
                };
                GM_setValue(SELECTIONS_STORAGE_KEY, selections);
                applyBulkEdit(selections);
            });
            contentArea.appendChild(submitBtn);
        }

        const separator2 = document.createElement('hr');
        Object.assign(separator2.style, { border: 'none', borderTop: '1px solid rgb(80, 80, 80)', margin: '20px 0' });
        contentArea.appendChild(separator2);

        const filterButtonsContainer = document.createElement('div');
        Object.assign(filterButtonsContainer.style, { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' });
        contentArea.appendChild(filterButtonsContainer);

        if (window.location.pathname.startsWith('/artist')) {
            const inCollectionBtn = document.createElement('button');
            inCollectionBtn.innerHTML = COLLECTION_ICON_SVG + ' In collection';
            Object.assign(inCollectionBtn.style, { padding: '10px', backgroundColor: 'rgb(25, 118, 210)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' });
            inCollectionBtn.querySelector('svg').style.width = '18px';
            inCollectionBtn.querySelector('svg').style.height = '18px';
            inCollectionBtn.onmouseover = () => inCollectionBtn.style.backgroundColor = 'rgb(20, 90, 180)';
            inCollectionBtn.onmouseout = () => inCollectionBtn.style.backgroundColor = 'rgb(25, 118, 210)';
            inCollectionBtn.addEventListener('click', () => Array.from(document.querySelectorAll(`tr:not(:has([class*=collection_], [class*=wantlist_]))`)).map(e => e.parentNode && e.parentNode.removeChild(e)));
            filterButtonsContainer.appendChild(inCollectionBtn);
        }

        if (window.location.pathname.startsWith('/mywantlist')) {
            const uniqueItemsBtn = document.createElement('button');
            uniqueItemsBtn.innerHTML = '\u23F7\uFE0E Unique items';
            Object.assign(uniqueItemsBtn.style, { padding: '10px', backgroundColor: 'rgb(255, 159, 0)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' });
            uniqueItemsBtn.onmouseover = () => uniqueItemsBtn.style.backgroundColor = 'rgb(220, 130, 0)';
            uniqueItemsBtn.onmouseout = () => uniqueItemsBtn.style.backgroundColor = 'rgb(255, 159, 0)';
            uniqueItemsBtn.addEventListener('click', () => {
                const find = (selector, root = window.document) => Array.from(root.querySelectorAll(selector));
                find("tr[class*=wantlist]")
                    .map(release => ({ artist: find("td.artist_title a", release)[0]?.innerText || '', title: find("td.artist_title a", release)[1]?.innerText || '', rel: release }))
                    .filter((release, index, list) => list.some((_release, _index) => release.title.toLowerCase() === _release.title.toLowerCase() && release.artist.toLowerCase() === _release.artist.toLowerCase() && index < _index))
                    .forEach(rel => rel.rel.classList.add("hidden"));
            });
            filterButtonsContainer.appendChild(uniqueItemsBtn);
        }
    } else {
        tokenContainer.style.display = 'flex';
        const info = document.createElement('div');
        info.style.color = '#ffc107'; info.style.fontSize = '12px';
        const titleMsg = document.createElement('p');
        titleMsg.innerText = 'Authentication Failed'; titleMsg.fontWeight = 'bold';
        info.appendChild(titleMsg);
        if (fetchedCustomFields.status) {
            const statusText = document.createElement('p');
            statusText.innerText = `Status: ${fetchedCustomFields.status}`;
            info.appendChild(statusText);
        }
        if (fetchedCustomFields.responseText) {
            const responseTitle = document.createElement('p');
            responseTitle.innerText = 'API Response:'; responseTitle.style.marginTop = '5px';
            info.appendChild(responseTitle);
            const responseBody = document.createElement('pre');
            try { responseBody.innerText = JSON.stringify(JSON.parse(fetchedCustomFields.responseText), null, 2); } catch (e) { responseBody.innerText = fetchedCustomFields.responseText; }
            Object.assign(responseBody.style, { backgroundColor: 'rgba(0,0,0,0.2)', padding: '5px', borderRadius: '3px', fontSize: '11px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' });
            info.appendChild(responseBody);
        }
        contentArea.appendChild(info);
    }

    panelContainer.appendChild(toggleTab);
    panelContainer.appendChild(contentArea);
    document.body.appendChild(panelContainer);

    // =================EVENT HANDLERS=================
    toggleTab.addEventListener('click', () => {
        const newState = !(GM_getValue(PANEL_STATE_STORAGE_KEY, true));
        panelContainer.style.transform = newState ? 'translateX(0)' : 'translateX(calc(100% - 30px))';
        toggleTab.innerText = newState ? '→' : '←';
        GM_setValue(PANEL_STATE_STORAGE_KEY, newState);
    });
    
})();