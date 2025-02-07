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
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.image.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Prix</h3>
                <p className="text-2xl font-bold">{product.price}€</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Catégorie</h3>
                <p>{product.category}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Stock</h3>
                <p>{product.countInStock} unités</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Status</h3>
                {product.active ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <MdCheck className="w-5 h-5" /> Actif
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1">
                    <MdClose className="w-5 h-5" /> Inactif
                  </span>
                )}
              </div>

              {product.bestseller && (
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">
                  Bestseller
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
