import { CircularProgress } from "@mui/material";

export default function Loading() {

  return (
    <div className="w-full h-[100vh] flex justify-center items-center" >
      <p className="m-auto" > <CircularProgress /> </p>
    </div>
  );
}
