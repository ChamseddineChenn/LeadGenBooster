import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Crosshair, Cpu, BarChart3, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const reasons = [
  {
    icon: Eye,
    title: 'Ambassadeurs de Vision',
    description:
      "Des experts en communication qui s'approprient votre identité pour porter votre discours avec une conviction qui ouvre naturellement de nouvelles opportunités.",
  },
  {
    icon: Crosshair,
    title: 'Stratégie de Présence Ciblée',
    description:
      "Des processus rigoureux pour garantir que votre message occupe l'espace là où il génère le plus de valeur et d'impact.",
  },
  {
    icon: Cpu,
    title: 'Amplification Technologique',
    description:
      "L'intégration d'outils d'avant-garde pour maximiser la portée, la clarté et la résonance de votre image sur le marché.",
  },
  {
    icon: BarChart3,
    title: "Mesure d'Impact et de Performance",
    description:
      "Un suivi précis pour évaluer l'influence réelle, la pénétration du marché et l'amélioration de vos indicateurs de réussite.",
  },
  {
    icon: Star,
    title: 'Excellence de Réputation',
    description:
      'Une approche haut de gamme dédiée à la valorisation de votre image de marque, garantissant des interactions de haute qualité.',
  },
];

const QuiSommesNous = () => {
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
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Qui Sommes-Nous
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
              Lead Gen Booster est l'architecte de votre rayonnement sur le
              marché. Nous accompagnons les organisations pour les sortir de
              l'ombre et les positionner comme des figures d'autorité. Plus
              qu'un partenaire de contact, nous sommes un accélérateur de
              visibilité globale qui fusionne l'art de la communication humaine
              avec la puissance des technologies de pointe pour transformer
              votre présence en levier de croissance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre Essence */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Notre Essence :{' '}
                <span className="text-[#D71C1C]">L'Influence en Mouvement</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Née d'une volonté de transformer la manière dont les marques
                s'expriment, notre entité s'est imposée comme un pôle majeur de
                stratégie de présence. Notre mission est de propulser votre
                image pour qu'elle devienne un moteur de performance, générant
                des résultats concrets pour nos partenaires grâce à la création
                de connexions authentiques et percutantes.
              </p>
            </div>
            <div className="bg-[#D71C1C] rounded-2xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Notre Expertise : L'Ingénierie du Rayonnement
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Grâce à une approche éprouvée, nous orchestrons votre
                déploiement stratégique sur tous vos axes de développement.
                Notre savoir-faire réside dans notre capacité à porter votre
                vision avec clarté auprès des interlocuteurs clés, optimisant
                ainsi votre portée commerciale. Nous ne nous contentons pas de
                créer des liens ; nous bâtissons votre leadership pour faciliter
                vos succès futurs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi Nous */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl font-bold text-black text-center mb-16"
          >
            Pourquoi faire rayonner votre organisation avec nous ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D71C1C]/10 flex items-center justify-center mb-5 group-hover:bg-[#D71C1C] transition-colors">
                  <reason.icon className="w-7 h-7 text-[#D71C1C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuiSommesNous;
