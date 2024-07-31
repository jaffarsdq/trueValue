import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification, showNotification } from '../../Redux/Slices/notificationSlice';
 
 
const SnackbarNotification = () => {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { open, severity, message } = useSelector(state => state.notification);
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
 
  const handleClose = () => {
    dispatch(clearNotification());
  };
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      dispatch(showNotification({ severity: 'success', message: 'Internet connection restored' }));
    };
 
    const handleOffline = () => {
      setIsOnline(false);
      dispatch(showNotification({ severity: 'error', message: 'Internet connection lost' }));
    };
 
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
 
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch,location.pathname]);
  return (
    <Snackbar
      key={vertical + horizontal}
      anchorOrigin={{ vertical, horizontal }}
      open={open && Boolean(message)} // Only open if there's a non-empty message
      autoHideDuration={4000}
      onClose={handleClose}
    >
      {message && (
        <Alert
          onClose={handleClose}
          severity={severity || 'info'} // Default to 'info' if severity is not provided
          sx={{ width: '100%' }}
          variant="filled"
        >
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};
 
export default SnackbarNotification;