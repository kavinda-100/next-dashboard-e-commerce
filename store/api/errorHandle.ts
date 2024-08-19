import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const handleRTKError = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (error) {
        // Check if it's a FetchBaseQueryError
        if ('status' in error) {
            const fetchError = error as FetchBaseQueryError;
            if (fetchError.status === 'FETCH_ERROR') {
                return 'Network error: Unable to reach the server.';
            } else if (fetchError.status === 'PARSING_ERROR') {
                return 'Parsing error: The server returned invalid JSON.';
            } else if (typeof fetchError.status === 'number') {
                // Handle standard HTTP errors
                return `${JSON.stringify(fetchError)}` || `Error: ${fetchError.status}`;
            }
        }

        // Check if it's a SerializedError
        if ('message' in error) {
            const serializedError = error as SerializedError;
            return serializedError.message || 'An unknown error occurred';
        }
    }
    return null;
};