import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCustomFields,
  applyBulkEdit,
  fetchInstanceIdFromApi,
  getCollectionFolders,
  moveReleaseToFolder,
} from '../api';
import { displayStatusMessage } from '../ui';
import { SELECTIONS_STORAGE_KEY } from '../constants';
import type { ApplyEditSelections, FieldsResponse, Folder } from '../types';

const loadingStyle: React.CSSProperties = {
  textAlign: 'center',
};

const errorStyle: React.CSSProperties = {
  color: '#ffc107',
  fontSize: '12px',
};

const hrStyle: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid rgb(80, 80, 80)',
  margin: '25px 0 15px 0',
};

const h4Style: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: 'white',
  textAlign: 'center',
};

const dropdownContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '12px',
  marginBottom: '4px',
  color: 'white',
};

const selectStyle: React.CSSProperties = {
  padding: '6px',
  borderRadius: '4px',
  border: '1px solid #555',
  backgroundColor: 'rgb(80, 80, 80)',
  color: 'white',
  fontFamily: 'inherit',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '15px',
  padding: '10px',
  backgroundColor: '#00c700', // Discogs green-ish
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontFamily: 'inherit',
  width: '100%',
};

export function ReleasePanel() {
  const [selections, setSelections] = useState<ApplyEditSelections>(() => {
    return GM_getValue(SELECTIONS_STORAGE_KEY, {});
  });
  const [targetFolderId, setTargetFolderId] = useState<string>('');

  const releaseIdMatch = window.location.pathname.match(/\/release\/(\d+)/);
  const releaseId = releaseIdMatch ? parseInt(releaseIdMatch[1], 10) : null;

  const {
    data: collectionItem,
    isLoading: isInstanceIdLoading,
    error: instanceIdError,
  } = useQuery<{ instanceId: number; folderId: number } | null, Error>({
    queryKey: ['collectionItem', releaseId],
    queryFn: () => {
      if (!releaseId) throw new Error('Could not extract release ID from URL.');
      return fetchInstanceIdFromApi(releaseId);
    },
    enabled: !!releaseId,
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
  });

  const instanceId = collectionItem?.instanceId;
  const currentFolderId = collectionItem?.folderId;

  const { data: folders, isLoading: areFoldersLoading } = useQuery<Folder[], Error>({
    queryKey: ['collectionFolders'],
    queryFn: getCollectionFolders,
    enabled: !!instanceId,
  });

  const {
    data: fieldsResponse,
    isLoading: isCustomFieldsLoading,
    error: customFieldsError,
  } = useQuery<FieldsResponse, Error>({
    queryKey: ['customFields'],
    queryFn: getCustomFields,
    enabled: !!instanceId,
  });

  const { mutateAsync: performEdit, isPending: isEditing } = useMutation({
    mutationFn: (vars: ApplyEditSelections) => applyBulkEdit(vars, instanceId ? [instanceId] : []),
    onSuccess: (data) => displayStatusMessage(data, 'success', 0),
    onError: (e) => {
      displayStatusMessage(e.message, 'error');
      console.error('Edit mutation failed', e);
    },
  });

  const { mutateAsync: performMove, isPending: isMoving } = useMutation({
    mutationFn: (newFolderId: number) => {
      if (!releaseId || !instanceId || !currentFolderId) throw new Error('Missing IDs for move.');
      return moveReleaseToFolder(releaseId, instanceId, currentFolderId, newFolderId);
    },
    onSuccess: () => displayStatusMessage('Release moved successfully!', 'success', 0),
    onError: (e) => {
      displayStatusMessage(e.message, 'error');
      console.error('Move mutation failed', e);
    },
  });

  const handleApplySelections = async () => {
    GM_setValue(SELECTIONS_STORAGE_KEY, selections);

    const hasFieldSelections = Object.values(selections).some((v) => v !== null);
    const hasFolderSelection = targetFolderId && Number(targetFolderId) !== currentFolderId;

    if (!hasFieldSelections && !hasFolderSelection) {
      return;
    }

    try {
      let changed = false;
      if (hasFieldSelections) {
        await performEdit(selections);
        changed = true;
      }
      if (hasFolderSelection) {
        await performMove(Number(targetFolderId));
        changed = true;
      }

      if (changed) {
        displayStatusMessage('Changes applied successfully!', 'success', 0);
        setTimeout(() => location.reload(), 1500);
      }
    } catch (e) {
      // Error is already handled by onError in useMutation
    }
  };

  const handleSelectionChange = (fieldId: number, value: string) => {
    setSelections((prev) => ({ ...prev, [fieldId]: value === '' ? null : value }));
  };

  if (!releaseId)
    return <div style={{ ...loadingStyle, fontSize: '12px' }}>Invalid release URL.</div>;
  if (isInstanceIdLoading)
    return (
      <div style={{ ...loadingStyle, fontSize: '12px' }}>Fetching collection status via API...</div>
    );
  if (instanceIdError)
    return (
      <div style={errorStyle}>
        <p>Failed to fetch collection status</p>
        <p>{instanceIdError.message}</p>
      </div>
    );
  if (!instanceId)
    return (
      <div style={{ ...loadingStyle, fontSize: '12px' }}>
        This release is not in your collection.
      </div>
    );

  const isLoading = isCustomFieldsLoading || areFoldersLoading;
  if (isLoading) return <div style={loadingStyle}>Loading...</div>;

  if (customFieldsError)
    return (
      <div style={errorStyle}>
        <p>Failed to load custom fields</p>
        <p>{customFieldsError.message}</p>
      </div>
    );

  const isWorking = isEditing || isMoving;
  const dynamicButtonStyle = {
    ...buttonStyle,
    cursor: isWorking ? 'not-allowed' : 'pointer',
    opacity: isWorking ? '0.7' : '1',
  };
  const dropdownFields = fieldsResponse?.fields.filter((field) => field.type === 'dropdown') || [];
  const currentFolderName = folders?.find((f) => f.id === currentFolderId)?.name || 'N/A';

  return (
    <div id="edit-section">
      <hr style={hrStyle} />
      <h4 style={h4Style}>Edit release fields</h4>

      <div style={dropdownContainerStyle}>
        {/* Folder dropdown */}
        <div>
          <label htmlFor="dhp-folder-select" style={labelStyle}>
            Folder
          </label>
          <div style={{ fontSize: '11px', color: '#ccc', marginBottom: '5px' }}>
            Current: {currentFolderName}
          </div>
          <select
            id="dhp-folder-select"
            style={selectStyle}
            value={targetFolderId}
            onChange={(e) => setTargetFolderId(e.target.value)}
          >
            <option value="">-- No change --</option>
            {folders?.map((folder: Folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        {/* Custom fields */}
        {dropdownFields.map((field: CustomField) => (
          <div key={field.id}>
            <label htmlFor={`dhp-field-${field.id}`} style={labelStyle}>
              {field.name}
            </label>
            <select
              id={`dhp-field-${field.id}`}
              style={selectStyle}
              value={selections[field.id] || ''}
              onChange={(e) => handleSelectionChange(field.id, e.target.value)}
            >
              <option value="">-- No change --</option>
              {field.options?.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button onClick={handleApplySelections} disabled={isWorking} style={dynamicButtonStyle}>
        {isWorking ? 'Applying...' : 'Apply Selections'}
      </button>
    </div>
  );
}
