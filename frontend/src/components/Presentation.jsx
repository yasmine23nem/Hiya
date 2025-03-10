import React from "react";
import { assets } from "../assets/assets";

const Presentation = () => {
  return (
    <div className="bg-[#faf7f5] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Présentation de mon profil
        </h1>
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={assets.mounia} // Replace with the actual image URL
            alt="Mounia"
            className="w-60 h-90 rounded-full object-cover mb-4 md:mb-0 md:mr-6" // Increased size
          />
          <p className="text-gray-700 leading-relaxed">
            Bonjour, je suis Mounia, coiffeuse passionnée par la mode et les
            bijoux, vivant à Toulouse, en France. Mon amour pour l’élégance et
            le style m’a toujours poussée à explorer les dernières tendances,
            non seulement dans le domaine de la coiffure, mais aussi dans
            l’univers des accessoires.
            <br />
            <br />
            Originaire d’Algérie, j’ai ma famille à Alger, et je rends souvent
            visite à mes proches. Ces voyages nourrissent en moi une profonde
            connexion avec ma culture et un désir de partager ma passion avec
            les femmes algériennes. C’est pourquoi j’ai décidé de me lancer dans
            une nouvelle aventure : créer une activité dédiée à la vente de
            bijoux en argent véritable, soigneusement sélectionnés pour leur
            qualité et leur originalité.
            <br />
            <br />
            Mon ambition est de proposer un choix précieux et particulier, dédié
            à la femme algérienne moderne qui cherche à sublimer son style avec
            des pièces uniques. Je souhaite offrir des bijoux qui non seulement
            mettent en valeur la beauté de chaque femme, mais qui racontent
            aussi une histoire et reflètent l’élégance intemporelle.
            <br />
            <br />
            En alliant mon expertise en mode et mes racines algériennes, je suis
            déterminée à développer une offre qui répond aux attentes et aux
            goûts des femmes d’aujourd’hui. Mon objectif est de créer un lien
            entre la mode française et l’authenticité algérienne, tout en
            apportant une touche de sophistication à chaque bijou que je
            propose.
            <br />
            <br />
            Je suis impatiente de partager cette aventure avec vous et de
            contribuer à embellir le quotidien des femmes algériennes avec des
            bijoux qui font la différence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
