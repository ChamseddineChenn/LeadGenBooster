import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Compass,
  Megaphone,
  LineChart,
  UserCheck,
  Globe2,
  PenLine,
  Palette,
  PaintBucket,
  Code2,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const poles = [
  {
    name: 'Direction & Vision',
    color: 'from-[#D71C1C] to-[#B01818]',
    roles: [
      {
        icon: Compass,
        title: 'Fondateur Visionnaire',
        description:
          "Architecte de l'agence, il définit la trajectoire stratégique de Lead Gen Booster. Sa mission est d'insuffler une culture d'innovation constante pour offrir aux entreprises les leviers de visibilité et de croissance les plus performants du marché.",
      },
    ],
  },
  {
    name: 'Pôle Stratégie & Communication',
    color: 'from-gray-900 to-gray-800',
    roles: [
      {
        icon: Megaphone,
        title: 'Directeur de Communication',
        description:
          "Gardien de votre image, il conçoit l'architecture de votre discours de marque. Il veille à la cohérence et à la puissance de votre message sur tous les canaux, garantissant que votre voix résonne avec force et distinction dans votre secteur.",
      },
      {
        icon: LineChart,
        title: 'Directeur Commercial',
        description:
          "Stratège de la performance, il orchestre le déploiement des solutions de visibilité. Il transforme les ambitions de nos partenaires en plans d'action concrets, veillant à ce que chaque campagne soit un moteur de réussite et de rentabilité.",
      },
    ],
  },
  {
    name: 'Pôle Engagement & Influence',
    color: 'from-[#D71C1C] to-[#B01818]',
    roles: [
      {
        icon: UserCheck,
        title: 'Agent Commercial',
        description:
          "Ambassadeur de votre marque sur le terrain, il maîtrise l'art du dialogue stratégique. Sa mission est de porter votre message avec clarté et conviction auprès des décideurs clés, transformant chaque interaction en une opportunité à haute valeur ajoutée.",
      },
      {
        icon: Globe2,
        title: 'Community Manager',
        description:
          "Catalyseur d'engagement, il est la voix de votre entreprise sur les réseaux sociaux. Sa mission est de fédérer une communauté active autour de votre marque et de dynamiser votre présence digitale au quotidien.",
      },
      {
        icon: PenLine,
        title: 'Rédacteur de Contenu',
        description:
          'Artisan des mots, il donne une voix à votre expertise. Il rédige des contenus percutants qui informent et séduisent, positionnant votre entreprise comme une référence incontournable grâce à un discours riche et pertinent.',
      },
    ],
  },
  {
    name: 'Pôle Créatif & Digital',
    color: 'from-gray-900 to-gray-800',
    roles: [
      {
        icon: Palette,
        title: 'Graphiste Senior',
        description:
          "Expert de l'identité visuelle, il traduit votre vision en concepts graphiques mémorables. Il crée l'univers visuel qui assoit votre autorité et capte instantanément l'attention de vos futurs partenaires.",
      },
      {
        icon: PaintBucket,
        title: 'Graphiste Junior',
        description:
          'Esprit créatif et agile, il appuie le pôle visuel en déclinant votre image sur divers supports. Il assure la modernité des contenus graphiques pour une présence visuelle dynamique et toujours à jour.',
      },
      {
        icon: Code2,
        title: 'Développeur Web',
        description:
          'Ingénieur de votre présence numérique, il bâtit les plateformes qui servent de vitrine à votre expertise. Il assure que vos outils digitaux sont fluides et performants, renforçant ainsi votre crédibilité en ligne.',
      },
    ],
  },
];

const NotreEquipe = () => {
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
                Notre Équipe
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
              Notre équipe est composée d'experts passionnés, ainsi que des
              meilleurs talents en Marketing, prospection, ventes et service
              client. Chacun apporte expertise, créativité et engagement envers
              l'excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Title */}
      <section className="bg-gray-50 py-6 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl font-bold text-black text-center"
          >
            L'Équipe <span className="text-[#D71C1C]">Lead Gen Booster</span>
          </motion.h2>
        </div>
      </section>

      {/* Poles */}
      {poles.map((pole, poleIndex) => (
        <section
          key={poleIndex}
          className={`py-20 px-4 ${poleIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div
                className={`inline-block bg-linear-to-r ${pole.color} rounded-lg px-6 py-3`}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {pole.name}
                </h3>
              </div>
            </motion.div>

            <div
              className={`grid grid-cols-1 ${pole.roles.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-2xl'} gap-8`}
            >
              {pole.roles.map((role, roleIndex) => (
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: roleIndex * 0.1,
                  }}
                  className="group bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#D71C1C]/10 flex items-center justify-center mb-5 group-hover:bg-[#D71C1C] transition-colors">
                    <role.icon className="w-7 h-7 text-[#D71C1C] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-3">
                    {role.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {role.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default NotreEquipe;
