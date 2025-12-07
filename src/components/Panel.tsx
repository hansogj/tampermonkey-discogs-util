import React, { useEffect } from 'react';
import { CollectionPanel } from './CollectionPanel';
import { ArtistPanel } from './ArtistPanel';
import { WantlistPanel } from './WantlistPanel';

export function Panel({ onEmptyStateChange }: { onEmptyStateChange: (isEmpty: boolean) => void }) {
    const isCollectionPage = /^\/user\/[^\/]+\/collection/.test(window.location.pathname);
    const isArtistPage = window.location.pathname.startsWith('/artist');
    const isWantlistPage = window.location.pathname.startsWith('/mywantlist');

    const hasContent = isCollectionPage || isArtistPage || isWantlistPage;

    useEffect(() => {
        onEmptyStateChange(!hasContent);
    }, [hasContent, onEmptyStateChange]);

    return (
        <>
            {isCollectionPage && <CollectionPanel />}
            {isArtistPage && <ArtistPanel />}
            {isWantlistPage && <WantlistPanel />}
        </>
    );
}
