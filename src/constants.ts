// src/constants.ts
export const PANEL_STATE_STORAGE_KEY = 'dhp_panel_state';
export const SELECTIONS_STORAGE_KEY = 'dhp_selections';
export const CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY = 'dhp_custom_highlighted_labels';
export const TOKEN_STORAGE_KEY = 'dhp_api_token';
export const SCRIPT_VERSION = '6.21';

// Persisted query hash for the SINGLE item note edit, captured from user's network traffic
export const EDIT_ITEM_NOTE_HASH =
  '759194518a1e8634735edc1b68d5c511b467fd1901249a7ac7d2d8387f7899db';

export const COLLECTION_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" alt="Collection"><title>Collection</title><path d="M19.5846 20.5964C18.8055 20.5964 18.1719 19.9628 18.1719 19.1837V4.41267C18.1719 3.63359 18.8055 3 19.5846 3C20.3636 3 20.9972 3.63359 20.9972 4.41267V19.1837C20.9972 19.9628 20.3636 20.5964 19.5846 20.5964Z" fill="#FEFEFE"></path><path d="M15.858 20.5964C15.0789 20.5964 14.4453 19.9628 14.4453 19.1837V4.41267C14.4453 3.63359 15.0789 3 15.858 3C16.6371 3 17.2707 3.63359 17.2707 4.41267V19.1837C17.2707 19.9628 16.6371 20.5964 15.858 20.5964Z" fill="#FEFEFE"></path><path d="M12.1236 20.5964C11.3445 20.5964 10.7109 19.9628 10.7109 19.1837V4.41267C10.7109 3.63359 11.3445 3 12.1236 3C12.9027 3 13.5363 3.63359 13.5363 4.41267V19.1837C13.5363 19.9628 12.9027 20.5964 12.1236 20.5964Z" fill="#FEFEFE"></path><path d="M3.41022 20.1624C3.25167 20.1624 3.09016 20.1369 2.93517 20.0799C2.20063 19.8168 1.82059 19.0092 2.08305 18.2747L7.06454 4.36827C7.3276 3.63373 8.13518 3.25369 8.86973 3.51616C9.60427 3.77862 9.98431 4.5868 9.72185 5.32134L4.74036 19.2278C4.53134 19.8044 3.98978 20.1618 3.41022 20.1618V20.1624Z" fill="#FEFEFE"></path></svg>`;

// Types for highlighted labels
export type LabelQuality = 'poor' | 'fair' | 'good' | 'veryGood';

export type HighlightedLabels = {
  [key in LabelQuality]: string[];
};

export const DEFAULT_HIGHLIGHTED_LABELS: HighlightedLabels = {
  poor: [
    'Abkco',
    'Abraxas',
    'Akarma',
    'Back To Black',
    'DOL',
    'DOXY',
    'Fame',
    'Jazz Wax',
    'Music on Vinyl',
    'Simply Vinyl',
    'Skorpio',
    'Tapestry',
    'Vinyl Lovers',
    'Waxtime In Color',
    'WaxTime',
    'ZYX',
  ],
  fair: [
    'Bad Joker',
    'joe jackson recoords',
    'Lilith',
    'Get Back',
    'Hi Hat',
    'Sanctuary Records',
    'Vinyl Magic (VM - BTF)',
  ],

  good: [
    'Analogue Productions',
    'Cisco',
    'EMC',
    'Flightless',
    'Hubro',
    'Riverside Records',
    'Rune Grammofon',
    "Speaker's Corner",
  ],
  veryGood: [
    'ACT',
    'AKT',
    'Audio Fidelity',
    'Blue Note',
    'ECM',
    'ECM Records',
    'Impulse!',
    'Jazzaway',
    'Jazzland',
    'Mobile Fidelity',
    'Moserobie Music Production',
    'Seventh Records',
    'Soleil Zeuhl',
  ],
};

export const LABEL_QUALITY_COLORS: Record<LabelQuality, string> = {
  poor: '#8B0000', // Dark Red
  fair: '#FF6347', // Tomato/Light Red
  good: '#90EE90', // Light Green
  veryGood: '#228B22', // Forest Green/Dark Green
};
