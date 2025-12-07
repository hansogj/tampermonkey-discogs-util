import { TOKEN_STORAGE_KEY, SCRIPT_VERSION, EDIT_ITEM_NOTE_HASH } from './constants.js';

import type { IdentityResponse, CustomField, FieldsResponse, ApplyEditSelections } from './types';

// Module-scoped variable to hold the fetched custom fields with their IDs
let _allCustomFields: CustomField[] = [];

// Exported for testing purposes to inject mock data
export function __SetAllCustomFields(fields: CustomField[]): void {
  _allCustomFields = fields;
}

async function fetchDiscogsUsername(token: string): Promise<string | null> {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://api.discogs.com/oauth/identity',
      headers: {
        'User-Agent': `DiscogsGradingHelperPanel/${SCRIPT_VERSION}`,
        Authorization: `Discogs token=${token}`,
      },
      onload: (res: Tampermonkey.Response<unknown>) => {
        if (res.status === 200) {
          const data: IdentityResponse = JSON.parse(res.responseText);
          resolve(data.username || null);
        } else {
          resolve(null);
        }
      },
      onerror: () => resolve(null),
    });
  });
}

export async function getCustomFields(): Promise<FieldsResponse> {
  const token = GM_getValue(TOKEN_STORAGE_KEY, '');
  if (!token) throw new Error('Please enter and save your token.');

  const username = await fetchDiscogsUsername(token);
  if (!username) throw new Error('Could not fetch username. Please check your token.');

  const url = `https://api.discogs.com/users/${username}/collection/fields`;
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      headers: {
        'User-Agent': `DiscogsGradingHelperPanel/${SCRIPT_VERSION}`,
        Authorization: `Discogs token=${token}`,
      },
      onload: function (response: Tampermonkey.Response<unknown>) {
        if (response.status >= 200 && response.status < 300) {
          const data: FieldsResponse = JSON.parse(response.responseText);
          _allCustomFields = data.fields || [];
          resolve(data);
        } else {
          reject(new Error(response.responseText));
        }
      },
      onerror: (error) => reject(new Error(JSON.stringify(error))),
    });
  });
}

export async function applyBulkEdit(selections: ApplyEditSelections): Promise<string> {
  const itemsToUpdate = Array.from(
    document.querySelectorAll('div.MuiDataGrid-row[data-id]'),
  ) as HTMLElement[];
  if (itemsToUpdate.length === 0) {
    throw new Error('No collection items found on this page to edit.');
  }

  const notesToUpdate = Object.entries(selections)
    .filter(([, value]) => value)
    .map(([fieldId, value]) => ({ fieldId: parseInt(fieldId, 10), value }));

  if (notesToUpdate.length === 0) {
    throw new Error('No selections made in the panel to apply.');
  }

  let successfulFieldsUpdated = 0;
  for (const item of itemsToUpdate) {
    const collectionItemId = parseInt(item.dataset.id || '', 10);
    if (!collectionItemId) continue;

    for (const note of notesToUpdate) {
      const graphqlPayload = {
        operationName: 'EditCollectionItemNote',
        variables: {
          input: {
            discogsItemId: collectionItemId,
            discogsNoteTypeId: note.fieldId,
            noteText: note.value,
          },
        },
        extensions: { persistedQuery: { version: 1, sha256Hash: EDIT_ITEM_NOTE_HASH } },
      };

      await new Promise<void>((resolve) => {
        GM_xmlhttpRequest({
          method: 'POST',
          url: 'https://www.discogs.com/service/catalog/api/graphql',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(graphqlPayload),
          onload: (response) => {
            if (response.status === 200) {
              const responseData = JSON.parse(response.responseText);
              if (!responseData.errors) {
                successfulFieldsUpdated++;
              }
            }
            setTimeout(resolve, 200);
          },
          onerror: () => setTimeout(resolve, 200),
        });
      });
    }
  }

  return `Finished: Successfully updated ${successfulFieldsUpdated} fields across ${itemsToUpdate.length} items.`;
}
