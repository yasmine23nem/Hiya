import React from "react";
import { motion } from "framer-motion";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo7 from "../assets/photo7.jpg";
import i1 from "../assets/i1.jpg";
import i2 from "../assets/i2.jpg";
import i3 from "../assets/i3.jpg";
import d from "../assets/d.jpg";
import rr from "../assets/rr.jpg";
import boucle from "../assets/boucle.jpg";
import bra from "../assets/bra.jpg";
import collier from "../assets/collier.jpg";
import val from "../assets/val.jpg";

const categories = [
  { img: bra, label: "BRACELETS" },
  { img: rr, label: "BAGUES" },
  { img: boucle, label: "BOUCLES D'OREILLES" },
  { img: collier, label: "COLLIERS" },
  { img: val, label: "NOUVEAUTÉS" },
];

const SectionCategorie = () => {
  return (
    <motion.div
      className="flex overflow-x-auto py-10 space-x-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {categories.map((item, index) => (
        <motion.div
          key={index}
          className="text-center flex-shrink-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.img
            src={item.img}
            alt={item.label}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
          <motion.p
            className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            {item.label}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionCategorie;
