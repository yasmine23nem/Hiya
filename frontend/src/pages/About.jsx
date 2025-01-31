import React from "react";

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
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Tarifs de Livraison
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Destination
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Délai
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Tarif à Domicile (DA)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Tarif au Bureau (DA)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allDeliveryData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.delai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.domicile} (DA)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.bureau}(DA)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>* Les délais sont donnés à titre indicatif</p>
        <p>* Les tarifs sont en Dinars Algériens (DA)</p>
      </div>
    </div>
  );
};

export { About };
