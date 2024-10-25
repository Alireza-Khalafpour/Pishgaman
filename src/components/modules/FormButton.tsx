"use client";

import React from "react";

interface FormButtonProps {
  Text: string;
  activeBtn: boolean | null;
  isLoading: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ Text, activeBtn, isLoading }) => {
  return (
    <>
      <button
        type="submit"
        className={`w-60 rounded-2xl p-1 ${
          activeBtn ? "bg-yellow-500 hover:bg-yellow-400" : "bg-gray-300"
        }  transition-all duration-150 mt-6`}
        disabled={!activeBtn || isLoading}
      >
        {Text}
      </button>
    </>
  );
};

export default FormButton;
