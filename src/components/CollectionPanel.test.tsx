import { describe, it, expect, vi, beforeEach, _afterEach } from 'vitest';
import { render, screen, fireEvent, _waitFor } from '@testing-library/react';
import React from 'react';
import { CollectionPanel } from './CollectionPanel';
import { useQuery, useMutation } from '@tanstack/react-query';
import * as ui from '../ui';
import { SELECTIONS_STORAGE_KEY } from '../constants';
import type { FieldsResponse, CustomField } from '../types';

// Mock Tanstack Query hooks
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

// Mock API functions
vi.mock('../api', () => ({
  getCustomFields: vi.fn(),
  applyBulkEdit: vi.fn(),
  __SetAllCustomFields: vi.fn(),
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
    { id: 3, name: 'Description', type: 'textarea' },
  ];
  const mockFieldsResponse: FieldsResponse = { fields: mockFields };

  let mockMutateSpy: vi.Mock; // Spy for the mutate function
  let useMutationConfigOnSuccess: (...args: unknown[]) => unknown; // To capture onSuccess from config
  let useMutationConfigOnError: (...args: unknown[]) => unknown; // To capture onError from config
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy.mockClear(); // Clear spy history
    // Default mock for useQuery
    (useQuery as vi.Mock).mockReturnValue({
      data: mockFieldsResponse,
      isLoading: false,
      error: null,
    });

    mockMutateSpy = vi.fn();
    (useMutation as vi.Mock).mockImplementation((config) => {
      useMutationConfigOnSuccess = config.onSuccess; // Capture config.onSuccess
      useMutationConfigOnError = config.onError; // Capture config.onError
      return {
        mutate: mockMutateSpy,
        isPending: false,
      };
    });

    (global.GM_getValue as vi.Mock).mockReturnValue({}); // Default empty selections
  });

  it('should show loading state', () => {
    (useQuery as vi.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    render(<CollectionPanel />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const mockError = new Error('Unauthorized');
    (useQuery as vi.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
    });
    render(<CollectionPanel />);
    expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    expect(screen.getByText('Status: Unauthorized')).toBeInTheDocument();
    expect(screen.getByText('Unauthorized', { selector: 'pre' })).toBeInTheDocument();
  });

  it('should render dynamic dropdowns for dropdown custom fields', () => {
    render(<CollectionPanel />);
    expect(screen.getByLabelText('Media Condition')).toBeInTheDocument();
    expect(screen.getByLabelText('Sleeve Condition')).toBeInTheDocument();
    expect(screen.queryByLabelText('Description')).toBeNull();

    expect(
      screen.getByRole('option', { name: '-- Select Media Condition --' }),
    ).toBeInTheDocument();
    const mintOptions = screen.getAllByRole('option', { name: 'Mint' });
    expect(mintOptions.length).toBe(2);
    expect(mintOptions[0]).toBeInTheDocument();
    expect(screen.getAllByRole('option', { name: 'Near Mint' }).length).toBe(2);
  });

  it('should load initial selections from GM_getValue', () => {
    const initialSelections = { 1: 'Near Mint' };
    (global.GM_getValue as vi.Mock).mockReturnValue(initialSelections);
    render(<CollectionPanel />);
    expect(screen.getByLabelText('Media Condition')).toHaveValue('Near Mint');
  });

  it('should update selections state on dropdown change', () => {
    render(<CollectionPanel />);
    const mediaConditionSelect = screen.getByLabelText('Media Condition') as HTMLSelectElement;
    fireEvent.change(mediaConditionSelect, { target: { value: 'Near Mint' } });
    expect(mediaConditionSelect.value).toBe('Near Mint');
  });

  it('should call applyBulkEdit with current selections on button click', async () => {
    render(<CollectionPanel />);
    const mediaConditionSelect = screen.getByLabelText('Media Condition') as HTMLSelectElement;
    fireEvent.change(mediaConditionSelect, { target: { value: 'Mint' } });

    const applyButton = screen.getByRole('button', { name: 'Apply Selections' });
    fireEvent.click(applyButton);

    expect(global.GM_setValue).toHaveBeenCalledWith(SELECTIONS_STORAGE_KEY, { 1: 'Mint' });
    expect(mockMutateSpy).toHaveBeenCalledWith({ 1: 'Mint' }); // No options object here
  });

  it('should display success message and reload on successful bulk edit', async () => {
    const mockSuccessData = 'Success message from API';
    vi.useFakeTimers(); // Use fake timers for this test
    render(<CollectionPanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Apply Selections' }));

    // Manually trigger the captured onSuccess callback from useMutation config
    useMutationConfigOnSuccess(mockSuccessData);

    expect(ui.displayStatusMessage).toHaveBeenCalledWith(mockSuccessData, 'success', 0);
    vi.advanceTimersByTime(1500); // Advance timers for location.reload()
    expect(location.reload).toHaveBeenCalledTimes(1);
    vi.useRealTimers(); // Restore real timers
  });

  it('should display error message on failed bulk edit', async () => {
    const mockErrorMessage = 'Bulk edit failed from API';
    const mockError = new Error(mockErrorMessage);
    render(<CollectionPanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Apply Selections' }));

    // Manually trigger the captured onError callback from useMutation config
    useMutationConfigOnError(mockError);

    expect(ui.displayStatusMessage).toHaveBeenCalledWith(mockErrorMessage, 'error');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Bulk edit mutation failed', mockError);
    expect(location.reload).not.toHaveBeenCalled();
  });

  it('should disable apply button when bulk editing is pending', () => {
    (useMutation as vi.Mock).mockReturnValue({ mutate: vi.fn(), isPending: true });
    render(<CollectionPanel />);
    expect(screen.getByRole('button', { name: 'Applying...' })).toBeDisabled();
  });
});
