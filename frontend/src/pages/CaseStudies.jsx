// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Quote,
  Target,
  Settings,
  TrendingUp,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const caseStudies = [
    {
      id: 1,
      client: 'Cabinet Immobilier XYZ',
      quote: 'Nous avons doublé nos rendez-vous en 3 semaines.',
      context:
        'Le cabinet cherchait à étendre sa clientèle dans le marché résidentiel de Montréal.',
      objective:
        'Générer 15 rendez-vous qualifiés par mois pour les agents immobiliers.',
      actions: [
        'Campagne de prospection téléphonique ciblée',
        'Qualification selon le budget et localisation',
        'Planification directe dans les agendas des agents',
        'Relance systématique des leads chauds',
      ],
      results: [
        { metric: '30 rendez-vous', label: 'soit +100% vs objectif' },
        {
          metric: '68% de taux de contact',
          label: 'Performance exceptionnelle',
        },
        { metric: '42% de conversion', label: 'Leads vers rendez-vous' },
        { metric: '3,5x ROI', label: 'Retour sur investissement' },
      ],
      duration: '3 semaines',
      industry: 'Immobilier',
      color: '#E10C14',
    },
    {
      id: 2,
      client: 'Assureur Pro Assurance',
      quote:
        'Notre taux de renouvellement a augmenté de 40% grâce à LeadGen Booster.',
      context:
        'Déclin des renouvellements et faible engagement des clients existants.',
      objective:
        'Améliorer le taux de rétention de 15% et fidéliser la clientèle existante.',
      actions: [
        'Programme de relance clients avant expiration',
        'Enquête de satisfaction post-renouvellement',
        'Offres personnalisées selon le profil client',
        'Support téléphonique dédié',
      ],
      results: [
        { metric: "40% d'augmentation", label: 'taux de renouvellement' },
        { metric: '92% de satisfaction', label: 'clients contactés' },
        { metric: '25% de ventes additionnelles', label: 'produits croisés' },
        { metric: '4,2x ROI', label: 'Retour sur investissement' },
      ],
      duration: '2 mois',
      industry: 'Assurances',
      color: '#000000',
    },
    {
      id: 3,
      client: 'Clinique Médicale ABC',
      quote: 'Nous avons comblé 80% de nos créneaux vacants en 4 semaines.',
      context:
        'Faible taux de remplissage des nouveaux créneaux de consultation.',
      objective: 'Remplir 50% des créneaux vacants avec des nouveaux patients.',
      actions: [
        'Contact de patients potentiels dans la région',
        'Présentation des spécialités de la clinique',
        'Planification directe des rendez-vous',
        'Rappel automatique 48h avant consultation',
      ],
      results: [
        { metric: '80% de remplissage', label: 'créneaux vacants comblés' },
        { metric: '150 nouveaux patients', label: 'acquis en 4 semaines' },
        { metric: '95% de taux de présence', label: 'aux rendez-vous fixés' },
        { metric: '5x ROI', label: 'Retour sur investissement' },
      ],
      duration: '4 semaines',
      industry: 'Médical',
      color: '#E10C14',
    },
  ];

  const currentCase = caseStudies[currentIndex];

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length,
    );
  };

  return (
    <section id="cas-client" className="py-20 bg-[#F5F7FA]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            Nos réussites clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="paragraph-lg max-w-3xl mx-auto"
          >
            Des résultats concrets mesurés par nos clients
          </motion.p>
        </div>

        {/* Main Case Study Card */}
        <motion.div
          key={currentCase.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-elevation overflow-hidden mb-12"
        >
          {/* Quote Header */}
          <div
            className="p-8 md:p-12 text-white"
            style={{ backgroundColor: currentCase.color }}
          >
            <Quote className="w-12 h-12 mb-6 opacity-80" />
            <blockquote className="text-2xl md:text-3xl font-bold mb-6">
              "{currentCase.quote}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold">{currentCase.client}</div>
                <div className="opacity-90">
                  {currentCase.industry} • {currentCase.duration}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={prevCase}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextCase}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Case Study Details */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin
                    className="w-6 h-6 mr-3"
                    style={{ color: currentCase.color }}
                  />
                  <h3 className="text-lg font-bold text-[#0A2846]">
                    📍 Contexte
                  </h3>
                </div>
                <p className="text-[#6D7280]">{currentCase.context}</p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Target
                    className="w-6 h-6 mr-3"
                    style={{ color: currentCase.color }}
                  />
                  <h3 className="text-lg font-bold text-[#0A2846]">
                    🎯 Objectif
                  </h3>
                </div>
                <p className="text-[#6D7280]">{currentCase.objective}</p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Settings
                    className="w-6 h-6 mr-3"
                    style={{ color: currentCase.color }}
                  />
                  <h3 className="text-lg font-bold text-[#0A2846]">
                    ⚙️ Actions
                  </h3>
                </div>
                <ul className="space-y-2">
                  {currentCase.actions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3"
                        style={{ backgroundColor: currentCase.color }}
                      />
                      <span className="text-[#6D7280]">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <TrendingUp
                    className="w-6 h-6 mr-3"
                    style={{ color: currentCase.color }}
                  />
                  <h3 className="text-lg font-bold text-[#0A2846]">
                    📈 Résultats
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {currentCase.results.map((result, index) => (
                    <div key={index} className="bg-[#F5F7FA] rounded-lg p-3">
                      <div className="font-bold text-[#0A2846]">
                        {result.metric}
                      </div>
                      <div className="text-xs text-[#6D7280]">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="border-t border-gray-100 pt-8">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    icon: Calendar,
                    label: 'Durée',
                    value: currentCase.duration,
                  },
                  { icon: Users, label: 'Client', value: currentCase.client },
                  {
                    icon: Target,
                    label: 'Secteur',
                    value: currentCase.industry,
                  },
                  {
                    icon: DollarSign,
                    label: 'ROI moyen',
                    value: currentCase.results[3].metric,
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon
                      className="w-8 h-8 mx-auto mb-3"
                      style={{ color: currentCase.color }}
                    />
                    <div className="text-sm text-[#6D7280] mb-1">
                      {stat.label}
                    </div>
                    <div className="font-bold text-[#0A2846]">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Studies Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Dots Navigation */}
          <div className="flex space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-[#1CA7A6]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Voir l'étude de cas ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center md:text-right">
            <p className="text-[#6D7280] mb-4">
              Vous voulez des résultats similaires ?
            </p>
            <button className="btn-primary">
              Réserver un diagnostic gratuit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
