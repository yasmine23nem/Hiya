import React from "react";
import { assets } from "../assets/assets";

export const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white-500 text-white">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className="bg-pink-200 text-white px py-2 sm:px-7 rounded-full text-xs sm:text-sm">
        Déconnexion
      </button>
    </div>
  );
};
