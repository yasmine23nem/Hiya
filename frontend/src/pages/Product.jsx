import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { RelatedProducts } from "../components/RelatedProducts";

export const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0">No product found</div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 md:px-10">
      {/* Product Container */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <div className="flex md:w-1/2 flex-col md:flex-row gap-3">
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto md:w-1/5 gap-2">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt="product"
                className="w-16 md:w-full md:mb-2 cursor-pointer border rounded-md hover:border-gray-400"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full md:w-4/5">
            <img
              src={image}
              alt="product"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{productData.name}</h1>
          <p className="text-2xl font-semibold text-gray-800">
            {productData.currency} {productData.price}
          </p>
          <p className="text-gray-600">{productData.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="font-medium">
              Quantité:
            </label>
            <input
              type="number"
              id="quantity"
              className="border px-4 py-2 w-16 rounded-md"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, quantity)}
            className="bg-black text-white px-6 py-3 text-sm rounded-md shadow-md hover:bg-gray-800 transition-all"
          >
            Ajouter au panier
          </button>

          <hr className="mt-6" />
          <p className="text-sm text-gray-500">Produit original</p>
        </div>
      </div>

      {/* Description & Comments Section */}
      <div className="mt-20">
        <div className="flex border-b">
          <button className="border px-5 py-3 text-sm font-semibold">
            Description
          </button>
          <button className="border px-5 py-3 text-sm">Commentaires</button>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500">
          <p></p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  );
};
