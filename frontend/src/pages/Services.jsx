import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Palette,
  Globe,
  Share2,
  PenTool,
  Target,
  CalendarCheck,
  RefreshCw,
  GraduationCap,
  Sparkles,
  Zap,
  ChevronRight,
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const communicationServices = [
  {
    icon: Palette,
    title: 'Création Graphique & Identité Visuelle',
    desc: 'Logo, charte graphique et supports de communication pour une image de marque forte et cohérente.',
    href: '/services/creation-graphique',
    tag: 'Branding',
  },
  {
    icon: Globe,
    title: 'Développement de Site Web',
    desc: 'Sites vitrines, landing pages, e-commerce et refonte — optimisés pour convertir vos visiteurs.',
    href: '/services/developpement-web',
    tag: 'Web',
  },
  {
    icon: Share2,
    title: 'Gestion des Réseaux Sociaux',
    desc: 'Stratégie éditoriale, création de contenu, animation et analyse de performance sur toutes les plateformes.',
    href: '/services/gestion-reseaux-sociaux',
    tag: 'Social Media',
  },
  {
    icon: PenTool,
    title: 'Rédaction de Contenu & SEO',
    desc: 'Articles de blog, pages de vente, optimisation SEO on-page et audit de contenu.',
    href: '/services/redaction-contenu-seo',
    tag: 'Content',
  },
];

const prospectionServices = [
  {
    icon: Target,
    title: 'Prospection Commerciale B2B',
    desc: 'Ciblage chirurgical, approche multicanale et RDV haute qualité avec les bons décideurs.',
    href: '/services/prospection-commerciale-b2b',
    tag: 'Outbound',
  },
  {
    icon: CalendarCheck,
    title: 'Prise de RDV Qualifiés',
    desc: 'Rendez-vous qualifiés selon les critères BANT, directement synchronisés dans votre agenda.',
    href: '/services/prise-rdv-qualifies',
    tag: 'Pipeline',
  },
  {
    icon: RefreshCw,
    title: 'Relance des Clients Inactifs',
    desc: 'Réactivation de votre portefeuille dormant avec une approche bienveillante et stratégique.',
    href: '/services/relance-clients-inactifs',
    tag: 'Réactivation',
  },
  {
    icon: GraduationCap,
    title: 'Formation Commerciale',
    desc: 'Cold calling, social selling, closing et traitement des objections pour vos équipes.',
    href: '/services/formation-commerciale',
    tag: 'Coaching',
  },
];

const ServiceCard = ({
  service,
  index,
  dark = false,
  communication = false,
}) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: dark ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={service.href}
        className={`group relative block rounded-3xl p-6 transition-all duration-300 h-full overflow-hidden ${
          dark
            ? communication
              ? 'bg-black/20 border-2 border-white/25 hover:border-white/60 hover:bg-black/30 hover:shadow-xl hover:shadow-black/10'
              : 'bg-black/20 border-2 border-black/20 hover:border-black/60 hover:bg-black/30 hover:shadow-xl hover:shadow-black/10'
            : 'bg-white border-2 border-gray-100 hover:border-[#D71C1C]/40 hover:shadow-xl hover:shadow-[#D71C1C]/8'
        }`}
      >
        {/* Tag badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            dark
              ? communication
                ? 'bg-[#D71C1C]/15 text-[#D71C1C]'
                : 'bg-black/30 text-white/60'
              : 'bg-[#D71C1C]/8 text-[#D71C1C]'
          }`}
        >
          {service.tag}
        </div>

        <div className="flex items-start gap-5">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
              dark
                ? 'bg-black/30 group-hover:bg-black group-hover:shadow-lg group-hover:shadow-black/20'
                : 'bg-gray-50 group-hover:bg-[#D71C1C] group-hover:shadow-lg group-hover:shadow-[#D71C1C]/25'
            }`}
          >
            <Icon
              className={`w-6 h-6 transition-all duration-300 ${
                dark
                  ? 'text-white/70 group-hover:text-white'
                  : 'text-[#D71C1C] group-hover:text-white'
              }`}
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h3
              className={`text-lg font-bold mb-2 leading-tight transition-colors duration-200 ${
                dark
                  ? 'text-white group-hover:text-white'
                  : 'text-gray-900 group-hover:text-[#D71C1C]'
              }`}
            >
              {service.title}
            </h3>
            <p
              className={`text-sm leading-relaxed mb-4 ${
                dark
                  ? 'text-white/60 group-hover:text-white/80'
                  : 'text-gray-500'
              }`}
            >
              {service.desc}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 font-semibold text-sm transition-all duration-200 ${
                dark
                  ? communication
                    ? 'text-[#D71C1C] group-hover:text-[#D71C1C] group-hover:gap-2.5'
                    : 'text-white/70 group-hover:text-white group-hover:gap-2.5'
                  : 'text-[#D71C1C] group-hover:gap-2.5'
              }`}
            >
              Découvrir
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Hover accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left ${
            dark ? 'bg-white' : 'bg-[#D71C1C]'
          }`}
        />
      </Link>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#D71C1C]/8 rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#D71C1C]" />
              <span className="text-sm font-semibold text-[#D71C1C] tracking-wide">
                2 pôles · 8 expertises
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Nos <span className="text-[#D71C1C]">Services</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Deux pôles d'expertise complémentaires pour propulser votre
              croissance : de la visibilité à la conquête commerciale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vertical Split Layout */}
      <section className="px-4 lg:px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left: Communication - White */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 bg-black rounded-[2rem] p-8 lg:p-10 shadow-sm border-2 border-white/20"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#D71C1C]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#D71C1C]" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white uppercase">
                    Communication
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-[#D71C1C] font-semibold">
                    Image & Présence digitale
                  </p>
                </div>
              </div>
              <p className="text-white/60 mb-8 ml-16">
                Construisez une image de marque forte et une présence digitale
                qui convertit.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {communicationServices.map((service, i) => (
                  <ServiceCard
                    key={i}
                    service={service}
                    index={i}
                    dark
                    communication
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Prospection & Visibilité - Red */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex-1 bg-gradient-to-br from-[#D71C1C] to-[#B01818] rounded-[2rem] p-8 lg:p-10 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white uppercase">
                    Prospection & Visibilité
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                    Croissance & Conquête
                  </p>
                </div>
              </div>
              <p className="text-white/70 mb-8 ml-16">
                Générez des opportunités commerciales qualifiées et développez
                votre portefeuille clients.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {prospectionServices.map((service, i) => (
                  <ServiceCard key={i} service={service} index={i} dark />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gray-900 rounded-[2rem] p-10 md:p-14 text-center overflow-hidden"
          >
            {/* Decorative red glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#D71C1C]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#D71C1C]/15 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Prêt à transformer votre croissance ?
              </h2>
              <p className="text-lg mb-8 text-gray-400 max-w-xl mx-auto">
                Contactez-nous aujourd'hui pour discuter de vos besoins
                spécifiques et découvrir comment nous pouvons vous aider.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#D71C1C] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#B01818] transition-all duration-300 hover:shadow-lg hover:shadow-[#D71C1C]/25"
              >
                Obtenir un devis gratuit
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
