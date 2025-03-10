import React from "react";

export const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-20 px-4 sm:px-8 lg:px-16">
      {/* Title Section */}
      <h2 className="text-4xl font-bold text-black-700 mb-12 text-center">
        Contactez nous
      </h2>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Address Section */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 transform hover:scale-105 transition-transform duration-300 h-fit">
          <h3 className="text-2xl font-semibold text-red-700 mb-6">
            Nos Coordonnées
          </h3>
          <div className="text-gray-600 space-y-4">
            <p className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Hiyamode.contact@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
          <h3 className="text-2xl font-semibold text-red-700 mb-8">
            Envoyez-nous un message
          </h3>
          <form className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Votre message"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-700 text-white px-8 py-4 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 font-medium text-lg"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
