import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotreMission = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <Link
          to="/about"
          className="flex items-center gap-2 text-[#D71C1C] font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Notre Mission
            </h1>
          </div>

          <div className="prose-lg max-w-none">
            <div className="bg-[#D71C1C]/10 border-l-4 border-[#D71C1C] p-6 rounded mb-8">
              <p className="text-lg font-semibold text-black">
                "Propulser la croissance exponentielle des entreprises
                québécoises en fournissant des solutions de prospection
                commerciale innovantes, mesurables et durables."
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">
              Nos Engagements
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Chaque jour, notre équipe s'engage à :
            </p>
            <ul className="space-y-4 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">1.</span>
                <div>
                  <strong>Dépasser les attentes</strong> - Nous visons toujours
                  à surpasser les objectifs fixés et à fournir une valeur
                  exceptionnelle.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">2.</span>
                <div>
                  <strong>Innover continuellement</strong> - Nous investissons
                  dans la recherche et le développement pour rester à l'avant de
                  l'industrie.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">3.</span>
                <div>
                  <strong>Être transparent</strong> - Nos clients connaissent
                  exactement ce qu'ils obtiennent et comment nous y arrivons.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">4.</span>
                <div>
                  <strong>Croître ensemble</strong> - Le succès de nos clients
                  est notre succès, et nous les accompagnons à chaque étape.
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">
              Notre Impact
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Depuis notre création, nous avons généré un impact positif
              significatif :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#D71C1C] mb-2">
                  500+
                </div>
                <p className="text-gray-700">Clients satisfaits</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#D71C1C] mb-2">
                  1M+
                </div>
                <p className="text-gray-700">Leads générés</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#D71C1C] mb-2">
                  $500M+
                </div>
                <p className="text-gray-700">En revenus générés</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#D71C1C] mb-2">
                  95%
                </div>
                <p className="text-gray-700">Taux de satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotreMission;
