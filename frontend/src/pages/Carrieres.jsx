import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin } from 'lucide-react';

const Carrieres = () => {
  const positions = [
    {
      title: 'Agent de Prospection Téléphonique',
      location: 'Montréal, QC',
      type: 'Temps plein',
      description:
        'Rejoignez notre équipe de prospecteurs et aidez nos clients à générer des leads qualifiés.',
    },
    {
      title: 'Responsable Qualité',
      location: 'Montréal, QC',
      type: 'Temps plein',
      description:
        "Supervisez la qualité des appels et du coaching pour garantir l'excellence en service.",
    },
    {
      title: 'Représentant Vente B2B',
      location: 'Montréal, QC',
      type: 'Temps plein',
      description:
        'Développez les relations client et identifiez les opportunités de croissance pour nos services.',
    },
    {
      title: 'Spécialiste CRM/Données',
      location: 'Montréal, QC',
      type: 'Temps plein',
      description:
        'Gérez nos bases de données et optimisez nos systèmes CRM pour une meilleure efficacité.',
    },
    {
      title: 'Coach Commercial',
      location: 'Télétravail',
      type: 'Contrat',
      description:
        'Formez et coachez notre équipe pour améliorer leurs compétences de prospection.',
    },
    {
      title: 'Analyste Marketing',
      location: 'Montréal, QC',
      type: 'Temps plein',
      description:
        'Analysez les données de campagne et aidez à développer des stratégies gagnantes.',
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
              Carrières
            </h1>
          </div>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Rejoignez notre équipe dynamique en croissance et participez à la
            transformation du paysage commercial québécois.
          </p>

          <p className="text-gray-600 mb-12">
            Nous offrons un environnement de travail stimulant, des opportunités
            de développement professionnel et une compensation attrayante.
          </p>

          {/* Benefits */}
          <h2 className="text-2xl font-bold text-black mb-6">
            Avantages & Avantageux
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-[#D71C1C] font-bold">✓</span>
                <div>
                  <strong className="block text-black">
                    Salaire Compétitif
                  </strong>
                  <span className="text-gray-600 text-sm">
                    Rémunération basée sur l\'expérience et la performance
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D71C1C] font-bold">✓</span>
                <div>
                  <strong className="block text-black">Assurances</strong>
                  <span className="text-gray-600 text-sm">
                    Couverture santé, dentaire et vision complète
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D71C1C] font-bold">✓</span>
                <div>
                  <strong className="block text-black">
                    Formation Continue
                  </strong>
                  <span className="text-gray-600 text-sm">
                    Investissement dans votre développement professionnel
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D71C1C] font-bold">✓</span>
                <div>
                  <strong className="block text-black">Flexibilité</strong>
                  <span className="text-gray-600 text-sm">
                    Options de télétravail et horaires flexibles
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D71C1C] font-bold">✓</span>
                <div>
                  <strong className="block text-black">
                    Bonus & Commissions
                  </strong>
                  <span className="text-gray-600 text-sm">
                    Récompenses basées sur la performance
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D71C1C] font-bold">✓</span>
                <div>
                  <strong className="block text-black">
                    Culture Inclusive
                  </strong>
                  <span className="text-gray-600 text-sm">
                    Environnement de travail diversifié et inclusif
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <h2 className="text-2xl font-bold text-black mb-6">Postes Ouverts</h2>
          <div className="space-y-4 mb-12">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-black group-hover:text-[#D71C1C] transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {position.description}
                </p>
                <button className="text-[#D71C1C] font-semibold text-sm group-hover:gap-2 transition-all flex items-center">
                  Postuler maintenant
                  <span className="ml-1">→</span>
                </button>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#D71C1C]/10 border border-[#D71C1C]/20 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-black mb-3">
              Ne Voyez Pas le Poste Parfait?
            </h3>
            <p className="text-gray-700 mb-6">
              Envoyez-nous votre CV et parlons-nous de vos aspirations
              professionnelles. Nous adorerions vous connaître!
            </p>
            <button className="bg-[#D71C1C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#B01818] transition-colors">
              Soumettre un CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrieres;
