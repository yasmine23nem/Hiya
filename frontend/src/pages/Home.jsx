import React from "react";
import { Hero } from "../components/Hero";
import { LastestCollection } from "../components/LastestCollection";
import { BestSeller } from "../components/BestSeller";
import { OurPolicy } from "../components/OurPolicy";
import Slider from "../components/Slider";
export const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <LastestCollection />
      <BestSeller />
    </div>
  );
};
