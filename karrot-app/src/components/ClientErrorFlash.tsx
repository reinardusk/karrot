"use client";

import { useSearchParams } from "next/navigation";

const ClientErrorFlash = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <>
          <p className="animate-pulse text-red-700 text-xl p-2 bg-red-100 border border-red-700 mx-2 w-[300px]">
            {errorMessage}
          </p>
        </>
      )}
    </>
  );
};

export default ClientErrorFlash;
