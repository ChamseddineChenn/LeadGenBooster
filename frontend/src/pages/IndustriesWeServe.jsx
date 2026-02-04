// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  const [performanceWidths, setPerformanceWidths] = useState([]);
  const hasGenerated = useRef(false);

  const industries = [
    {
      icon: Building2,
      name: 'Services financiers',
      description: 'Banques, institutions financières et sociétés de courtage',
      clients: '15+ clients',
      color: '#000000',
    },
    {
      icon: Home,
      name: 'Immobilier',
      description: 'Agences immobilières, promoteurs et gestionnaires de biens',
      clients: '28+ clients',
      color: '#E10C14',
    },
    {
      icon: Shield,
      name: 'Assurances',
      description: "Courtiers, assureurs et sociétés de services d'assurance",
      clients: '22+ clients',
      color: '#000000',
    },
    {
      icon: Stethoscope,
      name: 'Médical / paramédical',
      description: 'Cliniques, cabinets médicaux et laboratoires de santé',
      clients: '18+ clients',
      color: '#E10C14',
    },
    {
      icon: GraduationCap,
      name: 'Formation & coaching',
      description: 'Centres de formation, écoles et coachs professionnels',
      clients: '14+ clients',
      color: '#000000',
    },
    {
      icon: Users,
      name: 'Associations & ONG',
      description:
        'Organismes à but non lucratif et associations professionnelles',
      clients: '12+ clients',
      color: '#E10C14',
    },
  ];

  // Use setTimeout to defer the random generation
  useEffect(() => {
    if (!hasGenerated.current) {
      const timeoutId = setTimeout(() => {
        const widths = industries.map(() => Math.random() * 30 + 60);
        setPerformanceWidths(widths);
        hasGenerated.current = true;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [industries.length]);

  // Alternative: Use fixed values instead of random
  // const performanceWidths = [78, 85, 72, 88, 65, 70];

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
    <section id="industries" className="py-20 bg-[#F5F7FA]">
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
            Secteurs d'activité que nous servons
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="paragraph-lg max-w-3xl mx-auto"
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
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-elevation transition-all duration-300 cursor-pointer group"
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#F5F7FA] text-[#0A2846]">
                      {industry.clients}
                    </span>
                    <div className="flex items-center text-[#1CA7A6] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm mr-2">
                        Voir les études de cas
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-[#6D7280] mb-2">
                  <span>Performance moyenne</span>
                  <span className="font-medium text-[#1CA7A6]">+42%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  {performanceWidths.length > 0 ? (
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: industry.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${performanceWidths[index]}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  ) : (
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: industry.color,
                        width: '0%',
                      }}
                    />
                  )}
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
              <button className="btn-outline">Consulter un expert</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
