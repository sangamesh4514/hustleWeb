import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const severity = ["success", "info", "warning", "error"];

const SnackbarAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = ({
  open,
  handleClose,
  message,
  type = 1,
  time = 4000,
  position = ["top", "left"],
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={time}
      onClose={handleClose}
      anchorOrigin={{ vertical: position[0], horizontal: position[1] }}
    >
      <SnackbarAlert
        onClose={handleClose}
        severity={severity[type]}
        sx={{ width: "100%" }}
      >
        {message}
      </SnackbarAlert>
    </Snackbar>
  );
};

export default Alert;
