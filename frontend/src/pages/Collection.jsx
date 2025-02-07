import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "../components/ProductItem";
import { Title } from "../components/Title";

export const Collection = () => {
  // Context and State
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [isLoading, setIsLoading] = useState(true);

  // Filter Functions
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

    // Search Filter
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Sort Products
    filtered = sortProducts(filtered);
    setFilteredProducts(filtered);
    setIsLoading(false);
  };

  // Effect Hooks
  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products, sortType]);

  // Categories
  const categories = [
    "Boucle d'oreilles",
    "Bague",
    "Collier",
    "Bracelet",
    "Sac",
  ];

  // Loading State
  if (isLoading && !products?.length) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-gray-300">
      {/* Filter Section */}
      <div className="min-w-[250px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-rose-600 font-semibold hover:text-rose-800"
        >
          Filtrer {category.length > 0 && `(${category.length})`}
        </p>
        <div
          className={`border border-gray-200 rounded-lg p-5 mt-4 shadow-md transition-all ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-base font-medium text-gray-800">Catégories</p>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            {categories.map((cat) => (
              <div className="flex gap-2 items-center" key={cat}>
                <input
                  type="checkbox"
                  checked={category.includes(cat)}
                  className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                  value={cat}
                  onChange={toggleCategory}
                />
                <label>{cat}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-xl mb-6">
          <Title text1={"Toute la "} text2={"Collection"} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
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
