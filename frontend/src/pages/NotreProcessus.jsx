import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  PenTool,
  Crosshair,
  Megaphone,
  HeartHandshake,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Immersion & Diagnostic d'Image",
    description:
      "Tout commence par une compréhension profonde de votre ADN. Nous analysons vos objectifs de rayonnement, votre écosystème et vos défis spécifiques lors d'une consultation stratégique pour définir le ton de votre future visibilité.",
  },
  {
    number: 2,
    icon: PenTool,
    title: "Architecture de Stratégie d'Influence",
    description:
      'Nous concevons un plan de communication sur mesure, parfaitement aligné avec votre secteur et vos ambitions de croissance. Ce schéma directeur définit comment votre message sera porté pour captiver votre audience cible.',
  },
  {
    number: 3,
    icon: Crosshair,
    title: 'Ciblage & Qualification Stratégique',
    description:
      'Nos experts identifient les acteurs clés et les décideurs les plus pertinents. Nous ne cherchons pas seulement des contacts, mais des opportunités de connexion à haute valeur ajoutée qui renforceront votre notoriété.',
  },
  {
    number: 4,
    icon: Megaphone,
    title: 'Déploiement de la Voix de Marque',
    description:
      'Nous engageons vos cibles via une prospection de communication multi-canale (téléphone, digital, direct). Grâce à un taux de connexion optimal, nous assurons que votre message est entendu avec clarté et conviction par ceux qui comptent.',
  },
  {
    number: 5,
    icon: HeartHandshake,
    title: 'Culture de la Relation & Notoriété',
    description:
      'Le rayonnement se construit dans la durée. Nous entretenons et développons les échanges avec vos prospects, transformant une simple prise de contact en une relation de confiance et en une opportunité de succès majeure.',
  },
  {
    number: 6,
    icon: BarChart3,
    title: "Analyse d'Impact & Optimisation Continue",
    description:
      "Nous fournissons des rapports détaillés sur l'influence réelle de vos campagnes. En analysant la résonance de votre message, nous ajustons continuellement la stratégie pour maximiser votre visibilité et vos performances finales.",
  },
];

const NotreProcessus = () => {
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
                Notre Processus
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              L'Ingénierie du{' '}
              <span className="text-[#D71C1C]">Rayonnement</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
              Notre approche méthodique et éprouvée garantit une présence
              marquante et des résultats durables. Voici comment nous
              transformons votre vision en une autorité de marché incontestée.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative"
              >
                <div
                  className={`flex flex-col md:flex-row gap-6 md:gap-10 items-start p-8 md:p-10 rounded-2xl transition-all hover:shadow-lg ${
                    index % 2 === 0
                      ? 'bg-[#f2f2f2]'
                      : 'bg-white border-2 border-gray-100'
                  }`}
                >
                  {/* Number + Icon */}
                  <div className="shrink-0 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#D71C1C] to-[#B01818] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-200">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-[#D71C1C] md:hidden" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <step.icon className="w-7 h-7 text-[#D71C1C] hidden md:block" />
                      <h3 className="text-xl md:text-2xl font-bold text-black">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-full w-0.5 h-6 bg-[#D71C1C]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotreProcessus;
