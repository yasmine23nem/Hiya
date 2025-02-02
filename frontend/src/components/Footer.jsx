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
            <p className="text-gray-600"></p>
          </div>

          {/* Section 2: Company Links */}

          {/* Section 3: Follow Us */}
          <div>
            <p className="text-xl font-semibold mb-5">FOLLOW US</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/hiya_mode_?igsh=aTM3YmJibDI1dm5r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-600 cursor-pointer"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="mailto:Hiyamode.contact@gmail.com"
                  className="hover:text-gray-800 cursor-pointer"
                >
                  Hiyamode.contact@gmail.com
                </a>
              </li>
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
