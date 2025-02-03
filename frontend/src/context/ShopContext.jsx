import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "€";
  const delivery = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const addToCart = async (id, quantity) => {
    if (!quantity) {
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[id]) {
      if (cartData[id][quantity]) {
        cartData[id][quantity] += 1;
      } else {
        cartData[id][quantity] = 1;
      }
    } else {
      cartData[id] = {};
      cartData[id][quantity] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.id;
        const res = await axios.post(
          `${backendUrl}/api/cart/add`, // Use the variable here
          { userId: userId, itemId: id, quantity: quantity },
          { headers: { token } }
        );
        console.log(userId);
        if (res.data.success) {
          toast.success("Product added to cart");
          console.log(res.data);
        }
      } catch {
        console.error("Error adding product to cart");
      }
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (id, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[id] = quantity;
    setCartItems(cartData);
  };

  const getUserCart = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        // Use the variable here
        headers: { token },
      });
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch {
      console.error("Error fetching cart items");
    }
  };

  const getCartAmount = async () => {
    try {
      if (!token) {
        console.error("Aucun token trouvé !");
        return 0;
      }

      // Vérifier si nous avons des produits
      if (products.length === 0) {
        await getProductsData();
      }

      let totalAmount = 0;

      // Parcourir le cartItems directement
      Object.entries(cartItems).forEach(([productId, quantities]) => {
        // Trouver le produit correspondant dans la liste des produits
        const product = products.find((p) => p._id === productId);

        if (product) {
          // Parcourir les quantités pour chaque taille
          Object.entries(quantities).forEach(([size, quantity]) => {
            // Multiplier le prix par la quantité et l'ajouter au total
            totalAmount += product.price * quantity;
          });
        }
      });

      // Arrondir à 2 décimales
      totalAmount = Math.round(totalAmount * 100) / 100;

      console.log("🧮 Détail du calcul :", {
        cartItems,
        products,
        totalAmount,
      });

      return totalAmount;
    } catch (error) {
      console.error("Erreur lors du calcul du montant total :", error);
      toast.error("Erreur lors du calcul du montant du panier");
      return 0;
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`); // Use the variable here
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      navigate("/");
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
