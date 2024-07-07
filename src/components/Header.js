import React, { useEffect, useState } from "react";
import { checkConnection, retrievePublicKey } from "./Freighter";
import StellarLogo from "../assets/stellarlogo.png"

const Header = ({setPubKey}) => {
  const [connect, getConnected] = useState("Connect");
  const [publickey, getPublicKey] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => setOpen(!open);

  useEffect(() => {
    if (publickey !== "") {
      getConnected("Connected!");
      setPubKey(publickey);
    }
  }, [publickey]);
  
  const connectWallet = async () => {
    if (await checkConnection()) {
      getPublicKey(await retrievePublicKey());
    }
  };

  return (
    <div className="bg-black flex md:flex-row shadow-md justify-between items-center px-10 py-4">
      <div
        className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-white flex items-center gap-5"
      >
        <span className="text-white">Product Authenticator</span>
      </div>

      <div
        onClick={() => handleOpenMenu()}
        className="text-4xl absolute top-4 right-3 md:hidden cursor-pointer text-white"
      >
        <ion-icon name={open ? "close" : "menu"}></ion-icon>
      </div>

      <div>
        <ul
          className={`${
            open ? "top-20 left-0" : "top-[-496px]"
          } flex flex-col md:flex-row md:justify-around items-center text-nowrap md:pb-0 py-3 absolute md:static bg-black md:bg-transparent gap-5 w-full md:w-auto pl-3 md:border-none border-2 border-white rounded-b-2xl transition-all duration-500 ease-in-out z-10`}
        >
          <li>
            <div className="p-1 bg-white border-2 max-w-max rounded-md">
              <span className="p-1 px-2 bg-black text-white h-full rounded-md">
                Address
              </span>
              <span className="px-2 text-black">
                {`${publickey.substring(0, 4)} ${
                  publickey && "..."
                } ${publickey.substring(publickey.length - 4)}`}
              </span>
            </div>
          </li>
          <li>
            <button
              className="text-xl w-52 hover:bg-gray-800 bg-white rounded-md p-4 font-bold text-black border-4 border-white"
              onClick={connectWallet}
            >
              {connect}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;