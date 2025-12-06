import React, { useState, useEffect } from 'react';

// Helper for DOM querying, now local to WantlistPanel.tsx
const find = (selector: string, root: ParentNode = document): HTMLElement[] => Array.from(root.querySelectorAll(selector)) as HTMLElement[];

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px'
};

const buttonStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: 'rgb(255, 159, 0)', // Orange color
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

export function WantlistPanel() {
    const [showUniqueOnly, setShowUniqueOnly] = useState(false);

    const handleFilterUniqueItems = () => {
        setShowUniqueOnly(prev => !prev);
    };

    useEffect(() => {
        const wantlistItems = find("tr[class*=wantlist]");
        
        const getReleaseId = (releaseLink: HTMLAnchorElement) => {
            const match = releaseLink.href.match(/(\/\/(master|release)\/(\d+))/);
            return match ? match[3] : null;
        };
       
        interface ReleaseModel {
            artist: string;
            title: string;
            id: string | null;
            rel: HTMLElement; // The 'tr' element
        }

        const buildModel = (release: HTMLElement): ReleaseModel => {
            const artistTitle = find("td.artist_title a", release);
            return {
                artist: artistTitle[0]?.innerText || '',
                title: artistTitle[1]?.innerText || '',
                id: artistTitle[1] ? getReleaseId(artistTitle[1] as HTMLAnchorElement) : null,
                rel: release
            };
        };
        
        const isDuplicateRelease = (release: ReleaseModel, index: number, list: ReleaseModel[]) => {
            return list.some((_release, _index) => 
                release.title.toLowerCase() === _release.title.toLowerCase() &&
                _release.artist.toLowerCase() === _release.artist.toLowerCase() &&
                index < _index // Mark later occurrences as duplicates
            );
        };

        const hide = (elem: HTMLElement) => { elem.classList.add("hidden"); };
        const show = (elem: HTMLElement) => { elem.classList.remove("hidden"); };

        const allWantlistReleases = wantlistItems.map(buildModel);
        
        if (showUniqueOnly) {
            allWantlistReleases.forEach((item, index, list) => {
                if (isDuplicateRelease(item, index, list)) {
                    hide(item.rel);
                } else {
                    show(item.rel); // Ensure first instance of a unique item is visible
                }
            });
        } else {
            // If filter is off, show all wantlist items
            wantlistItems.forEach(show);
        }

    }, [showUniqueOnly]);

    return (
        <div style={containerStyle}>
            <button onClick={handleFilterUniqueItems} style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(220, 130, 0)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(255, 159, 0)')}>
                &#x23F7;&#xFE0E; Unique items
            </button>
        </div>
    );
}
