import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingPage() {

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: 100 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
