import React from "react";
import { assets } from "../assets/assets";

export const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200">
      {/* left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h6[2px] bg-[#414F41] "></p>
          </div>
          <h1 className=" prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
            Nouvelle Collection
          </h1>
          <div className="flex item-center gap2">
            <p className="font-semibold text-sm md:text-base"></p>

          </div>
        </div>
      </div>
      {/* right */}
      <img src={assets.hero} alt="" className="w-full sm:w-1/2" />
    </div>
  );
};
