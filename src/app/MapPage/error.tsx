"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl">مشکلی رخ داده !!!</h2>
      <button
        className="w-60 rounded-2xl bg-yellow-500 p-1 hover:bg-yellow-400 transition-all duration-150 mt-6"
        onClick={() => reset()}
      >
        تلاش مجدد
      </button>
    </div>
  );
}
