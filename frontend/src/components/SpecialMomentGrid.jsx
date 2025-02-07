import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import vid7 from "../assets/vid7.mp4";
import vid2 from "../assets/vid2.mp4";
import vid8 from "../assets/vid8.mp4";
import bleu from "../assets/bleu.jpg";
import vid9 from "../assets/vid9.mp4";
import etoile from "../assets/etoile.jpg";

const products = [
  {
    image: vid8,
    type: "video",
  },
  {
    image: etoile,
    type: "image",
  },

  {
    image: bleu,
    type: "image",
  },
  {
    image: vid9,
    type: "video",
  },
];
const SpecialMomentGrid = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between gap-6 max-w-3xl mx-auto">
        <div className="w-1/4 flex items-center justify-center min-h-[300px]">
          <h1 className="text-xl sm:text-4xl font-bold text-gray-900 text-center">
            Pour des
            <br /> moments
            <br /> spéciaux
          </h1>
        </div>
        <div className="w-3/4 pl-8">
          <div className="grid grid-cols-2 gap-2 max-w-sm ml-auto">
            {products.map((product, index) => (
              <GridItem key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridItem = ({ product }) => {
  const imageControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      imageControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
      });
    } else {
      imageControls.start({ opacity: 0, scale: 0.75 });
    }
  }, [imageControls, inView]);

  return (
    <motion.div
      ref={ref}
      className="relative group overflow-hidden shadow-lg cursor-pointer"
      initial={{ opacity: 0, scale: 0.75 }}
      animate={imageControls}
    >
      {product.type === "image" ? (
        <img
          src={product.image}
          alt="Special moment"
          className="w-full h-32 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          src={product.image}
          autoPlay
          loop
          muted
          className="w-full h-32 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </motion.div>
  );
};
export default SpecialMomentGrid;
