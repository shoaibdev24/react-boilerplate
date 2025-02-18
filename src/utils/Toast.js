import { toast } from 'react-toastify';

// Exported function to show toasts
export const showToast = (type, message) => {
    // Dismiss any existing toasts before showing the new one
    toast.dismiss();

    switch (type) {
        case 'info':
            return toast.info(message);
        case 'success':
            toast.success(message);
            break;
        case 'warning':
            toast.warn(message);
            break;
        case 'error':
            return toast.error(message);
        default:
            toast(message); // Default for untyped messages
    }
};
