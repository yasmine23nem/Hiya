import React, { useContext, useEffect, useState } from "react";
import { Title } from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { text: "En attente", color: "yellow" },
      processing: { text: "En traitement", color: "blue" },
      shipped: { text: "Expédié", color: "purple" },
      delivered: { text: "Livré", color: "green" },
      cancelled: { text: "Annulé", color: "red" },
      "Order Placed": { text: "Commande passée", color: "blue" },
    };
    return statusMap[status] || { text: status, color: "gray" };
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.id;

        console.log("Fetching orders for user:", userId);
        console.log("API URL:", `${backendUrl}/api/order/userorders/${userId}`);

        const response = await axios.get(
          `${backendUrl}/api/order/userorders/${userId}`,
          {
            headers: {
              token,
            },
          }
        );

        console.log("Orders response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response.data?.orders) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Erreur détaillée:", error.response || error);
        toast.error(
          error.response?.data?.message ||
            "Erreur lors du chargement des commandes"
        );
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserOrders();
    }
  }, [token, backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 px-4 sm:px-8">
      <div className="text-2xl mb-6">
        <Title text1={"Vos"} text2={"commandes"} />
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Vous n'avez pas encore de commandes
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="p-6 border rounded-lg shadow-md bg-white"
            >
              {/* En-tête de la commande */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Commande #{order._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Passée le {formatDate(order.date || order.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  {/* Statut */}
                  <div
                    className={`w-3 h-3 rounded-full bg-${
                      getStatusInfo(order.status).color
                    }-500`}
                  />
                  <span className="text-sm font-medium">
                    {getStatusInfo(order.status).text}
                  </span>
                </div>
              </div>

              {/* Détails des articles */}
              <div className="mt-4 space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantité: {item.quantity}{" "}
                          {item.size && `| Taille: ${item.size}`}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Informations de livraison et total */}
              <div className="mt-6 flex flex-col md:flex-row justify-between">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Adresse de livraison</h4>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.zipcode}
                  </p>
                  <p>{order.address.country}</p>
                </div>

                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-sm text-gray-500">Total de la commande</p>
                  <p className="text-xl font-bold">
                    {currency}
                    {Number(order.amount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() =>
                    toast.info(`Suivi de la commande #${order._id.slice(-6)}`)
                  }
                  className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded hover:bg-rose-700 transition-colors"
                >
                  Suivre la commande
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
