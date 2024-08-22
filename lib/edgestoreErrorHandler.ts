import {
    EdgeStoreApiClientError,
    UploadAbortedError,
} from '@edgestore/react/errors';

export const EdgestoreErrorHandler = (error: any | Error) => {
    let message = ""
    // All errors are typed, and you will get intellisense for them
    if (error instanceof EdgeStoreApiClientError) {
        // if it fails due to the `maxSize` set in the router config
        if (error.data.code === 'FILE_TOO_LARGE') {
            // alert(
            //     `File too large. Max size is ${formatFileSize(
            //         error.data.details.maxFileSize,
            //     )}`,
            // );
            message = `File too large. Max size is ${(error.data.details.maxFileSize).toString()}`
        }
        // if it fails due to the `accept` set in the router config
        if (error.data.code === 'MIME_TYPE_NOT_ALLOWED') {
            // alert(
            //     `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
            //         ', ',
            //     )}`,
            // );
            message = `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
                ', ',
            )}`
        }
        // if it fails during the `beforeUpload` check
        if (error.data.code === 'UPLOAD_NOT_ALLOWED') {
            // alert("You don't have permission to upload files here.");
            message = "You don't have permission to upload files here."
        }
    } else if (error instanceof UploadAbortedError) {
        // if the upload was canceled from an AbortController's signal
        console.log('Upload aborted');
        message = 'Upload aborted'
    } else {
        // unknown error
        console.error("unknown error ",error);
        message = 'something went wrong'
    }
    return message
}
