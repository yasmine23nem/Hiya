import React from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add.jsx"; // uses default export from Add.jsximport List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import List from "./pages/List.jsx";
import { useEffect, useState } from "react";
import { Login } from "./components/Login.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { use } from "react";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mw-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/create" element={<Add token={token}></Add>} />
                <Route path="/list" element={<List token={token}></List>} />
                <Route
                  path="/orders"
                  element={<Orders token={token}></Orders>}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
