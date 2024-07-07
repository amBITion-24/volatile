import { pubKeyData, passIdContext } from "App";
import React, { useContext, useEffect, useState } from "react";
import { createPass } from "components/Soroban/Soroban";

const CreatePass = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const pubKey = useContext(pubKeyData);
  const { passId, _setPassId } = useContext(passIdContext);

  const handleCreatePass = async () => {
    const tempPassId = await createPass(pubKey, title, description).then(
      (value) => value
    );
    console.log("templPassId: ", tempPassId);
    _setPassId(tempPassId);
    console.log("passId: ", passId);
  };


  useEffect(() => {
    setLocalStorageKey(passId);
  }, [passId]);


  function setLocalStorageKey(key) {
    
    if (
      typeof key === "number" &&
      key > 0 &&
      key !== null &&
      key !== undefined
    ) {
    
      const keyString = key.toString();
      
      localStorage.setItem(keyString, JSON.stringify(false));
      console.log(`Key "${keyString}" added with default value false.`);
    } else {
      console.error("Invalid key. Please provide a positive number.");
    }
  }

  return (
    <div className="md:mr-[50px] md:ml-[50px] bg-white sm:w-[98%] rounded-lg p-10 border border-black">
    <div className="bg-black sm:text-2xl font-bold p-2 rounded-md flex items-center justify-center h-16">
      <p className="text-white">Manufacturer Wallet</p>
      </div>
      <div className="w-[90%] m-auto flex flex-col gap-5 items-center justify-center">
        <div className="sm:w-[70%] py-2 flex flex-col gap-3">
          <div className="md:flex items-center justify-between">
            <p className="w-48 text-xl mx-2">Your Address: </p>
            <input
              type="text"
              className="md:w-full p-2 rounded-md bg-gray-200 text-gray-500"
              placeholder={pubKey}
              value={pubKey}
              readOnly
            />
          </div>
          <div className="md:flex items-center justify-between">
            <p className="w-48 text-xl mx-2">Product SN: </p>
            <input
              type="text"
              className="md:w-full  p-2 rounded-md"
              placeholder="Enter Title Here"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="md:flex items-center justify-between">
            <p className="w-48 text-xl mx-2">Product Name: </p>
            <input
              type="text"
              className="md:w-full p-2 rounded-md"
              placeholder="Enter Description Here"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          className="p-2 rounded-md text-white bg-green-600 hover:bg-green-800"
          onClick={handleCreatePass}
        >
          Add Product
        </button>
      </div>
      <div className="text-center text-wrap max-w-full pt-4">
        <p className="text-red-500 text-xl">
          {/* Note :- If your Wallet doesn't popup? You might have a pending pass. */}
        </p>
      </div>
    </div>
  );
};

export default CreatePass;
