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
      className={`sticky top-0 z-50 bg-white shadow-sm w-full transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-105">
          <img
            src={assets.logo}
            className="w-40 h-20 object-contain"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative group text-rose-600 hover:text-rose-800 
                    transition-colors duration-300 
                    ${isActive ? "text-rose-900 font-semibold" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-[-4px] left-0 h-0.5 bg-rose-800 
                          transition-all duration-300
                          ${isActive ? "w-full" : "w-0"}
                          group-hover:w-full`}
                    ></span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons and Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-rose-600 hover:text-rose-800 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Icon */}
          <div className="relative">
            <button
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  setDropdownVisible(!dropdownVisible);
                }
              }}
              className="text-rose-600 hover:text-rose-800"
            >
              <User className="w-5 h-5" />
            </button>
            {dropdownVisible && token && (
              <div
                className="absolute right-0 mt-2 w-40 
                  bg-white shadow-lg rounded-md border border-gray-200
                  transition-all duration-300 ease-in-out"
              >
                <div className="py-2">
                  <p
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-rose-800"
                  >
                    Mon profil
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-rose-800"
                  >
                    Commandes
                  </p>
                  <p
                    onClick={logout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-rose-800"
                  >
                    Déconnexion
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-5 h-5 text-rose-600 hover:text-rose-800" />
            {getCartCount() > 0 && (
              <span
                className="absolute -top-2 -right-2 
                  bg-rose-600 text-white 
                  rounded-full w-4 h-4 
                  flex items-center justify-center 
                  text-[10px] font-bold"
              >
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setVisible(!visible)}
            className="md:hidden text-rose-600"
          >
            {visible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg 
          transform transition-transform duration-300 
          ${visible ? "translate-x-0" : "translate-x-full"}
          md:hidden z-50`}
      >
        <div className="p-4">
          <button
            onClick={() => setVisible(false)}
            className="mb-4 text-rose-600 hover:text-rose-800 flex items-center"
          >
            <X className="w-6 h-6 mr-2" /> Fermer
          </button>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-3 border-b border-gray-200
                  ${
                    isActive
                      ? "bg-gray-100 text-rose-900"
                      : "text-rose-800 hover:bg-gray-100"
                  }
                  transition-colors`
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
