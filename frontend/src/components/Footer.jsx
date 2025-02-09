import React from "react";
import { assets } from "../assets/assets";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="mb-4">
              <img
                src={assets.logo}
                alt="Hiya Mode Logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Hiya Mode | NEMIRIY.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <p className="text-xl font-semibold mb-5">FOLLOW US</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaInstagram className="text-xl" />
                <a
                  href="https://www.instagram.com/hiya_mode_?igsh=aTM3YmJibDI1dm5r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-600 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaFacebook className="text-xl" />
                <a
                  href="https://www.facebook.com/people/Hiya-Mode/61570088184019/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-600 transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaTiktok className="text-xl" />
                <a
                  href="https://www.tiktok.com/@hiya.mode?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-600 transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <MdEmail className="text-xl" />
                <a
                  href="mailto:Hiyamode.contact@gmail.com"
                  className="hover:text-rose-600 transition-colors"
                >
                  Hiyamode.contact@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
