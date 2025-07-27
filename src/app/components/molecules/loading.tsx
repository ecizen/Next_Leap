import { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";

const LoadingWithDelay = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <Mosaic
        color="#9333ea" // Tailwind purple-600
        size="large"
        text="Loading..."
        textColor="#6B7280" // Tailwind gray-500
      />
    </div>
  );
};

export default LoadingWithDelay;
