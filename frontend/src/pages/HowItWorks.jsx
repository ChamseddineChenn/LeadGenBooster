// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Search,
  Settings,
  PhoneCall,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Analyse & ciblage',
      description:
        "Définition d'audience, scripts et argumentaire personnalisés pour votre marché.",
      color: '#000000',
    },
    {
      number: '02',
      icon: Settings,
      title: 'Mise en place',
      description:
        'Ligne dédiée, intégration CRM, formation des agents à votre marque et produits.',
      color: '#E10C14',
    },
    {
      number: '03',
      icon: PhoneCall,
      title: 'Campagne & suivi',
      description:
        'Appels qualifiés, relances stratégiques et optimisation continue des performances.',
      color: '#000000',
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Rapport & résultats',
      description:
        'Dashboard complet avec KPI, insights et recommandations stratégiques mensuelles.',
      color: '#E10C14',
    },
  ];

  return (
    <section id="processus" className="py-20 bg-[#F5F7FA]">
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
            Notre méthode en 4 étapes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="paragraph-lg max-w-3xl mx-auto"
          >
            Un processus structuré pour garantir des résultats mesurables et
            durables
          </motion.p>
        </div>

        {/* Desktop Timeline (horizontal) */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-0 right-0 top-12 h-0.5 bg-[#E10C14]/20 z-0"></div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative">
                    {/* Step Circle */}
                    <div
                      className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-8 border-white shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full border-4 border-[#F5F7FA] flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-[#0A2846]">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A2846] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[#6D7280]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline (vertical) */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E10C14]/20"></div>

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                {/* Step Circle */}
                <div
                  className="absolute -left-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="ml-8">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-bold text-[#0A2846] mr-3">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-bold text-[#0A2846]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-[#6D7280]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="btn-primary inline-flex items-center group">
            <span>Démarrer votre projet</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
