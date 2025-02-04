import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Switch } from "@headlessui/react";
import { MdDelete, MdEdit, MdCheck, MdClose } from "react-icons/md";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      setList(response.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (productId, currentStatus) => {
    setUpdating(productId);
    try {
      await axios.patch(
        `${backendUrl}/api/product/${productId}/toggle-active`,
        { active: !currentStatus },
        { headers: { token } }
      );

      setList(
        list.map((item) =>
          item._id === productId ? { ...item, active: !currentStatus } : item
        )
      );
      toast.success("Statut mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/api/product/${selectedProduct._id}`, {
        headers: { token },
      });
      setList(list.filter((item) => item._id !== selectedProduct._id));
      toast.success("Produit supprimé");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des produits</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-4 bg-gray-50 font-medium">
          <div>Image</div>
          <div>Nom</div>
          <div>Catégorie</div>
          <div>Prix</div>
          <div>Status</div>
          <div>Visibilité</div>
          <div>Actions</div>
        </div>

        {list.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-4 border-t items-center"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="font-medium">{product.name}</div>
            <div>{product.category}</div>
            <div>{product.price}€</div>
            <div>
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
            <div className="flex justify-center">
              <Switch
                checked={product.active}
                onChange={() => toggleActive(product._id, product.active)}
                disabled={updating === product._id}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full 
                  transition-colors focus:outline-none
                  ${product.active ? "bg-green-600" : "bg-red-600"}
                  ${
                    updating === product._id
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full 
                    bg-white shadow-lg transition-transform duration-200
                    ${product.active ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </Switch>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleDelete(product)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <MdDelete size={20} />
              </button>
              <button
                onClick={() => navigate(`/edit/${product._id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <MdEdit size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">
              Confirmer la suppression
            </h3>
            <p>Êtes-vous sûr de vouloir supprimer {selectedProduct?.name} ?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
