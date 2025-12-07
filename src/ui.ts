import { TOKEN_STORAGE_KEY } from './constants';
import type { MessageType } from './types';

let statusTimeout: number;

export function displayStatusMessage(
  text: string,
  type: MessageType = 'error',
  duration = 5000,
): void {
  const statusArea = document.getElementById('dhp-status-area') as HTMLElement;
  if (!statusArea) return;

  window.clearTimeout(statusTimeout);
  statusArea.innerText = text;
  statusArea.style.display = 'block';
  statusArea.style.color = type === 'success' ? '#28a745' : type === 'info' ? '#17a2b8' : '#dc3545';

  if (duration > 0) {
    statusTimeout = window.setTimeout(() => {
      statusArea.style.display = 'none';
    }, duration);
  }
}

export function createTokenInput(id: string, savedToken: string): HTMLElement {
  const container = document.createElement('div');
  container.id = 'dhp-token-container';
  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  });

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.innerText = 'Discogs API Token';
  Object.assign(label.style, {
    fontWeight: 'bold',
    fontSize: '12px',
    marginBottom: '4px',
    color: 'white',
  });

  const inputContainer = document.createElement('div');
  Object.assign(inputContainer.style, { display: 'flex', gap: '5px' });

  const input = document.createElement('input');
  input.type = 'password';
  input.id = id;
  input.value = savedToken;
  input.placeholder = 'Paste token here';
  Object.assign(input.style, {
    flex: '1',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: 'rgb(80, 80, 80)',
    color: 'white',
  });

  const saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  Object.assign(saveBtn.style, {
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#00c700',
    color: 'white',
    cursor: 'pointer',
  });

  saveBtn.addEventListener('click', () => {
    const token = input.value.trim();
    if (token) {
      GM_setValue(TOKEN_STORAGE_KEY, token);
      displayStatusMessage('Token saved. Reloading page...', 'success', 0);
      setTimeout(() => location.reload(), 1500);
    } else {
      displayStatusMessage('Token input was empty.', 'error');
    }
  });

  container.appendChild(label);
  inputContainer.appendChild(input);
  inputContainer.appendChild(saveBtn);
  container.appendChild(inputContainer);
  return container;
}

export function createSelectField(
  labelText: string,
  id: string,
  optionsMap: Record<string, string>,
): HTMLElement {
  const container = document.createElement('div');
  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  });

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.innerText = labelText;
  Object.assign(label.style, {
    fontWeight: 'bold',
    fontSize: '12px',
    marginBottom: '4px',
    color: 'white',
  });

  const select = document.createElement('select');
  select.id = id;
  Object.assign(select.style, {
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: 'rgb(80, 80, 80)',
    color: 'white',
    fontFamily: 'inherit',
  });

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = '-- Select --';
  select.appendChild(defaultOption);

  Object.entries(optionsMap).forEach(([value, text]) => select.add(new Option(text, value)));

  container.appendChild(label);
  container.appendChild(select);
  return container;
}

export const find = (selector: string, root: ParentNode = document): HTMLElement[] =>
  Array.from(root.querySelectorAll(selector)) as HTMLElement[];
