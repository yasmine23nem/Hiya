import React from "react";
import { assets } from "../assets/assets";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <div className="bg-gray-50 py-10">
      {/* ...existing code... */}
      <div>
        <p className="text-xl font-semibold mb-5">SUIVEZ NOUS</p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center gap-2">
            <FaInstagram className="text-xl" />
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
            <FaTiktok className="text-xl" />
            <a
              href="https://www.tiktok.com/@hiya.mode?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 cursor-pointer"
            >
              TikTok
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MdEmail className="text-xl" />
            <a
              href="mailto:Hiyamode.contact@gmail.com"
              className="hover:text-gray-800 cursor-pointer"
            >
              Hiyamode.contact@gmail.com
            </a>
          </li>
        </ul>
      </div>
      {/* ...existing code... */}
    </div>
  );
};
