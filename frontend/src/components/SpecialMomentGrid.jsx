import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import vid5 from "../assets/vid5.mp4";
import vid6 from "../assets/vid6.mp4";
import vid7 from "../assets/vid7.mp4";
import vid1 from "../assets/vid1.mp4";
import vid2 from "../assets/vid2.mp4";

const products = [
  {
    image: vid1,
    type: "video",
  },
  {
    image: vid2,
    type: "video",
  },
  {
    image: vid7,
    type: "video",
  },
];

const SpecialMomentGrid = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <div className="md:col-span-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Pour des
            <br /> moments spéciaux
          </h1>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {products.map((product, index) => (
            <GridItem key={index} product={product} />
          ))}
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
          className="w-full h-48 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          src={product.image}
          autoPlay
          loop
          muted
          className="w-full h-48 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </motion.div>
  );
};

export default SpecialMomentGrid;
