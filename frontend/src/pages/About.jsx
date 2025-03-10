import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="bg-[#faf7f5] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Bienvenue sur Hiya
        </h1>
        <div className="text-center mb-10">
          <div className="inline-block">
            <span className="inline-block w-16 h-[1px] bg-rose-300 align-middle mr-3"></span>
            <span className="text-rose-500 text-sm uppercase tracking-wider font-medium">
              L'univers de la femme
            </span>
            <span className="inline-block w-16 h-[1px] bg-rose-300 align-middle ml-3"></span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mb-6">
          <p className="text-gray-700 leading-relaxed">
            Bienvenue sur Hiya, votre site dédié à l’univers de la femme ! Ici,
            nous célébrons la beauté et l’élégance à travers une vaste gamme de
            produits et de conseils. Vous y trouverez une sélection exclusive de
            bijoux en argent véritable qui embelliront votre style, que ce soit
            des colliers en argent, des bracelets en argent, des boucles
            d’oreilles en argent ou des bagues en argent. Chaque pièce est
            soigneusement choisie pour refléter les dernières tendances et
            offrir une touche d’originalité à votre look.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <img
            src={assets.photo1} // Replace with the actual image URL
            alt="Fashion"
            className="rounded-lg shadow-md h-64 w-full object-cover"
          />
          <p className="text-gray-700 leading-relaxed">
            Mais Hiya n’est pas seulement des bijoux ! Nous proposons également
            une collection de vêtements à la mode qui s’adaptent à toutes les
            occasions, vous permettant d’exprimer votre personnalité unique. De
            plus, notre section de coiffure vous offre des conseils et des
            astuces pour sublimer votre chevelure, car chaque détail compte dans
            l’art de se mettre en valeur.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <p className="text-gray-700 leading-relaxed">
            En plus de ces produits, Hiya est un véritable guide pour la femme
            moderne. Découvrez nos astuces mode et beauté, des conseils
            pratiques qui vous aideront à vous sentir bien dans votre peau et à
            être confiante au quotidien.
          </p>
          <img
            src={assets.photo5}// Replace with the actual image URL
            alt="Beauty Tips"
            className="rounded-lg shadow-md object-cover"
          />
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          Rejoignez-nous dans cette aventure où nous explorons ensemble
          l’univers de la femme, en mettant en avant ce qui vous rend unique et
          belle. Avec Hiya, trouvez l’inspiration et les outils pour briller
          chaque jour !
        </p>
        <div className="text-center mt-10">
          <Link
            to="/collection"
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md transition-colors shadow-md inline-flex items-center"
          >
            <span>Découvrir la collection</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Pourquoi Choisir Hiya Mode pour Vos Bijoux en Argent Véritable ?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Chez Hiya Mode, nous sommes passionnés par la création et la
            sélection de bijoux en argent véritable qui allient élégance et
            qualité. Dans cet article, nous souhaitons vous expliquer en détail
            notre engagement envers la qualité et la sécurité de nos produits,
            pour que vous puissiez acheter en toute confiance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Une Sélection Rigoureuse de Produits en Argent</strong>
            <br />
            Nous croyons fermement que chaque bijou doit être à la fois beau et
            sûr. C’est pourquoi nous nous concentrons uniquement sur des bijoux
            en argent véritable, garantissant ainsi l’authenticité de chaque
            pièce. Que ce soit des colliers en argent, des bracelets en argent,
            des boucles d’oreilles en argent ou des bagues en argent, chaque
            bijou que vous trouvez chez Hiya Mode est soigneusement sélectionné
            pour répondre à nos standards élevés.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Hypoallergénique et Certifié Conforme</strong>
            <br />
            La sécurité de nos clients est notre priorité. Tous nos bijoux sont
            hypoallergéniques, ce qui signifie qu’ils sont conçus pour minimiser
            les risques d’allergies cutanées. Nous savons que beaucoup de
            personnes sont sensibles aux métaux, c’est pourquoi nous
            garantissons que nos produits en argent sont conformes aux normes de
            sécurité les plus strictes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>
              Test de Conformité : Un Processus de Vérification Rigoureux
            </strong>
            <br />
            Pour assurer la qualité de nos bijoux, nous effectuons des tests
            rigoureux. Chaque pièce est soumise à un test révélateur d’argent,
            qui permet de diagnostiquer sa pureté et d’assurer qu’elle respecte
            les standards de l’argent véritable. Ce test garantit que nos bijoux
            non artisanaux sont fabriqués à partir de matériaux de haute
            qualité, offrant ainsi une durabilité et un éclat qui perdurent dans
            le temps.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>La Confiance au Cœur de Notre Engagement</strong>
            <br />
            Chez Hiya Mode, nous nous engageons à offrir des bijoux de luxe en
            argent dont vous pouvez être fiers. Chaque bijou que nous proposons
            est le résultat d’une sélection minutieuse, car nous savons que nos
            clients méritent le meilleur. Nous voulons que vous vous sentiez en
            sécurité et satisfait de votre achat, que ce soit pour vous-même ou
            pour offrir un cadeau bijou spécial.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Conclusion</strong>
            <br />
            En choisissant Hiya Mode, vous optez pour une boutique de mode
            bijoux en Algérie qui se soucie de la qualité et de la sécurité de
            ses produits. Explorez notre collection de bijoux en argent
            véritable et découvrez par vous-même la différence que peut faire un
            engagement envers l’excellence. N’hésitez pas à nous contacter si
            vous avez des questions ou si vous souhaitez en savoir plus sur nos
            processus de sélection et de test.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nous sommes impatients de vous accueillir dans notre boutique en
            ligne et de vous aider à trouver les bijoux parfaits qui
            illumineront votre style !
          </p>
        </div>
      </div>
    </div>
  );
};
