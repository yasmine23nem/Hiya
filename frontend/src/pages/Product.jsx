import React from "react";
import { use } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import { RelatedProducts } from "../components/RelatedProducts";

export const Product = () => {
  const { productId } = useParams();

  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex:row">
        {/* image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex:row">
          <div className="flex sm:flex-col overflow-autp sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt="product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          {/* product image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="product" className="w-full" />
          </div>
          {/* product details */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src="" alt="" className="w-3 5" />
              <img src="" alt="" className="w-3 5" />
              <img src="" alt="" className="w-3 5" />
              <img src="" alt="" className="w-3 5" />
              <img src="" alt="" className="w-3 5" />
              <p className="pl-2"> </p>
            </div>
            <p className="text-2xl font-semibold mt-5">
              {productData.currency} {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            {/* Sélection de quantité */}
            <div className="flex flex-col gap-4 my-8">
              <label htmlFor="quantity" className="font-medium">
                Sélectionner la quantité :
              </label>
              <input
                type="number"
                id="quantity"
                className="border px-4 py-2 w-20"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <button
              onClick={() => addToCart(productData._id, quantity)}
              className="bg-black text-white px-8 py-3  text-sm active:bg-pink-700"
            >
              Ajouter au panier
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>Produit original</p>
            </div>
          </div>
        </div>
      </div>
      {/* review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-6 text-sm">Description</b>
          <p className="border px-5 py-6 text-sm ">Commentaires</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            explicabo et laudantium quasi, unde nisi iste illum fugiat, error
            blanditiis necessitatibus quia voluptatem modi dignissimos saepe
            minus. Obcaecati, officiis perferendis.
          </p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            consequatur! Inventore dolores facere quam dolorem sint aut
            cupiditate vel placeat omnis iste eius atque quod, autem sequi ut
            aspernatur quidem?
          </p>
        </div>
      </div>
      {/* related products */}
      <RelatedProducts category={productData.category}></RelatedProducts>
    </div>
  ) : (
    <div className="opacity-0">noooooo</div>
  );
};
