import React, { useState } from "react";
import { Search } from "lucide-react";

const deliveryData = [
  { destination: "Adrar", delai: "J+7", domicile: 1650, bureau: 850 },
  { destination: "Chlef", delai: "J+1", domicile: 700, bureau: 450 },
  { destination: "Laghouat", delai: "J+2", domicile: 850, bureau: 450 },
  { destination: "Oum El Bouaghi", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Batna", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Béjaïa", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Biskra", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Béchar", delai: "J+2", domicile: 1200, bureau: 650 },
  { destination: "Blida", delai: "J+1", domicile: 650, bureau: 450 },
  { destination: "Bouira", delai: "J+1", domicile: 650, bureau: 450 },
  { destination: "Tamanrasset", delai: "J+2", domicile: 1800, bureau: 1000 },
  { destination: "Tébessa", delai: "J+2", domicile: 850, bureau: 450 },
  { destination: "Tlemcen", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Tiaret", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Tizi Ouzou", delai: "J+1", domicile: 650, bureau: 450 },
  { destination: "Alger", delai: "J+1", domicile: 450, bureau: 300 },
  { destination: "Djelfa", delai: "J+2", domicile: 850, bureau: 450 },
  { destination: "Jijel", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Sétif", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Saïda", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Skikda", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Sidi Bel Abbès", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Annaba", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Guelma", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Constantine", delai: "J+2", domicile: 850, bureau: 450 },
  { destination: "Médéa", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Mostaganem", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "M'Sila", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Mascara", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Ouargla", delai: "J+3", domicile: 1000, bureau: 500 },
  { destination: "Oran", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "El Bayadh", delai: "J+3", domicile: 850, bureau: 450 },
  { destination: "Illizi", delai: "J+3", domicile: 1700, bureau: 850 },
  {
    destination: "Bordj Bou Arreridj",
    delai: "J+1",
    domicile: 850,
    bureau: 450,
  },
  { destination: "Boumerdès", delai: "J+1", domicile: 650, bureau: 400 },
  { destination: "El Tarf", delai: "J+1", domicile: 850, bureau: 550 },
  { destination: "Tindouf", delai: "J+2", domicile: 1650, bureau: 800 },
];
const deliveryDataContinued = [
  { destination: "Tissemsilt", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "El Oued", delai: "J+2", domicile: 950, bureau: 600 },
  { destination: "Khenchela", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Souk Ahras", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Tipaza", delai: "J+1", domicile: 650, bureau: 450 },
  { destination: "Mila", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Aïn Defla", delai: "J+1", domicile: 650, bureau: 450 },
  { destination: "Naâma", delai: "J+1", domicile: 950, bureau: 500 },
  { destination: "Aïn Témouchent", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Ghardaïa", delai: "J+1", domicile: 950, bureau: 650 },
  { destination: "Relizane", delai: "J+1", domicile: 850, bureau: 450 },
  { destination: "Timimoun", delai: "J+4", domicile: 1650, bureau: 850 },
  {
    destination: "Bordj Badji Mokhtar",
    delai: "J+6",
    domicile: 1600,
    bureau: 800,
  },
  { destination: "Ouled Djellal", delai: "J+4", domicile: 950, bureau: 450 },
  { destination: "Beni Abbès", delai: "J+3", domicile: 1300, bureau: 650 },
  { destination: "In Salah", delai: "J+3", domicile: 1650, bureau: 850 },
  { destination: "In Guezzam", delai: "J+3", domicile: 1500, bureau: 750 },
  { destination: "Touggourt", delai: "J+3", domicile: 950, bureau: 500 },
  { destination: "Djanet", delai: "J+3", domicile: 2000, bureau: 1000 },
  { destination: "El M'Ghair", delai: "J+3", domicile: 950, bureau: 500 },
  { destination: "El Meniaa", delai: "J+3", domicile: 950, bureau: 500 },
];
const allDeliveryData = [...deliveryData, ...deliveryDataContinued];
const Delivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const filteredData = allDeliveryData.filter((item) =>
    item.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-[#faf7f5] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black-700 mb-4">
            Tarifs de Livraison
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos tarifs de livraison pour toutes les wilayas d'Algérie.
            Nous offrons des services de livraison à domicile et en bureau de
            poste.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher une wilaya..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Délai
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    À Domicile
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Au Bureau
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-red-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.destination}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {item.delai}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {item.domicile} DA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {item.bureau} DA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-8 space-y-4 text-center">
          <div className="p-4 bg-red-50 rounded-lg inline-block">
            <p className="text-sm text-red-700">
              * Les délais sont donnés à titre indicatif et peuvent varier selon
              les conditions
            </p>
            <p className="text-sm text-red-700">
              * Les tarifs sont en Dinars Algériens (DA) et incluent la TVA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Delivery };
