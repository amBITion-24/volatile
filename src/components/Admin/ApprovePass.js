import React, { useState } from "react";
import PendingPass from "./PendingPass";

const ApprovePass = () => {
  const [allPassesListLength, _setAllPassesListLength] = useState(
    localStorage.length
  );

  const handleRefresh = () => {
    _setAllPassesListLength(localStorage.length);
  };

  return (
    <div className="flex flex-col bg-white rounded-lg my-4 items-center border border-black p-4 w-full">
      <div className="bg-black w-full p-2 rounded-md sm:text-2xl font-bold text-center flex justify-between gap-3 items-center text-white">
        <span>List of Product Scanned :</span>
        <button
          className="text-lg hover:bg-violet-500 bg-pink-700 rounded-md p-1 border-black font-bold text-white"
          onClick={handleRefresh}
        >
          Clear
        </button>
      </div>
      <div className="w-full">
        <table className="flex flex-col gap-3">
          <thead className="border-b-2 border-blue-700">
            <tr className="text-center flex gap-4 justify-between">
              <th className="text-center">Pending Products</th>
              <th className="text-center">Approve</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-3 h-80 overflow-scroll">
            {Array.from({ length: allPassesListLength }, (_, i) => (
              <PendingPass key={i} pendingPassId={i + 1} pendingPassIndex={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovePass;
