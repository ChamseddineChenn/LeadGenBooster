import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Rocket,
  Lightbulb,
  ShieldCheck,
  Handshake,
  Network,
  MessageCircle,
  TrendingUp,
  ThumbsUp,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const engagements = [
  {
    icon: Rocket,
    title: 'Amplifier votre Impact',
    description:
      "Nous ne nous contentons pas d'atteindre vos objectifs ; nous visons à surpasser vos attentes en créant une valeur exceptionnelle qui installe durablement votre autorité sur le marché.",
  },
  {
    icon: Lightbulb,
    title: 'Innover pour votre Visibilité',
    description:
      "Nous investissons continuellement dans les technologies de pointe et les nouvelles stratégies de communication pour garantir que votre voix reste à l'avant-garde de votre industrie.",
  },
  {
    icon: ShieldCheck,
    title: 'Garantir une Clarté Totale',
    description:
      'La transparence est au cœur de notre démarche. Vous maîtrisez chaque étape de votre déploiement et comprenez précisément comment nous transformons votre présence en opportunités.',
  },
  {
    icon: Handshake,
    title: 'Bâtir des Réussites Communes',
    description:
      'Votre influence est le reflet de notre expertise. Nous nous engageons dans un partenariat de croissance où nous vous accompagnons à chaque étape pour transformer votre visibilité en succès mesurables.',
  },
];

const impacts = [
  {
    icon: Network,
    title: 'Un Large Réseau de Partenaires',
    description:
      "Nous avons accompagné une vaste diversité d'entreprises, consolidant leur positionnement et leur autorité dans leurs secteurs respectifs.",
  },
  {
    icon: MessageCircle,
    title: 'Un Volume de Connexions Massif',
    description:
      "Grâce à nos stratégies d'influence, nous avons orchestré une quantité monumentale d'opportunités de dialogue, transformant chaque interaction en un levier de notoriété.",
  },
  {
    icon: TrendingUp,
    title: 'Une Création de Valeur Colossale',
    description:
      "Notre expertise a permis de générer des revenus d'envergure pour nos clients, prouvant que le rayonnement stratégique est le moteur le plus puissant de la croissance financière.",
  },
  {
    icon: ThumbsUp,
    title: 'Une Excellence Reconnue',
    description:
      "La quasi-totalité de nos partenaires témoigne d'une satisfaction exemplaire, confirmant la pertinence de nos méthodes et l'engagement total de nos équipes.",
  },
];

const NotreMission = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold mb-10 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>

          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Notre Mission
              </h1>
            </div>

            <div className="bg-linear-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14">
              <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed text-center italic">
                « Propulser le rayonnement stratégique des entreprises en
                déployant <br /> des solutions de visibilité et d'influence
                innovantes, créatrices de croissance durable et de résultats
                concrets »
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagements */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Nos Engagements
            </h2>
            <p className="text-lg text-gray-600">
              Chaque jour, notre équipe se mobilise pour :
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {engagements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 flex gap-6 hover:shadow-lg transition-shadow"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-[#D71C1C]/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#D71C1C]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Notre Impact :{' '}
              <span className="text-[#D71C1C]">
                Une Empreinte Majeure sur le Marché
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Depuis notre création, nous avons généré un impact positif
              significatif en transformant la visibilité de nos partenaires en
              résultats concrets :
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {impacts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] transition-all"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D71C1C] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-5">
                  <item.icon className="w-8 h-8 text-[#D71C1C] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotreMission;
