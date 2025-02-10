import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    bestseller: false,
    countInStock: "",
    sizes: [], // Ajouter le champ sizes
  });
  // Ajouter la fonction de gestion des tailles
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`);
        setCategories(response.data);
        if (response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: response.data[0].name,
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Erreur lors du chargement des catégories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("L'image est trop volumineuse (maximum 10MB)");
        return;
      }

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setImages((prev) => ({
          ...prev,
          [key]: compressedFile,
        }));
      } catch (error) {
        console.error("Erreur de compression:", error);
        toast.error("Erreur lors de la compression de l'image");
      }
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
      if (
        !formData.name ||
        !formData.price ||
        !formData.description ||
        !formData.category
      ) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (!images.image1) {
        toast.error("Au moins une image est requise");
        return;
      }

      const submitData = new FormData();

      // Append images first
      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          submitData.append(key, file);
        }
      });

      // Append form data with proper type conversion
      submitData.append("name", String(formData.name).trim());
      submitData.append("description", String(formData.description).trim());
      submitData.append("category", String(formData.category).trim());
      submitData.append("price", Number(formData.price));
      submitData.append("countInStock", Number(formData.countInStock));
      submitData.append("bestseller", formData.bestseller);
      // Ajouter les tailles si elles sont sélectionnées
      if (formData.sizes.length > 0) {
        submitData.append("sizes", JSON.stringify(formData.sizes));
      }

      const response = await axios.post(
        `${backendUrl}/api/product/create`,
        submitData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            toast.info(`Envoi: ${percentCompleted}%`, {
              toastId: "uploadProgress",
              autoClose: false,
            });
          },
          timeout: 30000,
        }
      );

      if (response.data) {
        toast.dismiss("uploadProgress");
        toast.success("Produit ajouté avec succès!");
        resetForm();
      }
    } catch (error) {
      toast.dismiss("uploadProgress");
      console.error("Error:", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: categories[0]?.name || "",
      price: "",
      bestseller: false,
      countInStock: "",
      sizes: [], // Réinitialiser les tailles
    });
    setImages({
      image1: null,
      image2: null,
      image3: null,
    });
  };

  const handleError = (error) => {
    if (error.code === "ECONNABORTED") {
      toast.error("La requête a pris trop de temps. Veuillez réessayer.");
    } else if (error.response?.status === 413) {
      toast.error("Les images sont trop volumineuses");
    } else if (error.response?.status === 401) {
      toast.error("Session expirée, veuillez vous reconnecter");
    } else {
      toast.error(
        error.response?.data?.error ||
          "Erreur lors de l'ajout. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau produit</h2>

      <form onSubmit={onSubmit} className="space-y-6">
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
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.label}
                  </option>
                ))}
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
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min="0"
                required
              />
            </div>
            {/* Ajouter après le champ countInStock */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tailles disponibles (optionnel)
              </label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${
            formData.sizes.includes(size)
              ? "bg-rose-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleInputChange}
              className="h-4 w-4 text-rose-600"
            />
            <label className="ml-2 text-sm text-gray-700">
              Meilleure vente
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
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
