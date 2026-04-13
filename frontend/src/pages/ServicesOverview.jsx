// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Calendar,
  Target,
  RefreshCw,
  BarChart,
  ChevronRight,
  Phone,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

const ServicesOverview = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      icon: Calendar,
      title: 'Prise de rendez-vous',
      shortDescription:
        'Nous contactons vos prospects et planifions des rendez-vous qualifiés pour vos équipes commerciales.',
      details: [
        'Contact systématique de votre base de prospects',
        'Qualification selon vos critères spécifiques',
        'Planification directe dans votre agenda',
        'Rapport détaillé des rendez-vous confirmés',
        'Suivi post-rendez-vous inclus',
      ],
      metrics: 'Rendement élevé',
      color: '#E10C14',
      hoverColor: '#000000',
      iconColor: '#FFFFFF',
    },
    {
      id: 2,
      icon: Target,
      title: 'Qualification & prospection',
      shortDescription:
        'Qualification des listes prospect, enrichissement de données, segmentation et relances.',
      details: [
        'Nettoyage et enrichissement de vos bases de données',
        'Segmentation selon votre marché cible',
        'Double qualification (BANT méthodology)',
        'Relances stratégiques automatisées',
        'Intégration CRM en temps réel',
      ],
      metrics: 'Qualification rigoureuse',
      color: '#000000',
      hoverColor: '#E10C14',
      iconColor: '#FFFFFF',
    },
    {
      id: 3,
      icon: RefreshCw,
      title: 'Relance clients & renouvellements',
      shortDescription:
        "Réactivation d'anciens clients, renouvellement d'abonnements ou adhésions.",
      details: [
        'Identification des clients inactifs',
        'Stratégie de réactivation personnalisée',
        'Gestion complète des renouvellements',
        'Négociation des taux de rétention',
        'Programme de fidélisation intégré',
      ],
      metrics: 'Forte réactivation',
      color: '#E10C14',
      hoverColor: '#000000',
      iconColor: '#FFFFFF',
    },
    {
      id: 4,
      icon: BarChart,
      title: 'Sondages & collecte de données',
      shortDescription:
        'Appels structurés pour obtenir insights, feedback ou données marketing.',
      details: [
        'Questionnaires personnalisés',
        'Collecte de données qualitatives et quantitatives',
        'Analyse statistique approfondie',
        "Rapports d'insights actionnables",
        "Intégration avec vos outils d'analyse",
      ],
      metrics: 'Large volume de répondants',
      color: '#000000',
      hoverColor: '#E10C14',
      iconColor: '#FFFFFF',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const detailsVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
    },
    show: {
      opacity: 1,
      height: 'auto',
      marginTop: '1.5rem',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Nos services clés en main</h2>
          <p className="paragraph-lg max-w-3xl mx-auto">
            Des solutions téléphoniques complètes pour accélérer votre
            croissance commerciale
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
                hover: {
                  y: -10,
                  scale: 1.02,
                  zIndex: 10,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  },
                },
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover="hover"
              className="relative group"
            >
              {/* Desktop Card */}
              <div className="hidden lg:block">
                <motion.div
                  className="rounded-2xl shadow-lg cursor-pointer transition-all duration-300 overflow-hidden relative"
                  style={{
                    backgroundColor:
                      hoveredCard === service.id ? service.hoverColor : 'white',
                    color: hoveredCard === service.id ? 'white' : 'inherit',
                    minHeight: hoveredCard === service.id ? '480px' : '360px',
                    height: hoveredCard === service.id ? 'auto' : '360px',
                    transition:
                      'background-color 0.5s ease, color 0.3s ease, min-height 0.4s ease, height 0.4s ease',
                  }}
                >
                  {/* Decorative Corner */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-10 transition-colors duration-300"
                    style={{
                      backgroundColor:
                        hoveredCard === service.id ? 'white' : service.color,
                      borderBottomLeftRadius: '100%',
                    }}
                  />

                  <div className="p-8 relative z-10">
                    {/* Icon with Transition */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        backgroundColor:
                          hoveredCard === service.id
                            ? service.iconColor
                            : `${service.color}15`,
                        transition: 'background-color 0.4s ease',
                      }}
                      animate={{
                        rotate: hoveredCard === service.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon
                        className="w-8 h-8 transition-colors duration-300"
                        style={{
                          color:
                            hoveredCard === service.id
                              ? service.hoverColor
                              : service.color,
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-4 transition-colors duration-300"
                      style={{
                        color: hoveredCard === service.id ? 'white' : '#0A2846',
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p
                      className="mb-6 transition-colors duration-300"
                      style={{
                        color:
                          hoveredCard === service.id
                            ? 'rgba(255, 255, 255, 0.9)'
                            : '#6D7280',
                      }}
                    >
                      {service.shortDescription}
                    </p>

                    {/* Always visible on desktop, but expanded on hover */}
                    <AnimatePresence>
                      {hoveredCard === service.id && (
                        <motion.div
                          variants={detailsVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          {/* Metric Badge */}
                          <div
                            className="inline-flex items-center px-4 py-2 rounded-full mb-4 transition-colors duration-300"
                            style={{
                              backgroundColor:
                                hoveredCard === service.id
                                  ? 'rgba(255, 255, 255, 0.2)'
                                  : 'transparent',
                            }}
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span className="text-sm font-semibold">
                              {service.metrics}
                            </span>
                          </div>

                          {/* Details List */}
                          <ul className="space-y-3 mb-6">
                            {service.details.map((detail, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                                <span className="text-sm opacity-90">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Call to Action */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
                            style={{
                              color:
                                hoveredCard === service.id
                                  ? service.hoverColor
                                  : '#222222',
                            }}
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            <span>Demander une démo</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Arrow Indicator */}
                    <motion.div
                      className="absolute bottom-6 right-6"
                      style={{
                        color: hoveredCard === service.id ? 'white' : '#1CA7A6',
                      }}
                      animate={{
                        rotate: hoveredCard === service.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.div>
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 pointer-events-none rounded-2xl"
                    style={{ borderColor: service.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === service.id ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Mobile Card */}
              <div className="lg:hidden">
                <motion.div
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="rounded-2xl shadow-lg cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor:
                      hoveredCard === service.id ? service.hoverColor : 'white',
                    color: hoveredCard === service.id ? 'white' : 'inherit',
                    minHeight: hoveredCard === service.id ? '420px' : 'auto',
                    transition: 'background-color 0.5s ease, color 0.3s ease',
                  }}
                >
                  {/* Decorative Corner */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-10 transition-colors duration-300"
                    style={{
                      backgroundColor:
                        hoveredCard === service.id ? 'white' : service.color,
                      borderBottomLeftRadius: '100%',
                    }}
                  />

                  <div className="p-8 relative z-10">
                    {/* Icon with Transition */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        backgroundColor:
                          hoveredCard === service.id
                            ? service.iconColor
                            : `${service.color}15`,
                        transition: 'background-color 0.4s ease',
                      }}
                      animate={{
                        rotate: hoveredCard === service.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon
                        className="w-8 h-8 transition-colors duration-300"
                        style={{
                          color:
                            hoveredCard === service.id
                              ? service.hoverColor
                              : service.color,
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-4 transition-colors duration-300"
                      style={{
                        color: hoveredCard === service.id ? 'white' : '#0A2846',
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p
                      className="mb-6 transition-colors duration-300"
                      style={{
                        color:
                          hoveredCard === service.id
                            ? 'rgba(255, 255, 255, 0.9)'
                            : '#6D7280',
                      }}
                    >
                      {service.shortDescription}
                    </p>

                    {/* Details Section with Animation */}
                    <AnimatePresence>
                      {hoveredCard === service.id && (
                        <motion.div
                          variants={detailsVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          {/* Metric Badge */}
                          <div
                            className="inline-flex items-center px-4 py-2 rounded-full mb-4 transition-colors duration-300"
                            style={{
                              backgroundColor:
                                hoveredCard === service.id
                                  ? 'rgba(255, 255, 255, 0.2)'
                                  : 'transparent',
                            }}
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span className="text-sm font-semibold">
                              {service.metrics}
                            </span>
                          </div>

                          {/* Details List */}
                          <ul className="space-y-3 mb-6">
                            {service.details.map((detail, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                                <span className="text-sm opacity-90">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Call to Action */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
                            style={{
                              color:
                                hoveredCard === service.id
                                  ? service.hoverColor
                                  : '#222222',
                            }}
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            <span>Demander une démo</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Arrow Indicator */}
                    <motion.div
                      className="absolute bottom-6 right-6"
                      style={{
                        color: hoveredCard === service.id ? 'white' : '#1CA7A6',
                      }}
                      animate={{
                        rotate: hoveredCard === service.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.div>
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 pointer-events-none rounded-2xl"
                    style={{ borderColor: service.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === service.id ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="btn-outline inline-flex items-center group">
            <span>Voir tous nos services</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-linear-to-r from-[#000000] to-[#E10C14] rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Excellente</div>
              <div className="text-white/80">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Continu</div>
              <div className="text-white/80">Support disponible</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Rapide</div>
              <div className="text-white/80">Déploiement garanti</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
