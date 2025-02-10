import React from "react";
import { MdClose, MdCheck } from "react-icons/md";

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              {product.bestseller && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Bestseller
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.image.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.image.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Price and Status Section */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Prix</h3>
                  <p className="text-3xl font-bold text-rose-600">
                    {product.price}DA
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Status
                  </h3>
                  {product.active ? (
                    <span className="text-green-600 flex items-center gap-1 justify-end">
                      <MdCheck className="w-5 h-5" /> Actif
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1 justify-end">
                      <MdClose className="w-5 h-5" /> Inactif
                    </span>
                  )}
                </div>
              </div>

              {/* Category and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Catégorie
                  </h3>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Stock</h3>
                  <p className="text-gray-600">{product.countInStock} unités</p>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Tailles disponibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                      >
                        {size}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">
                      Aucune taille spécifiée
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
