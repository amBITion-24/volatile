import React from "react";
import ApprovePass from "./ApprovePass";
import CheckAllPassStatus from "./CheckAllPassStatus";

const Consumer = () => {
  return (
<<<<<<< HEAD
    <div className="bg-white my-10 rounded-md p-4 flex flex-col items-center lg:w-[90vw] m-auto">
      <div className="w-full text-4xl font-semibold text-center text-black py-4 mb-5 rounded-lg bg-white border border-black">
        Admin
=======
    <div className="bg-blue-400 my-10 rounded-md p-4 flex flex-col items-center lg:w-[90vw] m-auto">
      <div className="w-full text-4xl font-semibold text-center text-white py-4 mb-5 rounded-lg bg-gray-700">
        Consumer
>>>>>>> 84eb2e4236a5e3401b747bf5a9c8b53c6690a40d
      </div>

      <div className="flex gap-10 max-xl:flex-col justify-between w-full items-center">
        <CheckAllPassStatus />
        <ApprovePass />
      </div>
    </div>
  );
};

export default Consumer;
