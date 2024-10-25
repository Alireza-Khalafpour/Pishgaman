import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { UseAppContext } from "@/context/page";

interface Vehicle {
  id: number | null;
  name: string | null;
}

export default function FetchVehicles() {
  const { tokenState, setVehicleIdState } = UseAppContext();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const token = tokenState;
  const url = process.env.NEXT_PUBLIC_URL;

  const fetchVehicles = async (searchQuery: string) => {
    if (searchQuery?.length >= 2 && token) {
      setLoading(true)
      try {
        const response = await axios.get(
          `${url}/webapi/Request/GetVehicleUsers?SearchTerm=${encodeURIComponent(
            searchQuery
          )}&UserToken=${token}`
        );
        if (response.data.status === 1) {
          setVehicles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    } else {
      setVehicles([]);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchVehicles(query);
  }, [query]);

  return (
    <>
      <Autocomplete
        className="rounded-2xl w-[80%]"
        size="small"
        disablePortal
        loading={loading}
        loadingText="در حال جستجو..."
        options={vehicles}
        getOptionLabel={(option) => option?.name}
        onInputChange={(e: any) => {
          setQuery(e.target.value);
        }}
        onChange={(event: any, newValue: any) => {
          if (newValue) {
            setVehicleIdState(newValue.id);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="نوع ماشین آلات" />
        )}
      />
    </>
  );
}
