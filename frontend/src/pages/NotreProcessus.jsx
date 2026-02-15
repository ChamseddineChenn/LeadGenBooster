import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const NotreProcessus = () => {
  const steps = [
    {
      number: 1,
      title: 'Discovery & Consultation',
      description:
        'Nous commençons par comprendre vos objectifs, votre marché cible, et vos défis spécifiques en une consultation approfondie.',
    },
    {
      number: 2,
      title: 'Stratégie Personnalisée',
      description:
        'Nous développons une stratégie sur mesure adaptée à votre industrie, votre budget et vos objectifs de croissance.',
    },
    {
      number: 3,
      title: 'Recherche & Qualification',
      description:
        'Notre équipe identifie et qualifie les prospects les plus pertinents selon vos critères spécifiques.',
    },
    {
      number: 4,
      title: 'Prospection Active',
      description:
        'Nous engageons vos prospects cibles par téléphone, email et autres canaux avec un taux de connexion optimal.',
    },
    {
      number: 5,
      title: 'Lead Nurturing',
      description:
        'Nous maintenons et développons les relations avec les prospects pour les transformer en opportunités de vente.',
    },
    {
      number: 6,
      title: 'Rapports & Optimisation',
      description:
        'Nous fournissons des rapports détaillés et optimisons continuellement la stratégie pour améliorer les résultats.',
    },
  ];

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
              Notre Processus
            </h1>
          </div>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Notre approche systématique et éprouvée garantit des résultats
            mesurables et durables. Voici comment nous transformons vos
            objectifs en succès commercial.
          </p>

          {/* Process Steps */}
          <div className="space-y-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#D71C1C] text-white font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-[#D71C1C]/30 mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Features */}
          <h2 className="text-2xl font-bold text-black mb-6">
            Ce Qui Nous Distingue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#D71C1C]" />
                <h4 className="font-bold text-black">Technologie Avancée</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Nous utilisons des outils CRM et d'automation state-of-the-art
                pour maximiser l'efficacité.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#D71C1C]" />
                <h4 className="font-bold text-black">Équipe Expérimentée</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Notre équipe cumule plus de 100 ans d'expérience en prospection
                commerciale.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#D71C1C]" />
                <h4 className="font-bold text-black">Résultats Mesurables</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Chaque campagne est suivie avec des métriques détaillées et des
                rapports transparents.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#D71C1C]" />
                <h4 className="font-bold text-black">Optimisation Continue</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Nous testons, apprenons et optimisons continuellement pour de
                meilleurs résultats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotreProcessus;
