import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCustomFields, applyBulkEdit, fetchInstanceIdFromApi } from '../api';
import { displayStatusMessage } from '../ui';
import { SELECTIONS_STORAGE_KEY } from '../constants';
import type { ApplyEditSelections, FieldsResponse } from '../types';

const loadingStyle: React.CSSProperties = {
  textAlign: 'center',
};

const errorStyle: React.CSSProperties = {
  color: '#ffc107',
  fontSize: '12px',
};

const errorPreStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.2)',
  padding: '5px',
  borderRadius: '3px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
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

  // Extract releaseId from URL
  const releaseIdMatch = window.location.pathname.match(/\/release\/(\d+)/);
  const releaseId = releaseIdMatch ? parseInt(releaseIdMatch[1], 10) : null;

  const {
    data: instanceId,
    isLoading: isInstanceIdLoading,
    error: instanceIdError,
  } = useQuery<number | null, Error>({
    queryKey: ['instanceId', releaseId],
    queryFn: () => {
      if (!releaseId) {
        throw new Error('Could not extract release ID from URL.');
      }
      return fetchInstanceIdFromApi(releaseId);
    },
    enabled: !!releaseId, // Only run this query if we have a valid releaseId
    staleTime: Infinity, // The instanceId for a release in collection won't change often
    cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const {
    data: fieldsResponse,
    isLoading: isCustomFieldsLoading,
    error: customFieldsError,
  } = useQuery<FieldsResponse, Error>({
    queryKey: ['customFields'],
    queryFn: getCustomFields,
    enabled: !!instanceId, // Only fetch custom fields if we have an instanceId
  });

  const { mutate: performEdit, isPending: isEditing } = useMutation<
    string,
    Error,
    ApplyEditSelections
  >({
    mutationFn: (vars) => applyBulkEdit(vars, instanceId ? [instanceId] : []),
    onSuccess: (data) => {
      displayStatusMessage(data, 'success', 0);
      setTimeout(() => location.reload(), 1500);
    },
    onError: (e) => {
      displayStatusMessage(e.message, 'error');
      console.error('Edit mutation failed', e);
    },
  });

  const handleApplySelections = () => {
    GM_setValue(SELECTIONS_STORAGE_KEY, selections);
    performEdit(selections);
  };

  const handleSelectionChange = (fieldId: number, value: string) => {
    setSelections((prev) => ({ ...prev, [fieldId]: value === '' ? null : value }));
  };

  if (!releaseId) {
    return (
      <div style={{ ...loadingStyle, fontSize: '12px' }}>
        Invalid release URL.
      </div>
    );
  }

  if (isInstanceIdLoading) {
    return (
      <div style={{ ...loadingStyle, fontSize: '12px' }}>
        Fetching collection status via API...
      </div>
    );
  }

  if (instanceIdError) {
    return (
      <div style={errorStyle}>
        <p style={{ fontWeight: 'bold' }}>Failed to fetch collection status</p>
        <p>Status: {instanceIdError.message}</p>
        <pre style={errorPreStyle}>{instanceIdError.message}</pre>
      </div>
    );
  }

  if (!instanceId) {
    return (
      <div style={{ ...loadingStyle, fontSize: '12px' }}>
        This release is not in your collection.
      </div>
    );
  }

  if (isCustomFieldsLoading) {
    return <div style={loadingStyle}>Loading custom fields...</div>;
  }

  if (customFieldsError) {
    return (
      <div style={errorStyle}>
        <p style={{ fontWeight: 'bold' }}>Failed to load custom fields</p>
        <p>Status: {customFieldsError.message}</p>
        <pre style={errorPreStyle}>{customFieldsError.message}</pre>
      </div>
    );
  }

  const dynamicButtonStyle = {
    ...buttonStyle,
    cursor: isEditing ? 'not-allowed' : 'pointer',
    opacity: isEditing ? '0.7' : '1',
  };

  const dropdownFields = fieldsResponse?.fields.filter((field) => field.type === 'dropdown') || [];

  return (
    <div id="edit-section">
      <hr style={hrStyle} />
      <h4 style={h4Style}>Edit release fields</h4>

      {dropdownFields.length > 0 ? (
        <>
          <div style={dropdownContainerStyle}>
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
          <button
            onClick={handleApplySelections}
            disabled={isEditing}
            style={dynamicButtonStyle}
            onMouseEnter={(e) => {
              if (!isEditing) e.currentTarget.style.backgroundColor = '#00a300';
            }}
            onMouseLeave={(e) => {
              if (!isEditing) e.currentTarget.style.backgroundColor = '#00c700';
            }}
          >
            {isEditing ? 'Applying...' : 'Apply Selections'}
          </button>
        </>
      ) : (
        <div style={{ ...loadingStyle, fontSize: '12px' }}>No dropdown custom fields found.</div>
      )}
    </div>
  );
}
