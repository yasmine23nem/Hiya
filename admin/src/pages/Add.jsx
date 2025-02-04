import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Bracelet",
    price: "",
    bestseller: false,
  });
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append images
      Object.entries(images).forEach(([key, file]) => {
        if (file) submitData.append(key, file);
      });

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      submitData.append("countInStock", 10);

      const response = await axios.post(
        `${backendUrl}/api/product/create`,
        submitData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data) {
        toast.success("Produit ajouté avec succès");
        // Reset form
        setFormData({
          name: "",
          description: "",
          category: "Bracelet",
          price: "",
          bestseller: false,
        });
        setImages({
          image1: null,
          image2: null,
          image3: null,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau produit</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Images Upload */}
        <div className="grid grid-cols-3 gap-4">
          {["image1", "image2", "image3"].map((key) => (
            <div key={key} className="relative">
              <label
                htmlFor={key}
                className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2"
              >
                {images[key] ? (
                  <img
                    src={URL.createObjectURL(images[key])}
                    alt={`Preview ${key}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="h-32 flex items-center justify-center bg-gray-50">
                    <span className="text-gray-500">+ Ajouter image</span>
                  </div>
                )}
                <input
                  type="file"
                  id={key}
                  onChange={(e) => handleImageChange(e, key)}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          ))}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom du produit
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Boucle d'oreilles">Boucle d'oreilles</option>
                <option value="Bague">Bague</option>
                <option value="Bracelet">Bracelet</option>
                <option value="Collier">Collier</option>
                <option value="Sac">Sac</option>
                <option value="Parure">Parure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prix
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2 text-sm text-gray-700">
              Meilleure vente
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Ajout en cours..." : "Ajouter ce produit"}
        </button>
      </form>
    </div>
  );
};

export default Add;
