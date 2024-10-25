"use client";
import FetchVehicles from "@/components/modules/FetchVehicles";
import FormButton from "@/components/modules/FormButton";
import CustomNeshanMap from "@/components/template/CustomMap";
import { UseAppContext } from "@/context/page";
import ShowErrors from "@/utils/ShowErrors";
import { LocationOn } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useMemo, useCallback } from "react";

interface LatlngInterface {
  lat: number;
  lng: number;
}

const MapPage = () => {
  const router = useRouter();
  const { tokenState, vehicleIdState, setVehicleIdState } = UseAppContext();

  if (tokenState == 0 || tokenState.length < 2) router.push("/");

  const url = process.env.NEXT_PUBLIC_URL;
  const [activeBtn, setActiveBtn] = useState<boolean>(true);
  const [startPlace, setStartPlace] = useState<LatlngInterface | null>(null);
  const [destPlace, setDestPlace] = useState<LatlngInterface | null>(null);
  const [openSuccessAlert, setopenSuccessAlert] = useState<boolean>(false);

  // usecallback
  const handleRequest = useCallback(async () => {
    const response = await axios.post(`${url}/webapi/Request/SendRequest`, {
      userToken: tokenState,
      vehicleUserTypeId: `${vehicleIdState}`,
      source: `${startPlace?.lat},${startPlace?.lng}`,
      destination: `${destPlace?.lat},${destPlace?.lng}`,
    });

    if (response.data.status !== 1) {
      throw new Error(response.data.message || "عملیات ناموفق !!!");
    }

    setVehicleIdState(0);
    setStartPlace(null);
    setDestPlace(null);
    setopenSuccessAlert(true);

    return response.data;
  }, [tokenState, vehicleIdState, startPlace, destPlace, setVehicleIdState]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["confirmRequest"],
    queryFn: handleRequest,
    enabled: false,
  });

  const submitRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (startPlace?.lat == undefined || destPlace?.lng == undefined || vehicleIdState == 0) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [startPlace, destPlace, vehicleIdState]);

  useEffect(() => {
    if (openSuccessAlert) {
      const timer = setTimeout(() => {
        setopenSuccessAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [openSuccessAlert]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 mt-5">
      <div>
        <CustomNeshanMap setStartPlace={setStartPlace} setDestPlace={setDestPlace} />
      </div>
      <form
        onSubmit={submitRequest}
        className="w-[26rem] h-[13rem] border shadow-xl rounded-xl flex flex-col justify-center items-center gap-2 bg-slate-100"
      >
        <h5 className="w-full text-blue-600 p-1 text-center">
          <LocationOn />
          مبدا: <span className="text-sm mx-1"> {startPlace?.lat} </span>{" "}
          <span className="text-sm mx-1"> {startPlace?.lng} </span>{" "}
        </h5>
        <h5 className="w-full text-rose-600 p-1 text-center">
          <LocationOn />
          مقصد: <span className="text-sm mx-1"> {destPlace?.lat} </span>{" "}
          <span className="text-sm mx-1"> {destPlace?.lng} </span>{" "}
        </h5>
        <FetchVehicles />
        <FormButton Text="ثبت درخواست" activeBtn={activeBtn} isLoading={isLoading} />
      </form>
      {error && (
        <div>
          <ShowErrors error={error} />
        </div>
      )}
      <Snackbar
        open={openSuccessAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => setopenSuccessAlert(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          <span className="mx-1"> شماره درخواست : </span>
          <span className="mx-2">{data?.data?.requestNo}</span>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MapPage;
