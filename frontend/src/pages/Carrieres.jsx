import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Users,
  Loader2,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Award,
  Inbox,
  BarChart3,
  Code2,
  MessageCircle,
  Palette,
  Wrench,
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="col-span-full flex flex-col items-center justify-center py-20"
  >
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6"
    >
      <Briefcase className="w-12 h-12 text-white/60" />
    </motion.div>
    <h3 className="text-2xl font-bold text-white mb-2">
      Aucun poste ouvert pour le moment
    </h3>
    <p className="text-white/80 text-center max-w-md">
      Nous n'avons pas de postes ouverts actuellement, mais nous sommes toujours
      à la recherche de talents. Envoyez-nous votre CV!
    </p>
  </motion.div>
);

const LoadingState = () => (
  <div className="col-span-full flex items-center justify-center py-20">
    <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
  </div>
);

const typeLabels = {
  'temps-plein': 'Temps plein',
  'temps-partiel': 'Temps partiel',
  contrat: 'Contrat',
  stage: 'Stage',
};

const Carrieres = () => {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/careers/categories`);
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        }
      } catch {
        // silent fail
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      setError(null);
      try {
        const params =
          selectedCategory !== 'all'
            ? `?category=${encodeURIComponent(selectedCategory)}`
            : '';
        const res = await fetch(`${API_URL}/careers${params}`);
        const data = await res.json();
        if (res.ok) {
          setCareers(data.careers || []);
        } else {
          setError(data.message || 'Erreur lors du chargement');
        }
      } catch {
        setError('Impossible de charger les postes');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
              <h1 className="text-5xl md:text-6xl font-bold text-black">
                Rejoignez Notre Équipe
              </h1>
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Nous construisons une équipe de talents exceptionnels passionnés
              par la prospection commerciale et la création de résultats
              mesurables. Devenez part de notre révolution.
            </p>
          </motion.div>

          {/* Why Join Us - 3 Column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: TrendingUp,
                title: 'Croissance Rapide',
                description:
                  "Soyez part d'une startup en croissance exponentielle avec d'énormes opportunités d'avancement",
              },
              {
                icon: Target,
                title: 'Impact Direct',
                description:
                  'Voyez directement le résultat de votre travail et contribuez aux succès de nos clients',
              },
              {
                icon: Zap,
                title: 'Culture Dynamique',
                description:
                  'Travaillez avec une équipe jeune, motivée et toujours prête à innover',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
              >
                <item.icon className="w-12 h-12 text-[#D71C1C] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Métiers */}
      <section className="bg-[#D71C1C] py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Carrières</h2>
            <p className="text-lg text-white/80">
              Découvrez les rôles clés qui composent notre équipe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Responsable Marketing',
                mission:
                  "Piloter les stratégies de positionnement et de rayonnement pour accroître la notoriété des marques partenaires. Orchestrer les campagnes d'influence et analyser les indicateurs de performance pour garantir une croissance optimale.",
                tools:
                  'Google Analytics, SEMrush/Ahrefs, HubSpot/Salesforce, Meta Ads Manager, LinkedIn Campaign Manager.',
              },
              {
                icon: Code2,
                title: 'Développeur Web',
                mission:
                  "Concevoir et optimiser des plateformes digitales performantes servant de vitrines technologiques à l'expertise de nos clients. Assurer une expérience utilisateur fluide et sécurisée tout en intégrant les outils d'avant-garde nécessaires.",
                tools:
                  'WordPress/Elementor, JavaScript (React/Vue), PHP/MySQL, GitHub, outils de SEO technique (Screaming Frog).',
              },
              {
                icon: MessageCircle,
                title: 'Community Manager',
                mission:
                  "Fédérer et animer des communautés actives sur les réseaux sociaux pour renforcer l'engagement et la proximité avec l'audience cible. Assurer une veille stratégique et produire des interactions dynamiques qui valorisent l'image de marque.",
                tools:
                  'Agorapulse/Hootsuite, Canva/CapCut, Metricool, Business Suite (Meta), outils de veille (Mention/Google Alerts).',
              },
              {
                icon: Palette,
                title: 'Graphiste',
                mission:
                  "Traduire des concepts stratégiques en univers visuels percutants et mémorables pour assoir l'autorité visuelle de nos partenaires. Créer des supports variés alliant esthétisme et efficacité pour captiver l'attention.",
                tools:
                  'Adobe Creative Cloud (Photoshop, Illustrator, InDesign), Figma, After Effects (pour le motion design de base).',
              },
            ].map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white border-2 border-white rounded-xl p-8 hover:border-black/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-[#D71C1C]/10 flex items-center justify-center group-hover:bg-[#D71C1C] transition-colors">
                    <role.icon className="w-7 h-7 text-[#D71C1C] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-black">{role.title}</h3>
                </div>
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-[#D71C1C] uppercase tracking-wider mb-2">
                    Missions
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {role.mission}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-[#D71C1C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-gray-800">
                      Outils clés :{' '}
                    </span>
                    <span className="text-sm text-gray-600">{role.tools}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-black text-center mb-16"
          >
            Ce Que Nous Offrons
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Salaire Compétitif',
                description:
                  "Rémunération basée sur l'expérience et la performance",
              },
              {
                icon: CheckCircle,
                title: 'Assurances Complètes',
                description: 'Couverture santé, dentaire, vision et vie',
              },
              {
                icon: TrendingUp,
                title: 'Bonus & Commissions',
                description: 'Récompenses généreuses basées sur vos résultats',
              },
              {
                icon: Zap,
                title: 'Formation Continue',
                description: 'Investissement constant dans votre développement',
              },
              {
                icon: Users,
                title: 'Culture Inclusive',
                description: 'Environnement diversifié et inclusif pour tous',
              },
              {
                icon: Target,
                title: 'Flexibilité de Travail',
                description: 'Options de télétravail et horaires flexibles',
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all"
              >
                <benefit.icon className="w-10 h-10 text-[#D71C1C] mb-4" />
                <h3 className="text-lg font-bold text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 px-4 bg-[#D71C1C]">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Postes Ouverts
          </motion.h2>

          {error && (
            <div className="text-center py-8 text-white text-lg bg-white/20 rounded-lg">
              {error}
            </div>
          )}

          {/* Category filter */}
          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-white text-[#D71C1C] shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-white text-[#D71C1C] shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          )}

          {loading ? (
            <LoadingState />
          ) : careers.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {careers.map((position, index) => (
                <motion.div
                  key={position._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white border-2 border-white rounded-xl p-8 hover:border-black/20 hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black group-hover:text-[#D71C1C] transition-colors mb-4">
                        {position.title}
                      </h3>

                      <div className="flex flex-wrap gap-4 mb-6">
                        {position.category && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#D71C1C]">
                            {position.category}
                          </span>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-5 h-5 text-[#D71C1C]" />
                          <span className="font-medium">
                            {position.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Briefcase className="w-5 h-5 text-[#D71C1C]" />
                          <span className="font-medium">
                            {typeLabels[position.type] || position.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
                        {position.description}
                      </p>

                      {position.salary?.isVisible &&
                        (position.salary.min || position.salary.max) && (
                          <p className="text-[#D71C1C] font-semibold mb-4">
                            💰{' '}
                            {position.salary.min && position.salary.max
                              ? `${position.salary.min.toLocaleString()} $ - ${position.salary.max.toLocaleString()} $`
                              : position.salary.min
                                ? `À partir de ${position.salary.min.toLocaleString()} $`
                                : `Jusqu'à ${position.salary.max.toLocaleString()} $`}
                          </p>
                        )}
                    </div>

                    <Link
                      to={`/carrieres/${position.slug}`}
                      className="bg-[#D71C1C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#B01818] transition-all whitespace-nowrap self-start md:self-center inline-block text-center"
                    >
                      Postuler
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à Changer Votre Carrière?
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Que vous trouviez un poste qui vous plaît ou que vous ayez une
              candidature spontanée, nous aimerions vous connaître.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#D71C1C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#B01818] transition-all">
                Envoyer un CV
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-all">
                Nous Contacter
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ or Stats */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-black text-center mb-12"
          >
            Pourquoi LeadGenBooster?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: 'Nombreux', label: 'Clients Satisfaits' },
              { number: 'Très élevée', label: 'Rétention du Personnel' },
              { number: 'Expert', label: 'Leader du Marché' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#D71C1C] mb-3">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carrieres;
