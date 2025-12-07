import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App'; // The App component will contain all the panel's structure

// Create the root DOM element for our React application
const rootDiv = document.createElement('div');
rootDiv.id = 'discogs-helper-root';
document.body.appendChild(rootDiv);

// Render the App component into the root
const root = ReactDOM.createRoot(rootDiv);
root.render(<App />);
