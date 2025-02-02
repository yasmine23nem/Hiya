import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = "http://localhost:8000";
export const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      console.log(response);
      console.log(response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  w-full">
      <div className="bg-white shadow-md pw-8 py-6 max-w-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Administrateur</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2"> Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Votre email"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black "
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};
