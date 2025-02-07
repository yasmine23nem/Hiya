import React from "react";
import vid2 from "../assets/vid2.mp4";

const VideoBanner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Section Vidéo */}
        <div className="relative w-full h-full md:w-full md:h-full">
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src={vid2} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </div>

        {/* Section Texte */}
        <div className="flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Élégance intemporelle
          </h2>
          <p className="text-gray-600 mt-4">
            Découvrez les bijoux en argent véritable qui incarnent l'élégance et
            la sophistication. Chaque pièce est conçue pour briller avec une
            beauté intemporelle, parfaite pour toutes les occasions. Empilez,
            mélangez et multipliez – jour après jour, année après année.
          </p>
          <button className="mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-gray-800 transition">
            DÉCOUVREZ LES NOUVEAUX STYLES
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
