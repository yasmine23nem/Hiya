import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import { useState } from "react";
import { ProductItem } from "../components/ProductItem";

export const LastestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lastestProducts, setLastestProducts] = useState([]);

  useEffect(() => {
    setLastestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Nouvel"} text2={"Arrivage"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tempora
          nam porro quam hic officiis! Officia ab exercitationem velit tenetur
          ab.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {lastestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id} // Changed from _id to id
            image={item.image[0]}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
