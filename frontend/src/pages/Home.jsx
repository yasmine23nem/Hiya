import React from "react";
import { Hero } from "../components/Hero";
import { LastestCollection } from "../components/LastestCollection";
import { BestSeller } from "../components/BestSeller";
import { OurPolicy } from "../components/OurPolicy";
import Slider from "../components/Slider";
import SquareSlider from "../components/SquareSlider";
import SpecialMomentGrid from "../components/SpecialMomentGrid";
import SectionCategorie from "../components/SectionCategorie";
import VideoBanner from "../components/VideoBanner";
import CollaborationBanner from "../components/CollaborationBanner";
export const Home = () => {
  return (
    <div>
      <SquareSlider></SquareSlider>
      <SectionCategorie />
      <SpecialMomentGrid />
      <VideoBanner />
      <LastestCollection />
      <BestSeller />
    </div>
  );
};
