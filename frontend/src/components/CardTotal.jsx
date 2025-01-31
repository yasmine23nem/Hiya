import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export const CardTotal = () => {
  const { getCartAmount } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartAmount = async () => {
      const amount = await getCartAmount();
      setTotalAmount(amount);
    };

    fetchCartAmount();
  }, [getCartAmount]);

  return (
    <div className="card-total">
      <h3>Total du Panier :</h3>
      <p className="total-price">💰 {totalAmount.toFixed(2)} €</p>
    </div>
  );
};
