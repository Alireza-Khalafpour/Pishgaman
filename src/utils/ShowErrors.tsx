import { ReactNode, SyntheticEvent, useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ErrorComponentProps {
  error: Error | null;
}

export default function ShowErrors(error: ErrorComponentProps) {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

    if (!error) return null;

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.error?.message || null}
        </Alert>
      </Snackbar>
    </div>
  );
}
