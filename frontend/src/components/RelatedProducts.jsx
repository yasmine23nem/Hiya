import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { Title } from "../components/Title";
import { ProductItem } from "../components/ProductItem";

export const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      setRelated(productsCopy);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Produits"} text2={"Similaires"}></Title>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid:cols-4 gap-4 gap-y-6 ">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image[1]}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
