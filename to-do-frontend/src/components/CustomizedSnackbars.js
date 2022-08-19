import * as React from 'react';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const { alert, setAlert } = props;
  // const { alert, setAlert, open, msg, setOpen, severity } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
      message: '',
      severity: '',
      show: false,
    })
    // setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alert.show}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Stack >
  );
}
