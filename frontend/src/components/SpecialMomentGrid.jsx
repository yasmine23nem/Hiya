import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import vid3 from "../assets/vid3.mp4";
import i2 from "../assets/i2.jpg";
import l from "../assets/l.jpg";
import ka from "../assets/ka.jpg";
import val from "../assets/val.jpg";
import valo from "../assets/valo.png";

const products = [
  {
    image: ka,
    type: "image",
  },
  {
    image: vid3,
    type: "video",
  },
  {
    image: val,
    type: "image",
  },
  {
    image: l,
    type: "image",
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
