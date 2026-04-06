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
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const communicationServices = [
  {
    icon: Palette,
    title: 'Création Graphique & Identité Visuelle',
    desc: 'Logo, charte graphique et supports de communication pour une image de marque forte et cohérente.',
    href: '/services/creation-graphique',
  },
  {
    icon: Globe,
    title: 'Développement de Site Web',
    desc: 'Sites vitrines, landing pages, e-commerce et refonte — optimisés pour convertir vos visiteurs.',
    href: '/services/developpement-web',
  },
  {
    icon: Share2,
    title: 'Gestion des Réseaux Sociaux',
    desc: 'Stratégie éditoriale, création de contenu, animation et analyse de performance sur toutes les plateformes.',
    href: '/services/gestion-reseaux-sociaux',
  },
  {
    icon: PenTool,
    title: 'Rédaction de Contenu & SEO',
    desc: 'Articles de blog, pages de vente, optimisation SEO on-page et audit de contenu.',
    href: '/services/redaction-contenu-seo',
  },
];

const prospectionServices = [
  {
    icon: Target,
    title: 'Prospection Commerciale B2B',
    desc: 'Ciblage chirurgical, approche multicanale et RDV haute qualité avec les bons décideurs.',
    href: '/services/prospection-commerciale-b2b',
  },
  {
    icon: CalendarCheck,
    title: 'Prise de RDV Qualifiés',
    desc: 'Rendez-vous qualifiés selon les critères BANT, directement synchronisés dans votre agenda.',
    href: '/services/prise-rdv-qualifies',
  },
  {
    icon: RefreshCw,
    title: 'Relance des Clients Inactifs',
    desc: 'Réactivation de votre portefeuille dormant avec une approche bienveillante et stratégique.',
    href: '/services/relance-clients-inactifs',
  },
  {
    icon: GraduationCap,
    title: 'Formation Commerciale',
    desc: 'Cold calling, social selling, closing et traitement des objections pour vos équipes.',
    href: '/services/formation-commerciale',
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={service.href}
        className="group block bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] hover:shadow-lg transition-all h-full"
      >
        <div className="w-14 h-14 rounded-xl bg-gray-100 group-hover:bg-[#D71C1C] flex items-center justify-center mb-5 transition-colors">
          <Icon className="w-7 h-7 text-[#D71C1C] group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {service.desc}
        </p>
        <span className="text-[#D71C1C] font-semibold flex items-center group-hover:gap-2 transition-all text-sm">
          En savoir plus
          <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Nos Services
              </h1>
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Deux pôles d'expertise complémentaires pour propulser votre
              croissance : de la visibilité à la conquête commerciale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Communication Pole */}
      <section className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-8 bg-[#D71C1C] rounded-full" />
              <h2 className="text-3xl font-bold text-black">Communication</h2>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl ml-6">
              Construisez une image de marque forte et une présence digitale qui
              convertit.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationServices.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Prospection & Visibilité Pole */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-8 bg-[#D71C1C] rounded-full" />
              <h2 className="text-3xl font-bold text-black">
                Prospection & Visibilité
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl ml-6">
              Générez des opportunités commerciales qualifiées et développez
              votre portefeuille clients.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prospectionServices.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer votre croissance ?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Contactez-nous aujourd'hui pour discuter de vos besoins
              spécifiques et découvrir comment nous pouvons vous aider.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#D71C1C] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Obtenir un devis gratuit
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
