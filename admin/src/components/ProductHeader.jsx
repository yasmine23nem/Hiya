import React from "react";

const ProductHeader = ({
  filteredList,
  selectedCategory,
  categories,
  setSelectedCategory,
  list,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <h2 className="text-xl md:text-2xl font-bold">
        Liste des produits ({filteredList.length} produits)
      </h2>
      <div className="w-full md:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto min-w-[200px] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="all">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.label} (
              {
                list.filter((product) => product.category === category.name)
                  .length
              }
              )
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductHeader;
