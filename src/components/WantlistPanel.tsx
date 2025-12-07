import React, { useState, useEffect } from 'react';
import { find } from '../ui';

// Helper for DOM querying, now local to WantlistPanel.tsx
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
  const artistTitle = find('td.artist_title a', release);
  return {
    artist: artistTitle[0]?.textContent || '',
    title: artistTitle[1]?.textContent || '',
    id: artistTitle[1] ? getReleaseId(artistTitle[1] as HTMLAnchorElement) : null,
    rel: release,
  };
};

const isDuplicateRelease = (release: ReleaseModel, index: number, list: ReleaseModel[]) => {
  // Check if there's any *earlier* item in the list that is the same
  return list.slice(0, index).some((_release) => {
    const matchArtist = release.artist.toLowerCase() === _release.artist.toLowerCase();
    const matchTitle = release.title.toLowerCase() === _release.title.toLowerCase();
    return matchArtist && matchTitle;
  });
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '10px',
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
  width: '100%',
};

export function WantlistPanel() {
  const [showUniqueOnly, setShowUniqueOnly] = useState(false);

  const handleFilterUniqueItems = () => {
    setShowUniqueOnly((prev) => !prev);
  };

  useEffect(() => {
    const wantlistItems = find('tr[class*=wantlist]');

    const hide = (elem: HTMLElement) => {
      elem.classList.add('hidden');
    };
    const show = (elem: HTMLElement) => {
      elem.classList.remove('hidden');
    };

    const allWantlistReleases = wantlistItems.map(buildModel);

    if (showUniqueOnly) {
      allWantlistReleases.forEach((item, index, list) => {
        const isDup = isDuplicateRelease(item, index, list);
        if (isDup) {
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
      <button
        onClick={handleFilterUniqueItems}
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(220, 130, 0)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(255, 159, 0)')}
      >
        &#x23F7;&#xFE0E; Unique items
      </button>
    </div>
  );
}
