import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bra from "../assets/bra.jpg";
import rr from "../assets/rr.jpg";
import boucle from "../assets/boucle.jpg";
import collier from "../assets/collier.jpg";
import val from "../assets/val.jpg";
import sac from "../assets/sac.png";
import chem from "../assets/chem.png";

const categories = [
  { img: bra, label: "BRACELETS", category: "Bracelet en argent véritable" },
  { img: rr, label: "BAGUES", category: "Bague en argent véritable" },
  {
    img: boucle,
    label: "BOUCLES D'OREILLES",
    category: "Boucle d'oreilles en argent véritable",
  },
  { img: collier, label: "COLLIERS", category: "Collier en argent véritable" },
  { img: sac, label: "SACS", category: "Sac" },
  { img: chem, label: "VÊTEMENTS", category: "Vêtement" },
  { img: val, label: "NOUVEAUTÉS", category: "Nouveautés" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    rotate: 3,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    rotate: -3,
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const SectionCategorie = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category) {
      navigate("/collection", { state: { selectedCategory: category } });
    }
  };

  return (
    <motion.div
      // Change space-x-6 to space-x-12 for more spacing
      className="flex overflow-x-auto py-10 space-x-10 px-4 md:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {categories.map((item, index) => (
        <motion.div
          key={index}
          className="text-center flex-shrink-0 cursor-pointer relative group"
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleCategoryClick(item.category)}
        >
          <motion.div
            className="absolute inset-0 bg-rose-100 rounded-lg -z-10 opacity-0 group-hover:opacity-20 transition-opacity"
            initial={{ borderRadius: "16px" }}
            whileHover={{ scale: 1.1 }}
          />
          <motion.img
            src={item.img}
            alt={item.label}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg shadow-md"
            variants={imageVariants}
            whileHover="hover"
          />
          <motion.p
            className="mt-4 text-xs sm:text-sm font-semibold tracking-wide text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {item.label}
          </motion.p>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1 bg-rose-400 scale-x-0 group-hover:scale-x-100"
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionCategorie;
