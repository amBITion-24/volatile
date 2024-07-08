import React from "react";
import ApprovePass from "./ApprovePass";
//made some changes
import CheckAllPassStatus from "./CheckAllPassStatus";

const Consumer = () => {
  return (
    <div className="bg-white my-10 rounded-md p-4 flex flex-col items-center lg:w-[90vw] m-auto">
      <div className="w-full text-4xl font-semibold text-center text-black py-4 mb-5 rounded-lg bg-white border border-black">
        Consumer
      </div>
      <div className="flex gap-10 max-xl:flex-col justify-between w-full items-center">
        <CheckAllPassStatus />
        <ApprovePass />
      </div>
    </div>
  );
};

export default Consumer;
