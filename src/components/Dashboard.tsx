import React, { useState } from 'react';
import {
  DEFAULT_HIGHLIGHTED_LABELS,
  CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
  LABEL_QUALITY_COLORS,
} from '../constants';
import type { HighlightedLabels, LabelQuality } from '../types';

const dashboardStyle: React.CSSProperties = {
  padding: '10px',
  color: 'white',
};

const h4Style: React.CSSProperties = {
  marginTop: '0',
  textAlign: 'center',
};

const categoryStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const gridContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 4 columns
  gap: '5px',
  marginBottom: '10px',
};

const baseLabelItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px',
  borderRadius: '3px',
  fontSize: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const removeButtonStyle: React.CSSProperties = {
  marginLeft: '5px',
  color: 'red',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '12px',
  padding: '0',
};

const inputStyle: React.CSSProperties = {
  width: 'calc(100% - 60px)', // Adjust width for Add button
  padding: '5px',
  marginRight: '5px',
  border: '1px solid #555',
  backgroundColor: 'rgb(80, 80, 80)',
  color: 'white',
  borderRadius: '3px',
};

const addButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#00c700',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  fontSize: '12px',
};

const saveButtonStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  backgroundColor: '#00c700',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export function Dashboard({ onSaveSuccess }: { onSaveSuccess: () => void }) {
  const [labels, setLabels] = useState<HighlightedLabels>(() => {
    return GM_getValue(CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY, DEFAULT_HIGHLIGHTED_LABELS);
  });
  const [newLabels, setNewLabels] = useState<Record<LabelQuality, string>>({
    poor: '',
    fair: '',
    good: '',
    veryGood: '',
  });

  const handleRemoveLabel = (quality: LabelQuality, labelToRemove: string) => {
    setLabels((prev: HighlightedLabels) => ({
      ...prev,
      [quality]: prev[quality].filter((label: string) => label !== labelToRemove),
    }));
  };

  const handleAddLabel = (quality: LabelQuality) => {
    const newLabel = newLabels[quality].trim();
    if (newLabel && !labels[quality].includes(newLabel)) {
      setLabels((prev: HighlightedLabels) => ({
        ...prev,
        [quality]: [...prev[quality], newLabel],
      }));
      setNewLabels((prev) => ({ ...prev, [quality]: '' }));
    }
  };

  const handleInputChange = (quality: LabelQuality, value: string) => {
    setNewLabels((prev) => ({ ...prev, [quality]: value }));
  };

  const handleSave = () => {
    GM_setValue(CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY, labels);
    onSaveSuccess(); // Call the callback after successful save
  };

  return (
    <div style={dashboardStyle}>
      <h4 style={h4Style}>Customize Highlighted Labels</h4>
      {(Object.keys(labels) as LabelQuality[]).map((quality) => (
        <div key={quality} style={categoryStyle}>
          <h5>{quality.charAt(0).toUpperCase() + quality.slice(1)}</h5>
          <div style={gridContainerStyle}>
            {labels[quality].map((label: string) => {
              const backgroundColor = LABEL_QUALITY_COLORS[quality];
              const textColor = quality === 'good' || quality === 'fair' ? 'black' : 'white';
              return (
                <span
                  key={label}
                  style={{
                    ...baseLabelItemStyle,
                    backgroundColor,
                    color: textColor,
                  }}
                >
                  <span>{label}</span>
                  <button
                    style={removeButtonStyle}
                    onClick={() => handleRemoveLabel(quality, label)}
                  >
                    &#x2716;
                  </button>
                </span>
              );
            })}
          </div>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              style={inputStyle}
              value={newLabels[quality]}
              onChange={(e) => handleInputChange(quality, e.target.value)}
              placeholder="Add new label"
            />
            <button style={addButtonStyle} onClick={() => handleAddLabel(quality)}>
              Add
            </button>
          </div>
        </div>
      ))}
      <button style={saveButtonStyle} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
