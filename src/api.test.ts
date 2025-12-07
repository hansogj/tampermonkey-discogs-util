import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCustomFields, applyBulkEdit, __SetAllCustomFields } from './api';
import { TOKEN_STORAGE_KEY, SCRIPT_VERSION, EDIT_ITEM_NOTE_HASH } from './constants';
import type { FieldsResponse, CustomField, ApplyEditSelections } from './types';

// Mock Tampermonkey API and other globals
global.GM_getValue = vi.fn((key: string, defaultValue: unknown) => {
  if (key === TOKEN_STORAGE_KEY) return 'mock_discogs_token';
  return defaultValue;
});
global.GM_setValue = vi.fn();
global.GM_deleteValue = vi.fn();

let queuedXhrResponses: {
  response: { status: number; responseText: string };
  type: 'onload' | 'onerror';
}[] = [];

// Mock GM_xmlhttpRequest implementation
global.GM_xmlhttpRequest = vi.fn(async (options: Tampermonkey.Request) => {
  // Make it async
  const nextResponse = queuedXhrResponses.shift();
  if (nextResponse) {
    // Introduce a small async delay that runAllTimersAsync can manage
    await new Promise((r) => setTimeout(r, 0)); // This schedules a setTimeout
    if (nextResponse.type === 'onload') {
      options.onload?.({
        status: nextResponse.response.status,
        responseText: nextResponse.response.responseText,
      } as Tampermonkey.Response<unknown>);
    } else {
      options.onerror?.({
        error: nextResponse.response.responseText,
      } as Tampermonkey.ErrorResponse);
    }
  } else {
    // Fallback for unexpected calls during tests, or to fail if not mocked
    console.warn('GM_xmlhttpRequest called without a queued mock response.');
    options.onerror?.({ error: 'No mock response queued' } as Tampermonkey.ErrorResponse);
  }
});

