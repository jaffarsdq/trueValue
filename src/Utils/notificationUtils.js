import { showNotification } from "../Redux/Slices/notificationSlice";



export const handleApiResponse = async (dispatch, apiCall, data) => {
    let errorMessage;
    try {
        const res = await dispatch(apiCall(data));
        // console.log(res.error.message, "Notifications");
        // const { status, message, Message, Status, STATUS, MESSAGE } = res.payload; // Adjust as needed
        // // errorMessage = res.error.message;
        // errorMessage = 1;

        // console.log(errorMessage, "Notificationsc sleva");

        // const isSuccess = (STATUS || status && status.toLowerCase() === 'success') || (Status && Status.toUpperCase() === 'SUCCESS') || (STATUS && STATUS.toLowerCase() === true);
        // const notificationMessage = (message || Message || MESSAGE || 'Data saved successfully');

        // dispatch(showNotification({
        //     severity: isSuccess ? 'success' : 'error',
        //     message: notificationMessage
        // }));

        // return res;


        if (res.error) {
            console.log(res, "Notifications"); // Log error message if present

            // Dispatch an error notification
            dispatch(showNotification({
                severity: 'error',
                message: res.error.message || 'An unexpected error occurred.'
            }));

            // Throw the error to handle it further if needed
            // throw new Error(res.error.message || 'An unexpected error occurred.');
        }
        else {
            // Handle success scenario
            const { status, message, Message, Status, STATUS, MESSAGE } = res.payload;
            const isSuccess = (STATUS || Status || status && status.toLowerCase() === 'success') ||
                (Status && Status.toUpperCase() === 'SUCCESS') ||
                (STATUS && STATUS.toLowerCase() === true) 
            const notificationMessage = message || Message || MESSAGE || 'Data saved successfully';

            // Dispatch success notification
            dispatch(showNotification({
                severity: isSuccess ? 'success' : 'error',
                message: notificationMessage
            }));

            return res; // Return the response if needed further downstream
        }

    } catch (error) {
        console.log(error.response?.data?.message, "Notificationsc anbu");
        dispatch(showNotification({
            severity: 'error',
            message: error.response?.data?.message || 'An unexpected error occurred.'
        }));

        throw error;
    }

};