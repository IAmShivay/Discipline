import snackbarMessages from "./message";

type SnackbarType = 'success' | 'error' | 'info';

const showSnackbar = (type: SnackbarType, messageKey: string): string => {
    const message = snackbarMessages[type][messageKey];

    if (message) {
        return message;
    }
    return "Message not found.";
};

export default showSnackbar;
