"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "@/utils/LoadingPage";
import ShowErrors from "@/utils/ShowErrors";
import FormButton from "../modules/FormButton";
import { UseAppContext } from "@/context/page";

const LoginPage = () => {
  const { tokenState, setTokenState } = UseAppContext();
  const router = useRouter();

  if (tokenState != 0) router.push("/MapPage");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const url = process.env.NEXT_PUBLIC_URL;

  async function handleLogin() {
    const response = await axios.post(`${url}/webapi/Account/Login`, {
      username: username,
      password: password,
    });

    if (response.data.status !== 1) {
      throw new Error(response.data.message || "عملیات ناموفق !!!");
    }

    setTokenState(response.data.data?.userToken);
    setTimeout(() => {
      router.push("/MapPage");
    }, 1000);

    return response.data;
  }
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["Login"],
    queryFn: handleLogin,
    enabled: false,
  });

  const onSubmitFn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };


  return (
    <>
      <div className="bg-white p-8 shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-4 font-semibold ">
        <h3 className="text-lg">ورود</h3>
        <form
          onSubmit={(e) => onSubmitFn(e)}
          className="flex flex-col justify-center items-center p-4"
        >
          <label
            htmlFor="username"
            className="w-full text-right text-slate-700 !text-sm font-normal"
          >
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="focus:bg-blue-100 w-60 border border-black rounded-2xl p-1"
          />
          <label className="w-full text-right text-slate-700 !text-sm font-normal mt-6">
            رمز عبور
          </label>
          <input
            id="password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            className="focus:bg-blue-100 w-60 border border-black rounded-2xl p-1"
          />
          <FormButton Text="ورود" activeBtn={true} isLoading={isLoading} />
        </form>
        {isLoading && (
          <div>
            <LoadingPage />
          </div>
        )}
        {error && (
          <div>
            <ShowErrors error={error} />
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
