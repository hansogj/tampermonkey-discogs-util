// Type for the response from the /oauth/identity endpoint
export interface IdentityResponse {
    username: string;
}

// Type for a single custom field object from Discogs
export interface CustomField {
    id: number;
    name: string;
    type: 'dropdown' | 'textarea';
    options?: string[];
    lines?: number;
    position?: number;
    public?: boolean;
}

// Type for the response from the /collection/fields endpoint
export interface FieldsResponse {
    fields: CustomField[];
}

// Type for the processed object containing dropdown options
export interface ApplyEditSelections {
    [fieldId: number]: string;
}

// Type for a consistent error object returned by API functions
export interface ErrorResponse {
    error: true;
    status: string | number;
    responseText: string;
}

// Type for the status messages in the UI
export type MessageType = 'success' | 'info' | 'error';
