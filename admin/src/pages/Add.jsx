import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const categories = {
    "Boucle d'oreilles": [
      "Boucle d'oreilles en argent véritable",
      "Boucle d'oreilles en argent plaqué",
    ],
    Bague: ["Bague en argent véritable", "Bague en argent plaqué"],
    Collier: ["Collier en argent véritable", "Collier en argent plaqué"],
    Bracelet: ["Bracelet en argent véritable", "Bracelet en argent plaqué"],
    Sac: ["Sac"],
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Bracelet en argent véritable",
    price: "",
    bestseller: false,
    countInStock: "",
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

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
        setLoading(false);
        return;
      }

      if (!images.image1) {
        toast.error("Au moins une image est requise");
        setLoading(false);
        return;
      }

      const submitData = new FormData();

      // Append images
      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          submitData.append(key, file);
        }
      });

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/create`,
        submitData,
        {
          headers: {
            token,
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

        // Reset form
        setFormData({
          name: "",
          description: "",
          category: "Bracelet en argent véritable",
          price: "",
          bestseller: false,
          countInStock: "",
        });
        setImages({
          image1: null,
          image2: null,
          image3: null,
        });
      }
    } catch (error) {
      toast.dismiss("uploadProgress");
      console.error("Error:", error);

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

        {/* Rest of your form remains unchanged */}
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
                {Object.entries(categories).map(([mainCat, subCats]) => (
                  <optgroup key={mainCat} label={mainCat}>
                    {subCats.map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                  </optgroup>
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
