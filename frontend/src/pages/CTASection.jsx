// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Phone,
  Calendar,
  ChevronRight,
  Target,
  CheckCircle,
} from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-linear-to-r from-[#000000] to-[#E10C14] text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Decorative Elements */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-12 h-12" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 border-2 border-white/30 rounded-full"
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à démarrer ?
            </h2>

            {/* Description */}
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Discutons de votre projet et voyons si nous sommes le bon
              partenaire.
            </p>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                'Diagnostic gratuit',
                'Proposition sur mesure',
                'Démarrage rapide',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-[#E10C14]" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#000000] px-10 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center group"
              onClick={() =>
                window.dispatchEvent(new Event('openBookingModal'))
              }
            >
              <Calendar className="w-6 h-6 mr-3" />
              <span>Réserver un appel</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {/* Secondary Text */}
            <p className="text-white/70 mt-8 text-sm">
              Aucun engagement • Première consultation gratuite • Réponse rapide
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 'Très élevé', label: 'Taux de satisfaction' },
                { value: 'Efficace', label: 'Mise en place' },
                { value: 'Rapide', label: 'Temps de réponse' },
                { value: 'Gratuit', label: 'Appel de diagnostic' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
