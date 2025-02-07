import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";

export const Navbar = ({ hidden }) => {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    setToken,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/collection", label: "Produits" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white shadow-md w-full transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-105">
          <img
            src={assets.logo}
            className="w-40 h-20 object-contain"
            alt="Logo"
          />
        </Link>

        <ul className="hidden md:flex space-x-8 items-center font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative group text-rose-600 transition-colors duration-300 ${
                    isActive ? "font-semibold" : ""
                  }`
                }
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons and Buttons */}
        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-gray-700 hover:text-rose-600 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Icon */}
          <div className="relative">
            <button
              onClick={() =>
                token
                  ? setDropdownVisible(!dropdownVisible)
                  : navigate("/login")
              }
              className="text-gray-700 hover:text-rose-600"
            >
              <User className="w-5 h-5" />
            </button>
            {dropdownVisible && token && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                <p
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                >
                  Mon profil
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                >
                  Commandes
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                >
                  Déconnexion
                </p>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-rose-600" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* CTA Button */}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setVisible(!visible)}
            className="md:hidden text-gray-700"
          >
            {visible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 w-full bg-white z-50 transform transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <div className="p-4">
          <button
            onClick={() => setVisible(false)}
            className="mb-4 text-gray-700 hover:text-rose-600 flex items-center"
          >
            <X className="w-6 h-6 mr-2" /> Fermer
          </button>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-3 border-b border-gray-200 text-gray-700 hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 text-rose-900" : "hover:text-rose-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
