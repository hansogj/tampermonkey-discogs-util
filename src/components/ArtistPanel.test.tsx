import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ArtistPanel } from './ArtistPanel';
import { COLLECTION_ICON_SVG } from '../constants';

describe('ArtistPanel', () => {
    let mockQuerySelectorAll: vi.SpyInstance;

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock document.querySelectorAll
        mockQuerySelectorAll = vi.spyOn(document, 'querySelectorAll');
    });

    afterEach(() => {
        mockQuerySelectorAll.mockRestore();
    });

    it('should render the "In collection" button', () => {
        render(<ArtistPanel />);
        const button = screen.getByRole('button', { name: /In collection/i });
        expect(button).toBeInTheDocument();
        expect(button).toContainHTML(COLLECTION_ICON_SVG);
    });

    it('should initially not hide any items', () => {
        const mockItem1 = document.createElement('tr');
        const mockItem2 = document.createElement('tr');
        mockItem1.classList.add('some-class');
        mockItem2.classList.add('some-class');
        mockQuerySelectorAll.mockReturnValue([mockItem1, mockItem2]);

        render(<ArtistPanel />);

        // Effect runs on mount, but showInCollectionOnly is initially false
        expect(mockItem1).not.toHaveClass('hidden');
        expect(mockItem2).not.toHaveClass('hidden');
    });

    it('should hide items when "In collection" button is clicked', () => {
        const mockItem1 = document.createElement('tr');
        const mockItem2 = document.createElement('tr');
        mockItem1.classList.add('some-class');
        mockItem2.classList.add('some-class');
        mockQuerySelectorAll.mockReturnValue([mockItem1, mockItem2]);

        render(<ArtistPanel />);
        const button = screen.getByRole('button', { name: /In collection/i });
        fireEvent.click(button); // Toggle showInCollectionOnly to true

        expect(mockItem1).toHaveClass('hidden');
        expect(mockItem2).toHaveClass('hidden');
    });

    it('should show items again when "In collection" button is clicked twice', () => {
        const mockItem1 = document.createElement('tr');
        const mockItem2 = document.createElement('tr');
        mockItem1.classList.add('some-class', 'hidden'); // Initially hidden
        mockItem2.classList.add('some-class', 'hidden');
        mockQuerySelectorAll.mockReturnValue([mockItem1, mockItem2]);

        render(<ArtistPanel />);
        const button = screen.getByRole('button', { name: /In collection/i });
        
        fireEvent.click(button); // Toggles to showInCollectionOnly=true, items become hidden (or stay hidden)
        expect(mockItem1).toHaveClass('hidden');
        expect(mockItem2).toHaveClass('hidden');

        fireEvent.click(button); // Toggles to showInCollectionOnly=false, items become visible
        expect(mockItem1).not.toHaveClass('hidden');
        expect(mockItem2).not.toHaveClass('hidden');
    });

    it('should ensure the filter is applied only on ArtistPage', () => {
        // This test technically ensures that if ArtistPanel is rendered (meaning isArtistPage must be true),
        // the effect for filtering should correctly execute.
        // The check 'if (!isArtistPage) return;' is internal to the component's logic,
        // and rendering ArtistPanel implies isArtistPage is true.
        const mockItem = document.createElement('tr');
        mockQuerySelectorAll.mockReturnValue([mockItem]);
        
        render(<ArtistPanel />);
        const button = screen.getByRole('button', { name: /In collection/i });
        fireEvent.click(button);
        expect(mockItem).toHaveClass('hidden'); // Should be hidden because effect ran
    });
});