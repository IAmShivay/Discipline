// src/components/ErrorSnackbar.js
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearError } from "../redux/app/error/globalErrorSlice";
import { RootState } from "../store";
const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.error.message);

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      open={!!errorMessage}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
