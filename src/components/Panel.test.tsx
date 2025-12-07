import { describe, it, expect, vi, beforeEach, _afterEach, beforeAll, _afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Panel } from './Panel';

// Mock child components
vi.mock('./CollectionPanel', () => ({
  CollectionPanel: () => <div data-testid="CollectionPanel" />,
}));
vi.mock('./ArtistPanel', () => ({ ArtistPanel: () => <div data-testid="ArtistPanel" /> }));
vi.mock('./WantlistPanel', () => ({ WantlistPanel: () => <div data-testid="WantlistPanel" /> }));

describe('Panel', () => {
  const onEmptyStateChangeMock = vi.fn();
  let currentPathname = '/default-path'; // Variable to hold the mocked pathname

  beforeAll(() => {
    // Store original window.location
    // Mock window.location.pathname
    Object.defineProperty(window, 'location', {
      writable: true, // Make writable
      value: {
        ...window.location, // Copy original properties
        get pathname() {
          return currentPathname;
        },
        set pathname(value: string) {
          currentPathname = value;
        },
      },
    });
  });

  // No afterAll needed to restore window.location if we're only mocking a getter/setter on 'value'

  beforeEach(() => {
    currentPathname = '/default-path'; // Reset to a default path before each test
    onEmptyStateChangeMock.mockClear();
  });

  // No afterEach needed for pathname, as it's reset in beforeEach

  it('should render CollectionPanel on a collection page', () => {
    window.location.pathname = '/user/testuser/collection/123';
    render(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);
    expect(screen.getByTestId('CollectionPanel')).toBeInTheDocument();
    expect(screen.queryByTestId('ArtistPanel')).toBeNull();
    expect(screen.queryByTestId('WantlistPanel')).toBeNull();
    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(false);
  });

  it('should render ArtistPanel on an artist page', () => {
    window.location.pathname = '/artist/123-Some-Artist';
    render(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);
    expect(screen.getByTestId('ArtistPanel')).toBeInTheDocument();
    expect(screen.queryByTestId('CollectionPanel')).toBeNull();
    expect(screen.queryByTestId('WantlistPanel')).toBeNull();
    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(false);
  });

  it('should render WantlistPanel on a wantlist page', () => {
    window.location.pathname = '/mywantlist';
    render(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);
    expect(screen.getByTestId('WantlistPanel')).toBeInTheDocument();
    expect(screen.queryByTestId('CollectionPanel')).toBeNull();
    expect(screen.queryByTestId('ArtistPanel')).toBeNull();
    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(false);
  });

  it('should not render any panels and report empty state on a generic page', () => {
    window.location.pathname = '/explore';
    render(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);
    expect(screen.queryByTestId('CollectionPanel')).toBeNull();
    expect(screen.queryByTestId('ArtistPanel')).toBeNull();
    expect(screen.queryByTestId('WantlistPanel')).toBeNull();
    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(true);
  });

  it('should not render any panels on a shop page and report empty state', () => {
    // isShopPage is defined in Panel.tsx based on pathname.
    // Even though no panel is specifically for shop page, it should result in empty state.
    window.location.pathname = '/sell/item/123';
    render(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);
    expect(screen.queryByTestId('CollectionPanel')).toBeNull();
    expect(screen.queryByTestId('ArtistPanel')).toBeNull();
    expect(screen.queryByTestId('WantlistPanel')).toBeNull();
    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(true);
  });

  it('should update onEmptyStateChange if pathname changes dynamically', async () => {
    // Initial render with a generic path
    window.location.pathname = '/explore';
    const { rerender } = render(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);

    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(true);
    onEmptyStateChangeMock.mockClear(); // Clear mock to check new calls

    // Simulate a change in pathname to an artist page
    window.location.pathname = '/artist/123-Some-Artist';
    rerender(<Panel onEmptyStateChange={onEmptyStateChangeMock} />);

    // We expect the effect to run again and call onEmptyStateChange with false
    // Because the Panel component uses a useEffect that depends on these path flags
    expect(onEmptyStateChangeMock).toHaveBeenCalledWith(false);
  });
});
