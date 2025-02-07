import React from "react";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.3 },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const Home = () => {
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SquareSlider />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerVariants}
      >
        <SectionCategorie />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
      >
        <SpecialMomentGrid />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <VideoBanner />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerVariants}
      >
        <LastestCollection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
      >
        <BestSeller />
      </motion.div>
    </div>
  );
};
