import React, { useContext, useState } from "react";
import { Title } from "../components/Title";
import { CardTotal } from "../components/CardTotal";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

export const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
    userId, // Ensure userId is retrieved from context
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir passer la commande ?"
    );

    if (!confirmation) {
      return; // Annule la commande si l'utilisateur clique sur "Non"
    }

    const totalAmount = await getCartAmount();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = products.find((product) => product._id === items);
          if (itemInfo) {
            orderItems.push({ ...itemInfo, quantity: cartItems[items] });
          }
        }
      }

      const orderData = {
        userId,
        address: formData,
        items: orderItems,
        amount: totalAmount,
        paymentMethod: method,
      };

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        { headers: { token } }
      );

      if (response.data) {
        setCartItems({});
        navigate("/orders");
        toast.success("Commande passée avec succès!");
      } else {
        toast.error(
          "Une erreur est survenue lors de la passation de la commande."
        );
      }
    } catch (error) {
      toast.error("Erreur lors de la passation de la commande.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"Information sur"} text2={"la commande"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Nom"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Prénom"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Rue"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Ville"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Numéro de téléphone"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Code postal"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Pays"
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CardTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Méthode de"} text2={" paiement"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-6 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-600 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
