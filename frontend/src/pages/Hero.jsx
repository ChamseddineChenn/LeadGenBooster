// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Target, TrendingUp, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pb-16 md:pb-24 bg-[#F5F7FA] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="pt-16 "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-[#E10C14]/10 text-[#E10C14] font-semibold px-4 py-2 rounded-full mb-6">
              <Target className="w-4 h-4" />
              <span>Spécialistes en prospection commerciale</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] leading-tight mb-6">
              Convertissez vos prospects en clients, sans recruter de personnel.
            </h1>

            <p className="text-xl text-[#6D7280] mb-8 leading-relaxed">
              Nous offrons des services de prospection téléphonique,
              qualification de leads et prise de rendez-vous adaptés à votre
              marché.
            </p>

            <p className="text-lg text-[#222222] mb-10">
              Nous contactons vos listes de prospects ou créons une base ciblée
              pour générer des clients qualifiés.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#E10C14] text-white font-semibold rounded-lg hover:bg-[#C00A11] transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Demander un devis</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-white border-2 border-[#000000] text-[#000000] font-semibold rounded-lg hover:bg-[#000000]/5 transition-all duration-200 shadow-sm text-center"
              >
                Voir nos services
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#E10C14]/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#E10C14]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#000000]">
                    Volume élevé
                  </div>
                  <div className="text-[#6D7280]">d'appels qualifiés</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#000000]/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#000000]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#000000]">
                    Excellent
                  </div>
                  <div className="text-[#6D7280]">Taux de conversion</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {/* CRM Dashboard Illustration */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#000000]">
                    Tableau de bord CRM
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#E10C14] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#000000] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#6D7280] rounded-full"></div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      label: 'Leads qualifiés',
                      value: '●●●',
                      color: '#E10C14',
                    },
                    { label: 'Rendez-vous', value: '●●', color: '#000000' },
                    { label: 'Contacts', value: '●●●', color: '#6D7280' },
                    { label: 'Taux réponse', value: '▲▲', color: '#E10C14' },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="bg-[#F5F7FA] rounded-xl p-4 text-center"
                    >
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: metric.color }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-sm text-[#6D7280]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call Activity Graph */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-[#6D7280]">
                    <span>Activité d'appels</span>
                    <span>Cette semaine</span>
                  </div>
                  <div className="flex items-end space-x-2 h-24">
                    {[40, 65, 80, 60, 90, 70, 85].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-linear-to-t from-[#E10C14] to-[#E10C14]/70 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-linear-to-r from-[#000000] to-[#E10C14] rounded-xl p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">
                      Agent dédié à votre projet
                    </h4>
                    <p className="text-white/80">
                      Spécialiste formé à votre secteur d'activité
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-[#FF9B42]/10 rounded-full"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#1CA7A6]/10 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
