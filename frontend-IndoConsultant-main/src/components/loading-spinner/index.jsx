/* eslint-disable no-unused-vars */
import React from "react";
import { RingLoader } from "react-spinners";
const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen bg-white justify-center items-center">
      <RingLoader size={100} color="#2F4F75" />
    </div>
  );
};

export default LoadingSpinner;
