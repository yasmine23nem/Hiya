import React, { useContext } from "react";
import { Title } from "../components/Title";
import { ShopContext } from "../context/ShopContext";

export const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-8">
      {/* Titre */}
      <div className="text-2xl mb-6">
        <Title text1={"Vos"} text2={"commandes"} />
      </div>

      {/* Liste des commandes */}
      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            {/* Image et détails du produit */}
            <div className="flex items-start gap-4">
              <img
                className="w-20 h-20 rounded-md border"
                src={item.image}
                alt={item.name}
              />
              <div>
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-600">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantité: {item.quantity}</p>
                  <p>
                    Date :{" "}
                    <span className="text-gray-400">23 octobre 2003</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Statut et bouton */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Statut */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm md:text-base text-green-600 font-medium">
                  Prête
                </p>
              </div>

              {/* Bouton */}
              <button className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-transform transform hover:scale-105">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
