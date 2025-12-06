import React, { useState, useEffect } from 'react';
import { COLLECTION_ICON_SVG } from '../constants';

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px'
};

const buttonStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: 'rgb(25, 118, 210)', // Blue color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    width: '100%'
};

export function ArtistPanel() {
    const [showInCollectionOnly, setShowInCollectionOnly] = useState(false);

    const handleFilterInCollection = () => {
        setShowInCollectionOnly(prev => !prev);
    };

    useEffect(() => {
        // Selector from original script's working logic, confirmed by user
        const items = document.querySelectorAll(`tr:not(:has([class*=collection_], [class*=wantlist_]))`);
        items.forEach(item => {
            const el = item as HTMLElement;
            if (showInCollectionOnly) {
                el.classList.add('hidden');
            } else {
                el.classList.remove('hidden');
            }
        });
    }, [showInCollectionOnly]);

    return (
        <div style={containerStyle}>
            <button onClick={handleFilterInCollection} style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(20, 90, 180)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(25, 118, 210)')}>
                <span dangerouslySetInnerHTML={{ __html: COLLECTION_ICON_SVG }} /> In collection
            </button>
        </div>
    );
}
