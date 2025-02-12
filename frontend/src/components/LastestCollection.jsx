import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LastestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lastestProducts, setLastestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLastestProducts(products.slice(0, 10));
  }, [products]);

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Notre"} text2={"Collection"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {lastestProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col justify-between"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-full h-32 sm:h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-base">
                  {item.price} DA
                </p>
              </div>
              <button
                onClick={() => handleViewProduct(item._id)}
                className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition text-xs sm:text-sm"
              >
                Voir le produit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
