// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  Home,
  Shield,
  Stethoscope,
  GraduationCap,
  Users,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

const IndustriesWeServe = () => {
  const industries = [
    {
      icon: Building2,
      name: 'Services financiers',
      description: 'Banques, institutions financières et sociétés de courtage',
      color: '#000000',
    },
    {
      icon: Home,
      name: 'Immobilier',
      description: 'Agences immobilières, promoteurs et gestionnaires de biens',
      color: '#E10C14',
    },
    {
      icon: Shield,
      name: 'Assurances',
      description: "Courtiers, assureurs et sociétés de services d'assurance",
      color: '#000000',
    },
    {
      icon: Stethoscope,
      name: 'Médical / paramédical',
      description: 'Cliniques, cabinets médicaux et laboratoires de santé',
      color: '#E10C14',
    },
    {
      icon: GraduationCap,
      name: 'Formation & coaching',
      description: 'Centres de formation, écoles et coachs professionnels',
      color: '#000000',
    },
    {
      icon: Users,
      name: 'Associations & ONG',
      description:
        'Organismes à but non lucratif et associations professionnelles',
      color: '#E10C14',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="industries" className="py-20 bg-black">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-2 mb-4 text-white"
          >
            Secteurs d'activité que nous servons
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="paragraph-lg max-w-3xl mx-auto text-gray-400!"
          >
            Une expertise adaptée aux spécificités de chaque industrie
          </motion.p>
        </div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-elevation transition-all duration-300 group"
            >
              <div className="flex items-start space-x-6">
                {/* Industry Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${industry.color}15` }}
                >
                  <industry.icon
                    className="w-8 h-8"
                    style={{ color: industry.color }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-[#0A2846] mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-[#6D7280] mb-4">{industry.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-white rounded-2xl p-8 shadow-soft max-w-2xl mx-auto">
            <TrendingUp className="w-12 h-12 text-[#1CA7A6] mr-6" />
            <div className="text-left">
              <h4 className="text-xl font-bold text-[#0A2846] mb-2">
                Votre secteur n'est pas listé ?
              </h4>
              <p className="text-[#6D7280] mb-4">
                Nos experts adaptent leurs méthodes à vos besoins spécifiques.
                Contactez-nous pour une analyse gratuite.
              </p>
              <Link to="/contact" className="btn-outline">
                Consulter un expert
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
