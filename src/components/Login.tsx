import React, { useState } from 'react';
import { TOKEN_STORAGE_KEY } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [token, setToken] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (token) {
      GM_setValue(TOKEN_STORAGE_KEY, token);
      onLogin();
    }
  };

  const formContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    gap: '5px',
  };

  const inputStyle: React.CSSProperties = {
    flex: '1',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: 'rgb(80, 80, 80)',
    color: 'white',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#00c700',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div>
      <h3>Please enter your Discogs API token</h3>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Save
        </button>
      </form>
    </div>
  );
}
