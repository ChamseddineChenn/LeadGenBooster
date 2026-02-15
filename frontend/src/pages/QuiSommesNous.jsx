import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const QuiSommesNous = () => {
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
              Qui Sommes-Nous
            </h1>
          </div>

          <div className="prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Lead Gen Booster est une entreprise québécoise spécialisée dans la
              génération de leads et la prospection commerciale depuis plus de
              10 ans. Nous avons développé une expertise unique combinant les
              meilleures pratiques de télémarketing avec l'innovation
              technologique.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">
              Notre Histoire
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Fondée en 2014 par un groupe d'entrepreneurs passionnés, Lead Gen
              Booster a commencé comme une petite équipe de 5 personnes dans un
              bureau à Montréal. Aujourd'hui, nous sommes plus de 50 experts
              dédiés à aider les entreprises à croître exponentiellement.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">
              Notre Expertise
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Au cours de la dernière décennie, nous avons généré plus d'un
              million de contacts qualifiés pour plus de 500 entreprises
              différentes. Notre approche éprouvée combine stratégie,
              technologie et excellence opérationnelle pour délivrer des
              résultats exceptionnels.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">
              Pourquoi Nous Choisir
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Équipe hautement qualifiée et expérimentée</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Processus éprouvés et méthodiques</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Technologie de pointe pour la prospection</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Résultats mesurables et transparents</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Engagement envers la satisfaction client</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuiSommesNous;
