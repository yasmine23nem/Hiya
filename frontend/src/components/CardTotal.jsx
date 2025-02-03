import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export const CardTotal = () => {
  const { getCartAmount, getCartCount, cartItems, products } =
    useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCart = async () => {
      try {
        const amount = await getCartAmount();
        const count = getCartCount();
        setTotalAmount(amount);
        setItemCount(count);
      } catch (error) {
        console.error("Erreur de mise à jour du panier:", error);
      }
    };

    updateCart();
  }, [cartItems, products]); // Mise à jour quand le panier ou les produits changent

  return (
    <div className="card-total">
      <div className="cart-summary">
        <h3>Résumé du Panier</h3>
        <div className="cart-details">
          <p className="item-count">🛍️ Articles : {itemCount}</p>
          <p className="total-price">💰 Total : {totalAmount.toFixed(2)} €</p>
          {/* Ajout d'un bouton de débogage si nécessaire */}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={() =>
                console.log("Cart Debug:", { cartItems, products })
              }
            >
              Debug Cart
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .card-total {
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          margin: 20px 0;
        }

        .cart-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .total-price {
          font-size: 1.2em;
          font-weight: bold;
          color: #2c3e50;
        }
      `}</style>
    </div>
  );
};
