import React from "react";
import { Hero } from "../components/Hero";
import { LastestCollection } from "../components/LastestCollection";
import { BestSeller } from "../components/BestSeller";
import { OurPolicy } from "../components/OurPolicy";
import Slider from "../components/Slider";
import SquareSlider from "../components/SquareSlider";
export const Home = () => {
  return (
    <div>
      <SquareSlider></SquareSlider>
      <LastestCollection />
      <BestSeller />
    </div>
  );
};
