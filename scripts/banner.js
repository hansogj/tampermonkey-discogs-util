// ==UserScript==
// @name         discogs-util
// @namespace    @hansogj
// @version      {VERSION_PLACEHOLDER}
// @description  https://github.com/hansogj/tampermonkey-discogs-util.  Adds a sticky panel to Discogs with grading, location, "In collection" filter, and "Unique items" filter, with dark theme. Now with dynamic loading of all custom fields via API token.
// @updateURL    https://raw.githubusercontent.com/hansogj/tampermonkey-discogs-util/main/dist/discogs-util.user.js
// @downloadURL  https://raw.githubusercontent.com/hansogj/tampermonkey-discogs-util/main/dist/discogs-util.user.js
// @author       hansogj@gmail.com
// @license      MIT - https://opensource.org/licenses/MIT
// @match        https://www.discogs.com/*
// @exclude      https://www.discogs.com/service/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==
