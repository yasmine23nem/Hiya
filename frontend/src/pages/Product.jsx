import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { RelatedProducts } from "../components/RelatedProducts";

export const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      // Réinitialiser la taille sélectionnée lors du changement de produit
      setSelectedSize("");
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0">No product found</div>;

  const handleAddToCart = () => {
    if (productData.sizes && productData.sizes.length > 0 && !selectedSize) {
      alert("Veuillez sélectionner une taille");
      return;
    }
    addToCart(productData._id, 1, selectedSize);
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 md:px-10">
      <div className="flex flex-col md:flex-row gap-10">
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

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{productData.name}</h1>
          <p className="text-2xl font-semibold text-gray-800">
            {productData.price}DA
          </p>
          <p className="text-gray-600">{productData.description}</p>

          {/* Affichage des tailles si elles existent */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">
                Tailles disponibles
              </h3>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${
                        selectedSize === size
                          ? "bg-rose-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="bg-rose-600 text-white px-6 py-3 text-sm rounded-md shadow-md hover:bg-gray-800 transition-all"
          >
            Ajouter au panier
          </button>

          <hr className="mt-6" />
          <p className="text-sm text-gray-500">Produit original</p>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex border-b">
          <button className="border px-5 py-3 text-sm font-semibold">
            Description
          </button>
          <button className="border px-5 py-3 text-sm">Commentaires</button>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} />
    </div>
  );
};

export default Product;
