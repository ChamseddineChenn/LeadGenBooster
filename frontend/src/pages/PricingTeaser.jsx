// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  BarChart,
  Users,
  Clock,
} from 'lucide-react';

const PricingTeaser = () => {
  const plans = [
    {
      name: 'Campagnes ponctuelles',
      price: 'À partir de 1 500 CAD',
      period: 'par campagne',
      description: 'Idéal pour tester une approche ou lancer une offre limitée',
      features: [
        'Base de 500 contacts',
        'Campagne de 2 semaines',
        'Tableau de bord inclus',
        "Rapport d'analyse",
      ],
      color: '#000000',
      popular: false,
    },
    {
      name: 'Engagement mensuel',
      price: 'À partir de 2 800 CAD',
      period: 'par mois',
      description: 'Solution complète pour une croissance régulière',
      features: [
        'Base de 1 000 contacts/mois',
        'Appels illimités',
        'Intégration CRM',
        'Agent dédié',
        'Rapports hebdomadaires',
      ],
      color: '#E10C14',
      popular: true,
    },
    {
      name: 'Solution sur mesure',
      price: 'Devis personnalisé',
      period: 'selon vos besoins',
      description: 'Package adapté aux entreprises avec volumes élevés',
      features: [
        'Base de données personnalisée',
        'Équipe dédiée',
        'Intégration avancée',
        'Analytics premium',
        'Support prioritaire',
      ],
      color: '#000000',
      popular: false,
    },
  ];

  return (
    <section id="tarifs" className="py-20 bg-white">
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
            Des solutions adaptées à votre budget
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="paragraph-lg max-w-3xl mx-auto"
          >
            Des tarifs transparents, sans engagement caché
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-2xl shadow-soft hover:shadow-elevation transition-all duration-300 p-8 ${
                plan.popular ? 'ring-2 ring-[#E10C14]' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#E10C14] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Le plus populaire
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#000000] mb-4">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                  </span>
                </div>
                <div className="text-[#6D7280]">{plan.period}</div>
              </div>

              {/* Plan Description */}
              <p className="text-[#6D7280] text-center mb-8">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-[#000000] mb-4">
                  Ce qui est inclus :
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle
                        className="w-5 h-5 mr-3 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      <span className="text-[#222222]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[#FF9B42] text-white hover:bg-[#FF8B2E]'
                    : 'border-2 border-[#1CA7A6] text-[#1CA7A6] hover:bg-[#1CA7A6] hover:text-white'
                }`}
              >
                {plan.name === 'Solution sur mesure'
                  ? 'Demander un devis'
                  : 'Commencer maintenant'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-[#0A2846] to-[#1CA7A6] rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, text: 'Campagnes à tarif compétitif' },
              { icon: Calendar, text: 'Plans mensuels disponibles' },
              { icon: BarChart, text: 'ROI mesurable rapidement' },
              { icon: Clock, text: 'Mise en place rapide' },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <h3 className="text-2xl font-bold mb-4">
              Pas sûr de quel plan choisir ?
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Nos experts analysent vos besoins gratuitement et vous
              recommandent la solution la plus adaptée à vos objectifs.
            </p>
            <button className="btn-primary bg-white text-[#0A2846] hover:bg-gray-100">
              <Users className="w-5 h-5 mr-2" />
              Obtenir une estimation gratuite
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTeaser;
