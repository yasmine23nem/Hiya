import React from "react";

export const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-8 lg:px-16">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Contactez nous
      </h2>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Address Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">
            Nos Coordonnées
          </h3>
          <div className="text-gray-600">
            <p className="mt-2">
              <span className="font-semibold">Téléphone:</span>
              +33 6 18 43 55 27
            </p>
            <p className="mt-2">
              <span className="font-semibold">Email:</span>{" "}
              Hiyamode.contact@gmail.com
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-red-700 mb-6">
            Envoyez-nous un message
          </h3>
          <form className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 transition-all"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 transition-all"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
