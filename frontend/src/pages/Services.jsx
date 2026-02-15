import React from 'react';
import * as assets from '../assets/assets';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: assets.strategieIcon,
      title: 'Stratégie de Visibilité & Marketing',
      description:
        'Nous créons une stratégie personnalisée pour augmenter votre visibilité commerciale et atteindre vos objectifs de croissance.',
      features: ['Audit stratégique', 'Plan marketingn', 'Audience targeting'],
    },
    {
      icon: assets.partenaireIcon,
      title: 'Partenariats & Relations B2B',
      description:
        'Développez des partenariats strategic et des relations B2B durables pour étendre votre réseau commercial.',
      features: ['Prospection ciblée', 'Relation management', 'Networking'],
    },
    {
      icon: assets.croissanceIcon,
      title: 'Croissance & Optimisation',
      description:
        'Optimisez vos processus et accélérez votre croissance avec nos solutions éprouvées et mesurables.',
      features: ['KPI tracking', 'Process optimization', 'ROI maximization'],
    },
    {
      icon: assets.strategieIcon,
      title: 'Prise de Rendez-vous Qualifiés',
      description:
        'Nos équipes qualifiées prennent rendez-vous avec des prospects de haute qualité pour votre équipe commerciale.',
      features: ['Lead qualification', 'Appointment setting', 'Follow-up'],
    },
    {
      icon: assets.partenaireIcon,
      title: 'Prospection Téléphonique',
      description:
        'Campagnes de prospection téléphonique ciblées et personnalisées pour générer des leads qualifiés.',
      features: ['Cold calling', 'Script development', 'Conversion tracking'],
    },
    {
      icon: assets.croissanceIcon,
      title: 'Relance Clients',
      description:
        'Réactivez vos clients dormants et fidélisez votre base existante avec notre stratégie de relance éprouvée.',
      features: ['Customer reactivation', 'Loyalty programs', 'Retention'],
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Nos Services
            </h1>
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services conçus pour propulser
            votre croissance commerciale et atteindre vos objectifs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-[#D71C1C] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 bg-[#D71C1C] rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="text-[#D71C1C] font-semibold flex items-center group-hover:gap-2 transition-all">
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#D71C1C] text-white py-16 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre croissance?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Contactez-nous aujourd'hui pour discuter de vos besoins spécifiques
            et découvrir comment nous pouvons vous aider.
          </p>
          <button className="bg-white text-[#D71C1C] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Obtenir un devis gratuit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
