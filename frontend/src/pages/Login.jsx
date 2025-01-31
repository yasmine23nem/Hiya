import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

export const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { navigate, token, setToken } = useContext(ShopContext);
  const backendUrl = "http://localhost:4000"; // Fallback to localhost if the env variable is not set

  useEffect(() => {
    if (token) {
      navigate("/");
      toast.success("You are already logged in!");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    console.log("Nom:", name);
    console.log("Email:", email);
    console.log("Mot de passe:", password);

    try {
      if (currentState === "Login") {
        console.log("coucou login");
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("Login successful!");
        }
      } else {
        console.log("coucou register");
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi des données:", err);
      setError(err.response?.data?.error || "Une erreur est survenue");
      toast.error(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign up" && (
        <input
          className="border border-gray-800 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="border border-gray-800 rounded py-1.5 px-3.5 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border border-gray-800 rounded py-1.5 px-3.5 w-full"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Mot de passe oublié?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign up")}
            className="cursor-pointer"
          >
            Créer un compte
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Se connecter
          </p>
        )}
      </div>

      <button
        className="bg-black text-white font-light px-8 py-2 mt-4"
        disabled={loading}
      >
        {loading
          ? "Chargement..."
          : currentState === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};
