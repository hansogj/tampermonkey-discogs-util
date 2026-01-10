import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCustomFields, applyBulkEdit, getCollectionFolders, moveReleaseToFolder } from '../api';
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

export function CollectionPanel() {
  const [selections, setSelections] = useState<ApplyEditSelections>(() => {
    return GM_getValue(SELECTIONS_STORAGE_KEY, {});
  });
  const [targetFolderId, setTargetFolderId] = useState('');

  const currentUrlFolderId = new URLSearchParams(window.location.search).get('folder_id');

  const { data: fieldsResponse, isLoading: isCustomFieldsLoading, error: customFieldsError } = useQuery<FieldsResponse, Error>({
    queryKey: ['customFields'],
    queryFn: getCustomFields,
  });

  const { data: folders, isLoading: areFoldersLoading } = useQuery<Folder[], Error>({
    queryKey: ['collectionFolders'],
    queryFn: getCollectionFolders,
    enabled: true,
  });

  const { mutateAsync: performBulkEdit, isPending: isBulkEditing } = useMutation<
    string,
    Error,
    ApplyEditSelections
  >({
    mutationFn: applyBulkEdit,
    onSuccess: (data) => displayStatusMessage(data, 'success', 0),
    onError: (e) => {
      displayStatusMessage(e.message, 'error');
      console.error('Bulk edit mutation failed', e);
    },
  });

  const { mutateAsync: performBulkMove, isPending: isBulkMoving } = useMutation({
    mutationFn: async (vars: { targetFolderId: number }) => {
      if (!folders) throw new Error('Folder list not loaded.');
      
      let itemsToMove: HTMLElement[];
      const selectedRows = Array.from(
        document.querySelectorAll('[data-field="__check__"] input[aria-label~="row"]:checked'),
      ) as HTMLInputElement[];

      if (selectedRows.length > 0) {
        itemsToMove = selectedRows
          .map((checkbox) => checkbox.closest('div.MuiDataGrid-row[data-id]'))
          .filter(Boolean) as HTMLElement[];
      } else {
        itemsToMove = Array.from(document.querySelectorAll('div.MuiDataGrid-row[data-id]')) as HTMLElement[];
      }

      if (itemsToMove.length === 0) {
        return 'No items found to move.';
      }

      let movedCount = 0;
      for (const item of itemsToMove) {
        const instanceId = parseInt(item.dataset.id || '', 10);

        const releaseLink = item.querySelector('a[href*="/release/"]');
        const releaseIdMatch = releaseLink?.getAttribute('href')?.match(/\/release\/(\d+)/);
        const releaseId = releaseIdMatch ? parseInt(releaseIdMatch[1], 10) : null;

        let itemCurrentFolderId: number | null = null;
        
        const folderCell = item.querySelector('[data-field="folder"]');
        const folderName = folderCell?.textContent?.trim();
        if(folderName){
            const folder = folders.find(f => f.name === folderName);
            if(folder) itemCurrentFolderId = folder.id;
        }
        
        if(!itemCurrentFolderId) {
            const folderLink = item.querySelector('a[href*="folder_id="]');
            if (folderLink) {
                const folderIdMatch = folderLink.getAttribute('href')?.match(/folder_id=(\d+)/);
                if (folderIdMatch && folderIdMatch[1]) {
                    itemCurrentFolderId = parseInt(folderIdMatch[1], 10);
                }
            }
        }

        if (instanceId && releaseId && itemCurrentFolderId !== null) {
          if (itemCurrentFolderId !== vars.targetFolderId) {
            await moveReleaseToFolder(
              releaseId,
              instanceId,
              itemCurrentFolderId,
              vars.targetFolderId,
            );
            movedCount++;
          }
        } else {
          console.warn(
            `Skipping item due to missing ID(s) or current folder: instanceId=${instanceId}, releaseId=${releaseId}, currentFolderId=${itemCurrentFolderId}`,
          );
        }
      }
      return `Moved ${movedCount} items.`;
    },
    onSuccess: (data) => displayStatusMessage(data, 'success', 0),
    onError: (e: Error) => {
      displayStatusMessage(e.message, 'error');
      console.error('Bulk move mutation failed', e);
    },
  });

  const handleApplySelections = async () => {
    GM_setValue(SELECTIONS_STORAGE_KEY, selections);

    const hasFieldSelections = Object.values(selections).some((v) => v !== null);
    const hasFolderSelection = !!targetFolderId;

    if (!hasFieldSelections && !hasFolderSelection) {
      return; // Nothing to do
    }

    try {
      let changed = false;
      if (hasFieldSelections) {
        await performBulkEdit(selections);
        changed = true;
      }
      if (hasFolderSelection) {
        await performBulkMove({ targetFolderId: Number(targetFolderId) });
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

  const isLoading = isCustomFieldsLoading || areFoldersLoading;
  if (isLoading) return <div style={loadingStyle}>Loading...</div>;

  if (customFieldsError)
    return (
      <div style={errorStyle}>
        <p>Authentication Failed</p>
        <pre>{customFieldsError.message}</pre>
      </div>
    );

  const isWorking = isBulkEditing || isBulkMoving;
  const dynamicButtonStyle = {
    ...buttonStyle,
    cursor: isWorking ? 'not-allowed' : 'pointer',
    opacity: isWorking ? '0.7' : '1',
  };
  const dropdownFields = fieldsResponse?.fields.filter((field) => field.type === 'dropdown') || [];

  return (
    <div id="bulk-edit-section">
      <hr style={hrStyle} />
      <h4 style={h4Style}>Bulk edit</h4>

      <div style={dropdownContainerStyle}>
        {folders && (
          <div>
            <label htmlFor="dhp-folder-select" style={labelStyle}>
              Move selected to
            </label>
            <select
              id="dhp-folder-select"
              style={selectStyle}
              value={targetFolderId}
              onChange={(e) => setTargetFolderId(e.target.value)}
            >
              <option value="">-- Leave unchanged --</option>
              {folders
                .filter((f) => f.id.toString() !== currentUrlFolderId)
                .map((folder: Folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>
          </div>
        )}

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