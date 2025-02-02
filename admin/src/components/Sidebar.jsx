import React from "react";
import { NavLink } from "react-router-dom";
import { MdAddCircle, MdList, MdShoppingCart } from "react-icons/md";

export const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-all duration-200 hover:bg-burgundy-50 ${
      isActive ? "bg-burgundy-100 border-r-4 border-r-burgundy-700" : ""
    }`;

  return (
    <div className="w-[20%] bg-white min-h-screen border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink className={linkClass} to="/create">
          <MdAddCircle className="w-5 h-5 text-burgundy-700" />
          <p className="hidden md:block text-burgundy-800">Créer un produit</p>
        </NavLink>

        <NavLink className={linkClass} to="/list">
          <MdList className="w-5 h-5 text-burgundy-700" />
          <p className="hidden md:block text-burgundy-800">Liste de produits</p>
        </NavLink>

        <NavLink className={linkClass} to="/orders">
          <MdShoppingCart className="w-5 h-5 text-burgundy-700" />
          <p className="hidden md:block text-burgundy-800">Commandes</p>
        </NavLink>
      </div>
    </div>
  );
};
