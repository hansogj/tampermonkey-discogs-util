import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { displayStatusMessage, createTokenInput, createSelectField, find } from './ui';
import { TOKEN_STORAGE_KEY } from './constants';

// Mock Tampermonkey API and other globals
const mockGmValueStore: Record<string, any> = {};
global.GM_getValue = vi.fn((key: string, defaultValue: any) => mockGmValueStore[key] ?? defaultValue);
global.GM_setValue = vi.fn((key: string, value: any) => { mockGmValueStore[key] = value; });
global.GM_deleteValue = vi.fn((key: string) => { delete mockGmValueStore[key]; });
global.GM_xmlhttpRequest = vi.fn(); // Not directly used in ui.ts for these functions, but good to mock

global.location = { reload: vi.fn() } as unknown as Location;

describe('ui.ts', () => {
    let statusArea: HTMLElement;

    beforeEach(() => {
        // Reset mocks and DOM before each test
        vi.clearAllMocks();
        document.body.innerHTML = '';
        
        statusArea = document.createElement('div');
        statusArea.id = 'dhp-status-area';
        document.body.appendChild(statusArea);

        // Mock setTimeout and clearTimeout
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('displayStatusMessage', () => {
        it('should display an error message by default and hide it after duration', () => {
            displayStatusMessage('Test Error Message');

            expect(statusArea.innerText).toBe('Test Error Message');
            expect(statusArea.style.display).toBe('block');
            expect(statusArea.style.color).toBe('rgb(220, 53, 69)'); // Default error color

            vi.advanceTimersByTime(5000);
            expect(statusArea.style.display).toBe('none');
        });

        it('should display a success message', () => {
            displayStatusMessage('Test Success Message', 'success');

            expect(statusArea.innerText).toBe('Test Success Message');
            expect(statusArea.style.display).toBe('block');
            expect(statusArea.style.color).toBe('rgb(40, 167, 69)'); // Success color
        });

        it('should display an info message', () => {
            displayStatusMessage('Test Info Message', 'info');

            expect(statusArea.innerText).toBe('Test Info Message');
            expect(statusArea.style.display).toBe('block');
            expect(statusArea.style.color).toBe('rgb(23, 162, 184)'); // Info color
        });

        it('should not hide message if duration is 0', () => {
            displayStatusMessage('Permanent Message', 'info', 0);

            expect(statusArea.innerText).toBe('Permanent Message');
            expect(statusArea.style.display).toBe('block');

            vi.advanceTimersByTime(10000); // Advance far beyond default
            expect(statusArea.style.display).toBe('block'); // Should still be visible
        });

        it('should clear previous timeout if a new message is displayed', () => {
            const spyClearTimeout = vi.spyOn(window, 'clearTimeout');

            displayStatusMessage('Message 1', 'error', 5000); // This will call clearTimeout once (on undefined statusTimeout) and then setTimeout
            displayStatusMessage('Message 2', 'error', 5000); // This will call clearTimeout once (for the previous timeout) and then setTimeout

            // So, clearTimeout is called twice in total within displayStatusMessage logic.
            // The expectation needs to match this behavior.
            expect(spyClearTimeout).toHaveBeenCalledTimes(2); 
        });

        it('should do nothing if status area not found', () => {
            document.body.removeChild(statusArea); // Properly remove status area from DOM
            const originalBodyInnerHTML = document.body.innerHTML;
            displayStatusMessage('No status area');
            // Assert that the DOM has not changed
            expect(document.body.innerHTML).toBe(originalBodyInnerHTML);
            // Optionally, ensure no errors were thrown
            // expect(() => displayStatusMessage('No status area')).not.toThrow();
        });
    });

    describe('createTokenInput', () => {
        it('should create the correct DOM structure', () => {
            const tokenInput = createTokenInput('my-token-input', 'some-saved-token');
            document.body.appendChild(tokenInput);

            expect(tokenInput.id).toBe('dhp-token-container');
            
            const label = tokenInput.querySelector('label');
            expect(label).not.toBeNull();
            expect(label?.getAttribute('for')).toBe('my-token-input');
            expect(label?.innerText).toBe('Discogs API Token');

            const input = tokenInput.querySelector('input');
            expect(input).not.toBeNull();
            expect(input?.type).toBe('password');
            expect(input?.id).toBe('my-token-input');
            expect(input?.value).toBe('some-saved-token');
            expect(input?.placeholder).toBe('Paste token here');

            const saveBtn = tokenInput.querySelector('button');
            expect(saveBtn).not.toBeNull();
            expect(saveBtn?.innerText).toBe('Save');
        });

        it('should save token and reload on save button click with valid token', () => {
            const tokenInput = createTokenInput('my-token-input', '');
            document.body.appendChild(tokenInput);
            
            const input = tokenInput.querySelector('input') as HTMLInputElement;
            const saveBtn = tokenInput.querySelector('button') as HTMLButtonElement;

            input.value = 'new-valid-token';
            saveBtn.click();

            expect(GM_setValue).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, 'new-valid-token');
            expect(statusArea.innerText).toBe('Token saved. Reloading page...');
            
            vi.runAllTimers(); // Execute setTimeout for location.reload()
            expect(location.reload).toHaveBeenCalledTimes(1);
        });

        it('should display error if token is empty on save button click', () => {
            const tokenInput = createTokenInput('my-token-input', '');
            document.body.appendChild(tokenInput);
            
            const saveBtn = tokenInput.querySelector('button') as HTMLButtonElement;
            saveBtn.click();

            expect(GM_setValue).not.toHaveBeenCalled();
            expect(statusArea.innerText).toBe('Token input was empty.');
            expect(location.reload).not.toHaveBeenCalled();
        });
    });

    describe('createSelectField', () => {
        it('should create the correct DOM structure with options', () => {
            const options = { 'val1': 'Option One', 'val2': 'Option Two' };
            const selectField = createSelectField('My Select', 'my-select-id', options);
            document.body.appendChild(selectField);

            const label = selectField.querySelector('label');
            expect(label).not.toBeNull();
            expect(label?.getAttribute('for')).toBe('my-select-id');
            expect(label?.innerText).toBe('My Select');

            const select = selectField.querySelector('select');
            expect(select).not.toBeNull();
            expect(select?.id).toBe('my-select-id');
            
            const selectOptions = select?.querySelectorAll('option');
            expect(selectOptions?.length).toBe(3); // Default + 2 custom

            expect(selectOptions?.[0].value).toBe('');
            expect(selectOptions?.[0].textContent).toBe('-- Select --');

            expect(selectOptions?.[1].value).toBe('val1');
            expect(selectOptions?.[1].textContent).toBe('Option One');

            expect(selectOptions?.[2].value).toBe('val2');
            expect(selectOptions?.[2].textContent).toBe('Option Two');
        });

        it('should handle empty options map', () => {
            const selectField = createSelectField('Empty Select', 'empty-select-id', {});
            document.body.appendChild(selectField);

            const select = selectField.querySelector('select');
            const selectOptions = select?.querySelectorAll('option');
            expect(selectOptions?.length).toBe(1); // Only default option
            expect(selectOptions?.[0].value).toBe('');
            expect(selectOptions?.[0].textContent).toBe('-- Select --');
        });
    });

    describe('find', () => {
        it('should find elements by selector', () => {
            document.body.innerHTML = `
                <div class="test-class"></div>
                <span class="test-class"></span>
                <p id="test-id"></p>
            `;
            const elements = find('.test-class');
            expect(elements.length).toBe(2);
            expect(elements[0].tagName).toBe('DIV');
            expect(elements[1].tagName).toBe('SPAN');
        });

        it('should find elements within a specific root', () => {
            document.body.innerHTML = `
                <div id="root1">
                    <span class="inner-span"></span>
                </div>
                <div id="root2">
                    <span class="inner-span"></span>
                </div>
            `;
            const root1 = document.getElementById('root1') as HTMLElement;
            const elements = find('.inner-span', root1);
            expect(elements.length).toBe(1);
            expect(elements[0].parentElement?.id).toBe('root1');
        });

        it('should return empty array if no elements found', () => {
            document.body.innerHTML = `<div></div>`;
            const elements = find('.non-existent');
            expect(elements.length).toBe(0);
        });
    });
});
