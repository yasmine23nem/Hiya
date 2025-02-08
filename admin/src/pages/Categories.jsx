import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Categories = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", label: "" });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/categories`);
      setCategories(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des catégories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${backendUrl}/api/categories/${selectedCategory._id}`,
        {
          headers: { token },
        }
      );
      toast.success("Catégorie supprimée avec succès");
      fetchCategories();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/api/categories`, newCategory, {
        headers: { token },
      });
      toast.success("Catégorie ajoutée avec succès");
      setNewCategory({ name: "", label: "" });
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Catégories</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de la catégorie
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Label
            </label>
            <input
              type="text"
              value={newCategory.label}
              onChange={(e) =>
                setNewCategory({ ...newCategory, label: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-burgundy-700"
          >
            {loading ? "Ajout en cours..." : "Ajouter la catégorie"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Label
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">{category.label}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(category)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">
              Confirmer la suppression
            </h3>
            <p>
              Êtes-vous sûr de vouloir supprimer la catégorie "
              {selectedCategory?.label}" ?
              <br />
              <span className="text-red-600 text-sm">
                Cette action supprimera également tous les produits associés à
                cette catégorie.
              </span>
            </p>
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

export default Categories;
