import React from "react";
import { assets } from "../assets/assets";

export const Footer = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
          {/* Section 1: Logo & Description */}
          <div>
            <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugit
              nulla inventore nesciunt voluptatum libero facilis deleniti
              minima. Repellat sit adipisci temporibus iure quasi, quis tempora
              velit magni et veritatis.
            </p>
          </div>

          {/* Section 2: Company Links */}
          <div>
            <p className="text-xl font-semibold mb-5">COMPANY</p>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-rose-600 cursor-pointer">Home</li>
              <li className="hover:text-rose-600 cursor-pointer">About us</li>
              <li className="hover:text-rose-600 cursor-pointer">Delivery</li>
              <li className="hover:text-rose-600 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Section 3: Follow Us */}
          <div>
            <p className="text-xl font-semibold mb-5">FOLLOW US</p>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-rose-600 cursor-pointer">Instagram</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-gray-100 py-4 mt-10 text-center text-gray-600">
        <p>© 2025 All rights reserved - NY</p>
      </div>
    </div>
  );
};
