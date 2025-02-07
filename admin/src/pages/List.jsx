import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Switch } from "@headlessui/react";
import { MdDelete, MdEdit, MdCheck, MdClose } from "react-icons/md";
import ProductDetail from "../components/ProductDetail";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const List = ({ token }) => {
  // State
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    countInStock: "",
    bestseller: false,
    existingImages: [],
    newImages: [],
  });

  // Categories
  const categories = [
    "Boucle d'oreilles",
    "Bague",
    "Collier",
    "Bracelet",
    "Sac",
  ];

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredList(list);
    } else {
      setFilteredList(
        list.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, list]);

  // API Functions
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/admin/list`, {
        headers: { token },
      });
      setList(response.data);
      setFilteredList(response.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      countInStock: product.countInStock,
      bestseller: product.bestseller,
      existingImages: product.image,
      newImages: [],
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(editFormData).forEach((key) => {
      if (!["existingImages", "newImages"].includes(key)) {
        formData.append(key, editFormData[key]);
      }
    });

    editFormData.newImages.forEach((file, index) => {
      formData.append(`image${index + 1}`, file);
    });

    if (editFormData.newImages.length === 0) {
      formData.append("keepExistingImages", "true");
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/product/${selectedProduct._id}`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setList(
        list.map((item) =>
          item._id === selectedProduct._id ? response.data : item
        )
      );
      toast.success("Produit mis à jour");
      setShowEditModal(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
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

  if (loading) return <div className="text-center py-10">Chargement...</div>;

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">
          Liste des produits ({filteredList.length} produits)
        </h2>

        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category} (
                {list.filter((product) => product.category === category).length}
                )
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Headers */}
        <div className="hidden md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-4 bg-gray-50 font-medium">
          <div>Image</div>
          <div>Nom</div>
          <div>Catégorie</div>
          <div>Prix</div>
          <div>Stock</div>
          <div>Status</div>
          <div>Visibilité</div>
          <div>Actions</div>
        </div>

        {/* Product List */}
        {filteredList.map((product) => (
          <div key={product._id} className="border-t">
            {/* Mobile View */}
            <div className="block md:hidden p-4">
              <div
                className="flex flex-col gap-4 cursor-pointer"
                onClick={() => setShowProductDetail(product)}
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-lg font-semibold mt-1">
                    {product.price}DA
                  </p>
                  <p className="text-gray-600 mt-1">
                    Stock: {product.countInStock}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
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
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Switch
                        checked={product.active}
                        onChange={() =>
                          toggleActive(product._id, product.active)
                        }
                        disabled={updating === product._id}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          product.active ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                            product.active ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </Switch>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-4 items-center">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded cursor-pointer"
                onClick={() => setShowProductDetail(product)}
              />
              <div
                className="font-medium cursor-pointer"
                onClick={() => setShowProductDetail(product)}
              >
                {product.name}
              </div>
              <div>{product.category}</div>
              <div>{product.price}DA</div>
              <div>{product.countInStock}</div>
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
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    product.active ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                      product.active ? "translate-x-6" : "translate-x-1"
                    }`}
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
                  onClick={() => handleEdit(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <MdEdit size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {showProductDetail && (
        <ProductDetail
          product={showProductDetail}
          onClose={() => setShowProductDetail(null)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Modifier le produit</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Nom*</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Prix*</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={editFormData.price}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        price: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Catégorie*</label>
                  <select
                    required
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        category: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Stock*</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editFormData.countInStock}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        countInStock: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description*</label>
                  <textarea
                    required
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                    rows="3"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Images actuelles</label>
                  <div className="flex gap-2 mb-4">
                    {editFormData.existingImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Current ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                  <label className="block mb-1">
                    Nouvelles images (optionnel)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        newImages: Array.from(e.target.files),
                      })
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editFormData.bestseller}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          bestseller: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    Bestseller
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
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
