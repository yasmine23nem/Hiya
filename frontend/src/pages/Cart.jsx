import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { Title } from "../components/Title";
import { assets } from "../assets/assets";
import { CardTotal } from "../components/CardTotal";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Cart = () => {
  const { products, currency, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Get userId from token
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.id;

        // Fetch cart data
        const response = await axios.get(
          `${backendUrl}/api/cart/get/${userId}`,
          { headers: { token } }
        );

        const items = Object.entries(response.data).map(
          ([itemId, itemData]) => ({
            id: itemId,
            quantity: itemData.quantity,
          })
        );

        setCartData(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  if (loading) return <div className="pt-14 px-4">Loading...</div>;
  if (error) return <div className="pt-14 px-4">Error: {error}</div>;

  return (
    <div className="pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-6">
        <Title text1={"Votre"} text2={"Panier"} />
      </div>

      <div className="space-y-4">
        {cartData.map((item, index) => {
          const product = products.find((p) => p._id === item.id);
          if (!product) return null;

          return (
            <div
              key={index}
              className="p-4 border rounded-md shadow-md grid grid-cols-[3fr_1fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-white"
            >
              <div className="flex items-start gap-6">
                <img
                  src={product.image}
                  className="w-16 sm:w-20 rounded-md border"
                  alt={product.name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {currency}
                    {product.price}
                  </p>
                </div>
              </div>

              <input
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) {
                    updateQuantity(item.id, value);
                  }
                }}
                className="border w-16 sm:w-20 px-2 py-1 text-center rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none"
                type="number"
                value={item.quantity}
                min="1"
              />

              <button
                onClick={() => updateQuantity(item.id, 0)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <img src={assets.cross} className="w-5 h-5" alt="Supprimer" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-10">
        <div className="w-full sm:w-[450px] p-4 border rounded-md shadow-md bg-white">
          <CardTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-rose-600 hover:bg-rose-700 text-white text-sm my-8 px-8 py-3 rounded-md transition-transform transform hover:scale-105"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
