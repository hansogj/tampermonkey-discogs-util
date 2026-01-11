import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CollectionPanel } from './CollectionPanel';
import { useQuery, useMutation } from '@tanstack/react-query';
import type { FieldsResponse, CustomField, Folder } from '../types';

// Mock Tanstack Query hooks
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

// Mock API functions
vi.mock('../api', () => ({
  getCustomFields: vi.fn(),
  applyBulkEdit: vi.fn(),
  getCollectionFolders: vi.fn(),
  moveReleaseToFolder: vi.fn(),
}));

// Mock UI functions
vi.mock('../ui', () => ({
  displayStatusMessage: vi.fn(),
}));

// Mock Tampermonkey globals
global.GM_getValue = vi.fn();
global.GM_setValue = vi.fn();
global.location = { reload: vi.fn() } as unknown as Location;

describe('CollectionPanel', () => {
  const mockFields: CustomField[] = [
    { id: 1, name: 'Media Condition', type: 'dropdown', options: ['Mint', 'Near Mint'] },
    { id: 2, name: 'Sleeve Condition', type: 'dropdown', options: ['Mint', 'Near Mint'] },
  ];
  const mockFolders: Folder[] = [
    { id: 1, name: 'All', count: 10 },
    { id: 123, name: 'My Folder', count: 5 },
  ];
  const mockFieldsResponse: FieldsResponse = { fields: mockFields };

  let mockBulkEditMutateAsync: vi.Mock;
  let mockBulkMoveMutateAsync: vi.Mock;
  let mutationCallCount: number;
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy.mockClear();
    mutationCallCount = 0; // Reset counter

    (useQuery as vi.Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'customFields') {
        return { data: mockFieldsResponse, isLoading: false, error: null };
      }
      if (queryKey[0] === 'collectionFolders') {
        return { data: mockFolders, isLoading: false, error: null };
      }
      return { data: undefined, isLoading: false, error: null };
    });

    mockBulkEditMutateAsync = vi.fn().mockResolvedValue('Success');
    mockBulkMoveMutateAsync = vi.fn().mockResolvedValue('Success');

    (useMutation as vi.Mock).mockImplementation(() => {
      const result =
        mutationCallCount === 0
          ? { mutateAsync: mockBulkEditMutateAsync, isPending: false }
          : { mutateAsync: mockBulkMoveMutateAsync, isPending: false };
      mutationCallCount++;
      return result;
    });

    (global.GM_getValue as vi.Mock).mockReturnValue({});
  });

  it('should show loading state for fields', () => {
    (useQuery as vi.Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'customFields') {
        return { data: undefined, isLoading: true, error: null };
      }
      return { data: [], isLoading: false, error: null };
    });
    render(<CollectionPanel />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state for fields', () => {
    const mockError = new Error('Unauthorized');
    (useQuery as vi.Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'customFields') {
        return { data: undefined, isLoading: false, error: mockError };
      }
      return { data: [], isLoading: false, error: null };
    });
    render(<CollectionPanel />);
    expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    expect(screen.getByText(mockError.message, { selector: 'pre' })).toBeInTheDocument();
  });

  it('should render dynamic dropdowns for custom fields and folders', () => {
    render(<CollectionPanel />);
    expect(screen.getByLabelText('Media Condition')).toBeInTheDocument();
    expect(screen.getByLabelText('Sleeve Condition')).toBeInTheDocument();
    expect(screen.getByLabelText('Move selected to')).toBeInTheDocument();
  });

  it.skip('should call applyBulkEdit when selections are made', async () => {
    const user = userEvent.setup();
    render(<CollectionPanel />);
    const mediaConditionSelect = screen.getByLabelText('Media Condition');

    await user.selectOptions(mediaConditionSelect, 'Mint');

    const applyButton = screen.getByRole('button', { name: 'Apply Selections' });
    await user.click(applyButton);

    expect(mockBulkEditMutateAsync).toHaveBeenCalled();
  });

  it('should call performBulkMove when a folder is selected', async () => {
    const user = userEvent.setup();
    document.body.innerHTML = `<div data-id="123"><input type="checkbox" aria-label="row" checked /></div>`;

    render(<CollectionPanel />);
    const folderSelect = screen.getByLabelText('Move selected to');
    await user.selectOptions(folderSelect, 'My Folder');

    const applyButton = screen.getByRole('button', { name: 'Apply Selections' });
    await user.click(applyButton);

    expect(mockBulkMoveMutateAsync).toHaveBeenCalledWith({ targetFolderId: 123 });
  });
});