// Mock console.error
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('api.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy.mockClear();
    document.body.innerHTML = ''; // Clean DOM for tests
    __SetAllCustomFields([]); // Reset custom fields for isolation
    queuedXhrResponses = []; // Reset queued responses
  });

  // Helper to queue GM_xmlhttpRequest responses
  const queueXmlHttpRequest = (
    response: { status: number; responseText: string },
    type: 'onload' | 'onerror' = 'onload',
  ) => {
    queuedXhrResponses.push({ response, type });
  };

  describe('getCustomFields', () => {
    it('should throw an error if no token is available', async () => {
      (global.GM_getValue as vi.Mock).mockReturnValueOnce(''); // Simulate no token
      await expect(getCustomFields()).rejects.toThrow('Please enter and save your token.');
      expect(GM_getValue).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, '');
      expect(GM_xmlhttpRequest).not.toHaveBeenCalled();
    });

    it('should throw an error if username cannot be fetched', async () => {
      queueXmlHttpRequest({ status: 401, responseText: 'Unauthorized' }); // Mock identity API failure
      await expect(getCustomFields()).rejects.toThrow(
        'Could not fetch username. Please check your token.',
      );
      expect(GM_xmlhttpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://api.discogs.com/oauth/identity',
        }),
      );
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(1); // Only identity fetch
    });

    it('should fetch custom fields successfully', async () => {
      // Mock identity fetch success
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ username: 'testuser' }) });

      // Mock fields fetch success
      const mockFields: CustomField[] = [
        { id: 1, name: 'Media Condition', type: 'dropdown', options: ['Mint', 'Near Mint'] },
        { id: 2, name: 'Sleeve Condition', type: 'dropdown', options: ['Mint', 'Near Mint'] },
      ];
      const mockFieldsResponse: FieldsResponse = { fields: mockFields };
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify(mockFieldsResponse) });

      const result = await getCustomFields();

      expect(result).toEqual(mockFieldsResponse);
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(2); // Identity + Fields fetch
      expect(GM_xmlhttpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://api.discogs.com/users/testuser/collection/fields',
          headers: {
            'User-Agent': `DiscogsGradingHelperPanel/${SCRIPT_VERSION}`,
            Authorization: `Discogs token=mock_discogs_token`,
          },
        }),
      );
    });

    it('should throw an error on custom fields API failure', async () => {
      // Mock identity fetch success
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ username: 'testuser' }) });

      // Mock fields fetch failure
      queueXmlHttpRequest({ status: 500, responseText: 'Internal Server Error' });

      await expect(getCustomFields()).rejects.toThrow('Internal Server Error');
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(2);
    });

    it('should throw an error on custom fields network error', async () => {
      // Mock identity fetch success
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ username: 'testuser' }) });

      // Mock fields fetch network error
      queueXmlHttpRequest({ status: 0, responseText: 'Network Error' }, 'onerror'); // Simulate onerror for network issues

      await expect(getCustomFields()).rejects.toThrow('Network Error');
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(2);
    });
  });

  describe('applyBulkEdit', () => {
    const mockField1Id = 1;
    const mockField2Id = 2;
    const mockField3Id = 3;

    const mockCustomFields: CustomField[] = [
      {
        id: mockField1Id,
        name: 'Media Condition',
        type: 'dropdown',
        options: ['Mint', 'Near Mint'],
      },
      {
        id: mockField2Id,
        name: 'Sleeve Condition',
        type: 'dropdown',
        options: ['Mint', 'Near Mint'],
      },
      { id: mockField3Id, name: 'Origin', type: 'dropdown', options: ['US', 'EU'] },
    ];

    beforeEach(() => {
      __SetAllCustomFields(mockCustomFields);
      vi.useFakeTimers(); // Start fake timers for applyBulkEdit
    });

    afterEach(() => {
      vi.runAllTimers(); // Clear any remaining timers
      vi.useRealTimers(); // Restore real timers
    });

    it('should throw an error if no collection items found', async () => {
      await expect(applyBulkEdit({})).rejects.toThrow(
        'No collection items found on this page to edit.',
      );
      expect(GM_xmlhttpRequest).not.toHaveBeenCalled();
    });

    it('should throw an error if no selections made', async () => {
      document.body.innerHTML = '<div class="MuiDataGrid-row" data-id="123"></div>';
      await expect(applyBulkEdit({})).rejects.toThrow('No selections made in the panel to apply.');
      expect(GM_xmlhttpRequest).not.toHaveBeenCalled();
    });

    it('should apply bulk edit successfully to multiple items', async () => {
      document.body.innerHTML = `
                <div class="MuiDataGrid-row" data-id="101"></div>
                <div class="MuiDataGrid-row" data-id="102"></div>
            `;
      const selections: ApplyEditSelections = {
        [mockField1Id]: 'Mint',
        [mockField3Id]: 'US',
      };

      // Mock API responses for each item and each selection
      // 2 items * 2 selections = 4 calls
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ data: {} }) }); // Item 1, Field 1
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ data: {} }) }); // Item 1, Field 3
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ data: {} }) }); // Item 2, Field 1
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ data: {} }) }); // Item 2, Field 3

      const resultPromise = applyBulkEdit(selections);
      await vi.runAllTimersAsync(); // Resolve all internal setTimeouts and pending promises
      const result = await resultPromise;

      expect(result).toBe('Finished: Successfully updated 4 fields across 2 items.');
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(4);

      // Verify payload for one of the calls
      expect(GM_xmlhttpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://www.discogs.com/service/catalog/api/graphql',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({
            operationName: 'EditCollectionItemNote',
            variables: {
              input: { discogsItemId: 101, discogsNoteTypeId: mockField1Id, noteText: 'Mint' },
            },
            extensions: { persistedQuery: { version: 1, sha256Hash: EDIT_ITEM_NOTE_HASH } },
          }),
        }),
      );
    });

    it('should handle individual item update failures', async () => {
      document.body.innerHTML = `
                <div class="MuiDataGrid-row" data-id="101"></div>
                <div class="MuiDataGrid-row" data-id="102"></div>
            `;
      const selections: ApplyEditSelections = {
        [mockField1Id]: 'Mint',
      };

      // Mock API responses: Item 1 success, Item 2 failure
      queueXmlHttpRequest({ status: 200, responseText: JSON.stringify({ data: {} }) }); // Item 1, Field 1 success
      queueXmlHttpRequest({ status: 500, responseText: 'Error updating' }); // Item 2, Field 1 failure

      const resultPromise = applyBulkEdit(selections);
      await vi.runAllTimersAsync();
      const result = await resultPromise;

      expect(result).toBe('Finished: Successfully updated 1 fields across 2 items.'); // Only 1 successful
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(2);
    }, 10000); // Increased timeout

    it('should correctly increment successfulFieldsUpdated only for non-error GraphQL responses', async () => {
      document.body.innerHTML = `
                <div class="MuiDataGrid-row" data-id="101"></div>
            `;
      const selections: ApplyEditSelections = {
        [mockField1Id]: 'Mint',
      };

      // Mock a GraphQL response with errors, even if status is 200
      queueXmlHttpRequest({
        status: 200,
        responseText: JSON.stringify({ errors: [{ message: 'GraphQL error' }] }),
      });

      const resultPromise = applyBulkEdit(selections);
      await vi.runAllTimersAsync();
      const result = await resultPromise;

      expect(result).toBe('Finished: Successfully updated 0 fields across 1 items.');
      expect(GM_xmlhttpRequest).toHaveBeenCalledTimes(1);
    }, 10000); // Increased timeout
  });
});
