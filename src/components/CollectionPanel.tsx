import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCustomFields, applyBulkEdit } from '../api';
import { displayStatusMessage } from '../ui';
import { SELECTIONS_STORAGE_KEY } from '../constants';
import type { ApplyEditSelections, FieldsResponse, ErrorResponse } from '../types';

const loadingStyle: React.CSSProperties = {
    textAlign: 'center'
};

const errorStyle: React.CSSProperties = {
    color: '#ffc107',
    fontSize: '12px'
};

const errorPreStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '5px',
    borderRadius: '3px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all'
};

const hrStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid rgb(80, 80, 80)',
    margin: '25px 0 15px 0'
};

const h4Style: React.CSSProperties = {
    margin: '0 0 10px 0',
    fontSize: '14px',
    color: 'white',
    textAlign: 'center'
};

const dropdownContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const labelStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '12px',
    marginBottom: '4px',
    color: 'white'
};

const selectStyle: React.CSSProperties = {
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: 'rgb(80, 80, 80)',
    color: 'white',
    fontFamily: 'inherit',
    width: '100%'
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
    width: '100%'
};

export function CollectionPanel() {
    const [selections, setSelections] = useState<ApplyEditSelections>(() => {
        return GM_getValue(SELECTIONS_STORAGE_KEY, {});
    });

    const { data: fieldsResponse, isLoading, error } = useQuery<FieldsResponse, Error>({
        queryKey: ['customFields'],
        queryFn: getCustomFields,
    });

    const { mutate: performBulkEdit, isPending: isBulkEditing } = useMutation<string, Error, ApplyEditSelections>({
        mutationFn: applyBulkEdit,
        onSuccess: (data) => {
            displayStatusMessage(data, 'success', 0);
            setTimeout(() => location.reload(), 1500);
        },
        onError: (e) => {
            displayStatusMessage(e.message, 'error');
            console.error("Bulk edit mutation failed", e);
        }
    });

    const handleApplySelections = () => {
        GM_setValue(SELECTIONS_STORAGE_KEY, selections);
        performBulkEdit(selections);
    };
    
    const handleSelectionChange = (fieldId: number, value: string) => {
        setSelections(prev => ({...prev, [fieldId]: value}));
    };

    if (isLoading) {
        return <div style={loadingStyle}>Loading...</div>;
    }
    
    if (error) {
        return <div style={errorStyle}>
            <p style={{fontWeight: 'bold'}}>Authentication Failed</p>
            <p>Status: {error.message}</p>
            <pre style={errorPreStyle}>
                {error.message}
            </pre>
        </div>;
    }

    const dynamicButtonStyle = {
        ...buttonStyle,
        cursor: isBulkEditing ? 'not-allowed' : 'pointer',
        opacity: isBulkEditing ? '0.7' : '1'
    };

    const dropdownFields = fieldsResponse?.fields.filter(field => field.type === 'dropdown') || [];

    return (
        <div id="bulk-edit-section">
            <hr style={hrStyle} />
            <h4 style={h4Style}>Bulk edit</h4>
            
            {/* Dropdowns */}
            <div style={dropdownContainerStyle}>
                {dropdownFields.map((field: any) => (
                    <div key={field.id}>
                        <label htmlFor={`dhp-field-${field.id}`} style={labelStyle}>{field.name}</label>
                        <select 
                            id={`dhp-field-${field.id}`} 
                            style={selectStyle} 
                            value={selections[field.id] || ''} 
                            onChange={(e) => handleSelectionChange(field.id, e.target.value)}
                        >
                            <option value="">-- Select {field.name} --</option>
                            {field.options?.map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                ))}
            </div>

            {/* Apply Selections Button */}
            <button onClick={handleApplySelections} disabled={isBulkEditing} style={dynamicButtonStyle}
            onMouseEnter={(e) => { if (!isBulkEditing) e.currentTarget.style.backgroundColor = '#00a300'; }}
            onMouseLeave={(e) => { if (!isBulkEditing) e.currentTarget.style.backgroundColor = '#00c700'; }}>
                {isBulkEditing ? 'Applying...' : 'Apply Selections'}
            </button>
        </div>
    );
}
