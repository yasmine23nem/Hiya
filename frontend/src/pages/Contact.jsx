import React from "react";
import { Title } from "../components/Title";

export const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-8 lg:px-16">
      {/* Title */}
      <div className="text-center">
        <p className="text-gray-600">N'hésitez pas à nous contacter.</p>
      </div>

      {/* Main Content */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Address Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-gray-600 mt-2">Tel: 12345788</p>
          <p className="text-gray-600 mt-2">
            Email: Hiyamode.contact@gmail.com
          </p>
          <div className="mt-8"></div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Envoyez-nous un message
          </h2>
          <form className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-600 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Votre message"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-rose-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-rose-200 text-white px-6 py-3 rounded-md hover:bg-rose-600 transition-all"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
