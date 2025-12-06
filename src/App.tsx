import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Panel } from './components/Panel';
import { LabelHighlighter } from './components/LabelHighlighter';
import { PANEL_STATE_STORAGE_KEY, TOKEN_STORAGE_KEY } from './constants';
import { displayStatusMessage } from './ui'; // Keep for now, to be removed later

const queryClient = new QueryClient();

export function App() {
    const [isOpen, setIsOpen] = useState<boolean>(() => GM_getValue(PANEL_STATE_STORAGE_KEY, true));
    const [isPanelEmpty, setIsPanelEmpty] = useState(false);

    useEffect(() => {
        if (isPanelEmpty) {
            setIsOpen(false);
        }
    }, [isPanelEmpty]);

    // Styles from original main.tsx and backup.index.js
    const panelContainerStyle: React.CSSProperties = {
        position: 'fixed',
        top: '120px',
        right: '0px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        transition: 'transform 0.3s ease-in-out',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: 'white',
        transform: isOpen ? 'translateX(0)' : 'translateX(calc(100% - 30px))' // Slide effect
    };

    const toggleTabStyle: React.CSSProperties = {
        backgroundColor: 'rgb(51, 51, 51)',
        color: 'white',
        padding: '10px 0',
        width: '30px',
        textAlign: 'center',
        cursor: 'pointer',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        fontWeight: 'bold',
        userSelect: 'none',
        boxShadow: '-2px 2px 5px rgba(0,0,0,0.3)'
    };

    const contentAreaStyle: React.CSSProperties = {
        position: 'relative',
        backgroundColor: 'rgb(51, 51, 51)',
        padding: '15px',
        border: '1px solid rgb(80, 80, 80)',
        borderRight: 'none',
        borderBottomLeftRadius: '8px',
        boxShadow: '-2px 2px 5px rgba(0,0,0,0.2)',
        minWidth: '220px', // Restored from original
        display: 'flex',
        flexDirection: 'column'
    };

    const titleStyle: React.CSSProperties = {
        margin: '0 0 15px 0', // Restored from original
        fontSize: '18px',
        textAlign: 'center',
        color: 'white'
    };
    
    // Toggle panel visibility
    const handleToggle = () => {
        setIsOpen(prev => {
            GM_setValue(PANEL_STATE_STORAGE_KEY, !prev); // Persist state
            return !prev;
        });
    };

    // Logout functionality
    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();
        GM_deleteValue(TOKEN_STORAGE_KEY);
        displayStatusMessage("API Token cleared. Reloading page...", 'info', 0); // Still using imperative helper for now
        setTimeout(() => location.reload(), 1500);
    };

    // Inject CSS for .hidden class once (originally in main.tsx)
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `.hidden { display: none !important; }`;
        document.head.appendChild(styleTag);
    }, []);


    return (
        <QueryClientProvider client={queryClient}>
            <LabelHighlighter />
            <div id="dhp-container" style={panelContainerStyle}>
                <div 
                    style={toggleTabStyle}
                    onClick={handleToggle}
                >
                    {isOpen ? '→' : '←'}
                </div>
                <div id="dhp-content-area" style={contentAreaStyle}>
                    <h3 style={titleStyle}>Discogs Panel</h3>
                    
                    {/* Logout Link */}
                    <a href="#" onClick={handleLogout} style={{
                        position: 'absolute', top: '10px', right: '10px',
                        fontSize: '11px', color: '#ccc', textDecoration: 'underline',
                        cursor: 'pointer', backgroundColor: 'transparent', border: 'none'
                    }}>
                        Log out
                    </a>
                    
                    {/* Status Area */}
                    <div id="dhp-status-area" style={{ fontSize: '12px', textAlign: 'center', marginBottom: '10px', display: 'none', padding: '5px', borderRadius: '4px' }}>
                        {/* Messages will be displayed here */}
                    </div>

                    <Panel onEmptyStateChange={setIsPanelEmpty} /> {/* The core panel logic */}
                </div>
            </div>
        </QueryClientProvider>
    );
}