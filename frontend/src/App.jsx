import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Collection } from "./pages/Collection";
import { PlaceOrder } from "./pages/PlaceOrder";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { Orders } from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import { Delivery } from "./components/Delivery";

export const App = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY + 50) {
      setHidden(true); // Cache le nav si le défilement vers le bas dépasse 50px
    } else if (window.scrollY < lastScrollY - 50) {
      setHidden(false); // Affiche le nav si le défilement vers le haut dépasse 50px
    }
    setLastScrollY(window.scrollY); // Met à jour la position de défilement
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Ajoute l'écouteur de scroll
    return () => {
      window.removeEventListener("scroll", handleScroll); // Nettoyage au démontage
    };
  }, [lastScrollY]);

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 max-w-full max-h-full">
      <ToastContainer />
      <Navbar hidden={hidden} /> {/* Passage de la prop 'hidden' au Navbar */}
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
