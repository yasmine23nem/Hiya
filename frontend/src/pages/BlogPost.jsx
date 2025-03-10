import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const BlogPost = () => {
  return (
    <div className="bg-[#faf7f5] py-12 px-4 sm:px-6">
      {/* Hero section with decorative elements */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block">
            <span className="inline-block w-16 h-[1px] bg-rose-300 align-middle mr-3"></span>
            <span className="text-rose-500 text-sm uppercase tracking-wider font-medium">
              Tendances Bijoux
            </span>
            <span className="inline-block w-16 h-[1px] bg-rose-300 align-middle ml-3"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 text-gray-800 leading-tight">
            Découvrez notre Sélection Exclusive de Bijoux Modernes pour 2025
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center"></div>
          </div>
        </div>

        {/* Featured image */}

        {/* Content */}
        <article className="prose prose-rose lg:prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm">
          <p className="text-gray-700 leading-relaxed mb-6 first-letter:text-4xl first-letter:font-serif first-letter:text-rose-500 first-letter:mr-1 first-letter:float-left">
            Bienvenue sur le blog de <strong>Hiya Mode</strong>, votre référence
            en matière de bijoux modernes en argent véritable. Aujourd'hui, nous
            sommes ravis de vous présenter notre toute nouvelle sélection de
            produits tendances pour 2025. Si vous êtes à la recherche de pièces
            uniques qui allient style et élégance, vous êtes au bon endroit !
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <img
              src={assets.c}
              alt="Silver necklace"
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img
              src={assets.lll}
              alt="Silver bracelet"
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            L'histoire derrière chaque pièce
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Chez Hiya Mode, nous croyons que chaque bijou raconte une histoire.
            C'est pourquoi nous avons soigneusement sélectionné des{" "}
            <strong>
              colliers en argent, bracelets en argent, boucles d'oreilles en
              argent et bagues en argent
            </strong>{" "}
            qui reflètent les dernières tendances tout en offrant une touche
            d'originalité. Chaque pièce de notre collection est importée
            directement de France, garantissant ainsi un design moderne et
            raffiné.
          </p>

          <blockquote className="border-l-4 border-rose-400 pl-4 italic my-8 text-gray-600">
            "Les bijoux sont comme les chapitres d'une histoire personnelle -
            chaque pièce marque un moment, une émotion, un souvenir."
          </blockquote>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            Une collection en édition limitée
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Ce qui rend notre offre encore plus spéciale, c'est que nous
            proposons nos bijoux en <strong>quantités limitées</strong>. Cela
            signifie que vous aurez l'opportunité de posséder des bijoux non
            artisanaux qui ne seront pas disponibles à chaque coin de rue. Vous
            pourrez ainsi vous démarquer avec des accessoires uniques qui
            attirent l'attention.
          </p>

          <div className="my-8 p-6 bg-rose-50 rounded-lg border border-rose-100">
            <h3 className="text-xl font-semibold text-rose-600 mb-2">
              Conseils d'entretien
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Évitez le contact avec les parfums et les produits chimiques
              </li>
              <li>Nettoyez régulièrement avec un chiffon doux</li>
              <li>
                Rangez vos bijoux individuellement pour éviter les rayures
              </li>
              <li>Retirez vos bijoux avant de nager ou de vous doucher</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Nous savons que nos clients recherchent des pièces qui les
            représentent et qui s'intègrent parfaitement à leur style. C'est
            pourquoi notre sélection de bijoux pour femmes en Algérie est
            soigneusement pensée pour répondre à vos envies. Que vous souhaitiez
            un <strong>collier en argent délicat</strong> pour une occasion
            spéciale ou un <strong>bracelet en argent audacieux</strong> pour le
            quotidien, nous avons ce qu'il vous faut.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            Ne manquez pas l'occasion
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>N'oubliez pas</strong> que notre collection est limitée,
            alors ne manquez pas l'occasion de vous procurer ces pièces tendance
            avant qu'elles ne disparaissent. Chez Hiya Mode, nous nous engageons
            à vous offrir des bijoux de luxe en argent qui rehausseront votre
            look et vous feront briller en toute occasion.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Restez connectées avec nous pour découvrir nos nouveautés et nos
            conseils mode. Ensemble, faisons de 2025 une année exceptionnelle en
            matière de style et de sophistication avec{" "}
            <strong>Hiya Mode</strong>, votre boutique de mode bijoux en
            Algérie.
          </p>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-800 font-semibold text-lg mb-4 md:mb-0">
                À très bientôt dans notre boutique en ligne !
              </p>
              <Link
                to="/collection"
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md transition-colors shadow-md flex items-center"
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
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
