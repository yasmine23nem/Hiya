import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ProductItem } from "../components/ProductItem";
import { Title } from "../components/Title";

export const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCategory([selectedCategory]);
    }
  }, [selectedCategory]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const sortProducts = (products) => {
    const sorted = [...products];
    switch (sortType) {
      case "low-high":
        return sorted.sort((a, b) => a.price - b.price);
      case "high-low":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const applyFilter = () => {
    setIsLoading(true);
    let filtered = products || [];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    filtered = sortProducts(filtered);
    setFilteredProducts(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products, sortType]);

  if (isLoading && !products?.length) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-gray-300">
      <div className="min-w-[250px]">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="w-full sm:w-auto px-4 py-2 flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <span className="font-medium">Filtrer</span>
          {category.length > 0 && (
            <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-sm">
              {category.length}
            </span>
          )}
          <svg
            className={`w-5 h-5 transition-transform ${
              showFilter ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showFilter && (
          <div className="mt-4 border border-gray-200 rounded-lg p-5 shadow-md">
            <p className="mb-3 text-base font-medium text-gray-800">
              Catégories
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {categories.map((cat) => (
                <div className="flex gap-2 items-center" key={cat._id}>
                  <input
                    type="checkbox"
                    checked={category.includes(cat.name)}
                    className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    value={cat.name}
                    onChange={toggleCategory}
                  />
                  <label className="text-sm">{cat.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Title text1={"Toute la "} text2={"Collection"} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="relevant">Trier par: Pertinent</option>
            <option value="high-low">Trier par: Prix décroissant</option>
            <option value="low-high">Trier par: Prix croissant</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Aucun produit trouvé
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
              >
                <ProductItem
                  id={item._id}
                  image={item.image[0]}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
