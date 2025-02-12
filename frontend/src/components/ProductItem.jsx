import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export const ProductItem = ({ id, image, name, price, sizes }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden relative group">
        <img
          className="hover:scale-110 transition ease-in-out duration-300"
          src={image}
          alt=""
        />
        {sizes && sizes.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <div className="flex flex-wrap gap-1 justify-center">
                {sizes.map((size, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};
