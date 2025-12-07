import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { WantlistPanel } from './WantlistPanel';
import * as ui from '../ui'; // Import the ui module to mock its find function

describe('WantlistPanel', () => {
  // Mock the find function from ui.ts
  const findSpy = vi.spyOn(ui, 'find');
  // Removed classList spies as they were not the direct problem, just added noise.

  const createMockReleaseElement = (
    artist: string,
    title: string,
    releaseId: string,
    isWantlist = true,
  ): HTMLElement => {
    const tr = document.createElement('tr');
    if (isWantlist) {
      tr.classList.add('wantlist');
    }
    // Let the component handle adding/removing 'hidden' class based on logic

    const tdArtistTitle = document.createElement('td');
    tdArtistTitle.className = 'artist_title';

    const artistLink = document.createElement('a');
    artistLink.href = `/artist/${artist.replace(' ', '-')}`;
    artistLink.textContent = artist;
    tdArtistTitle.appendChild(artistLink);

    const titleLink = document.createElement('a');
    titleLink.href = `/release/${releaseId}`;
    titleLink.textContent = title;
    tdArtistTitle.appendChild(titleLink);

    tr.appendChild(tdArtistTitle);
    return tr;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = ''; // Clean up DOM for each test
    findSpy.mockClear(); // Clear history of the spy
    // Default mock implementation for ui.find, if not specifically mocked in a test.
    // It should delegate to the real DOM query behavior.
    findSpy.mockImplementation((selector: string, root: ParentNode = document) => {
      return Array.from(root.querySelectorAll(selector)) as HTMLElement[];
    });
  });

  afterEach(() => {
    findSpy.mockRestore(); // Restore the original find function
  });

  it('diagnostic: classList remove works', () => {
    const el = document.createElement('div');
    el.classList.add('test-class', 'hidden');
    expect(el).toHaveClass('hidden');
    el.classList.remove('hidden');
    expect(el).not.toHaveClass('hidden');
  });

  it("diagnostic: WantlistPanel's show function works", async () => {
    const testElem = document.createElement('tr');
    testElem.classList.add('wantlist', 'hidden');
    document.body.appendChild(testElem);

    // This is the function extracted from WantlistPanel.tsx for direct testing
    const showFn = (elem: HTMLElement) => {
      elem.classList.remove('hidden');
    };

    showFn(testElem); // Call the function directly

    expect(testElem).not.toHaveClass('hidden');
  });

  it('should render the "Unique items" button', () => {
    render(<WantlistPanel />);
    const button = screen.getByRole('button', { name: /Unique items/i });
    expect(button).toBeInTheDocument();
  });

  it('should initially not hide any items if filter is off', () => {
    const mockItem1 = createMockReleaseElement('Artist A', 'Title 1', '101');
    const mockItem2 = createMockReleaseElement('Artist B', 'Title 2', '102');
    document.body.appendChild(mockItem1); // Append here
    document.body.appendChild(mockItem2); // Append here

    render(<WantlistPanel />);

    // Effect runs on mount, but showUniqueOnly is initially false, so all should be visible
    const items = ui.find('tr[class*=wantlist]');
    expect(items[0]).not.toHaveClass('hidden');
    expect(items[1]).not.toHaveClass('hidden');
  });

  it('should hide duplicate items when "Unique items" button is clicked', async () => {
    const mockItem1 = createMockReleaseElement('Artist A', 'Title 1', '101');
    const mockItem2 = createMockReleaseElement('Artist A', 'Title 1', '102'); // Duplicate
    const mockItem3 = createMockReleaseElement('Artist B', 'Title 2', '103');
    const mockItem4 = createMockReleaseElement('Artist B', 'Title 2', '104'); // Duplicate
    document.body.appendChild(mockItem1); // Append here
    document.body.appendChild(mockItem2); // Append here
    document.body.appendChild(mockItem3); // Append here
    document.body.appendChild(mockItem4); // Append here

    render(<WantlistPanel />);
    const button = screen.getByRole('button', { name: /Unique items/i });

    await act(async () => {
      // Wrap interaction that triggers state update and re-render
      fireEvent.click(button); // Toggle showUniqueOnly to true
    });

    // Diagnostic logs removed for cleaner output; rely on assertions now.

    expect(mockItem1).not.toHaveClass('hidden'); // First instance of Artist A - Title 1
    expect(mockItem2).toHaveClass('hidden'); // Second instance of Artist A - Title 1
    expect(mockItem3).not.toHaveClass('hidden'); // First instance of Artist B - Title 2
    expect(mockItem4).toHaveClass('hidden'); // Second instance of Artist B - Title 2
  });

  it('should show all items again when "Unique items" button is clicked twice', async () => {
    const mockItem1 = createMockReleaseElement('Artist A', 'Title 1', '101');
    const mockItem2 = createMockReleaseElement('Artist A', 'Title 1', '102'); // Duplicate
    document.body.appendChild(mockItem1); // Append here
    document.body.appendChild(mockItem2); // Append here

    render(<WantlistPanel />);
    const button = screen.getByRole('button', { name: /Unique items/i });

    await act(async () => {
      fireEvent.click(button); // Toggles to showUniqueOnly=true, hides duplicates
    });
    expect(mockItem1).not.toHaveClass('hidden');
    expect(mockItem2).toHaveClass('hidden');

    await act(async () => {
      fireEvent.click(button); // Toggles to showUniqueOnly=false, shows all
    });
    expect(mockItem1).not.toHaveClass('hidden');
    expect(mockItem2).not.toHaveClass('hidden');
  });

  it('should handle case sensitivity for artist and title', async () => {
    const mockItem1 = createMockReleaseElement('artist a', 'title 1', '101');
    const mockItem2 = createMockReleaseElement('Artist A', 'Title 1', '102'); // Duplicate, case-insensitive
    document.body.appendChild(mockItem1); // Append here
    document.body.appendChild(mockItem2); // Append here

    render(<WantlistPanel />);
    const button = screen.getByRole('button', { name: /Unique items/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockItem1).not.toHaveClass('hidden');
    expect(mockItem2).toHaveClass('hidden');
  });

  it('should correctly identify duplicates with multiple unique items', async () => {
    const mockItems = [
      createMockReleaseElement('Artist X', 'Album Y', '201'), // Unique
      createMockReleaseElement('Artist X', 'Album Y', '202'), // Duplicate of 201
      createMockReleaseElement('Artist A', 'Album B', '301'), // Unique
      createMockReleaseElement('Artist A', 'Album C', '302'), // Unique (different title)
      createMockReleaseElement('Artist X', 'Album Y', '203'), // Duplicate of 201
      createMockReleaseElement('Artist A', 'Album B', '303'), // Duplicate of 301
    ];
    mockItems.forEach((item) => document.body.appendChild(item)); // Append all here

    render(<WantlistPanel />);
    const button = screen.getByRole('button', { name: /Unique items/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockItems[0]).not.toHaveClass('hidden'); // Artist X - Album Y (first)
    expect(mockItems[1]).toHaveClass('hidden'); // Artist X - Album Y (duplicate)
    expect(mockItems[2]).not.toHaveClass('hidden'); // Artist A - Album B (first)
    expect(mockItems[3]).not.toHaveClass('hidden'); // Artist A - Album C (unique title)
    expect(mockItems[4]).toHaveClass('hidden'); // Artist X - Album Y (duplicate)
    expect(mockItems[5]).toHaveClass('hidden'); // Artist A - Album B (duplicate)
  });
});
