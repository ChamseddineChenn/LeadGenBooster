import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ProspectionCommercialeB2B = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold mb-10 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux Services
          </Link>

          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Prospection Commerciale B2B
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Transformez vos ambitions en opportunités réelles.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Prospecter ne s'improvise pas. Dans un paysage B2B de plus en plus
              concurrentiel, atteindre les bons décideurs, au bon moment, avec
              le bon message, exige une méthodologie éprouvée et une équipe
              dédiée. C'est exactement ce que nous vous offrons.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why confide */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Pourquoi nous confier votre{' '}
              <span className="text-[#D71C1C]">prospection</span> ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Nous comprenons que la prospection est le moteur de votre
              croissance. Nos solutions sont conçues pour vous apporter :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Ciblage Chirurgical',
                  desc: 'Nous identifions vos prospects idéaux grâce à un mapping précis du marché, en ciblant les entreprises et les interlocuteurs les plus pertinents pour votre offre.',
                },
                {
                  title: 'Approche Multicanale',
                  desc: 'Téléphone, email, LinkedIn — nous combinons les canaux pour multiplier les points de contact et maximiser vos chances de réponse.',
                },
                {
                  title: 'RDV Haute Qualité',
                  desc: 'Chaque rendez-vous est qualifié selon des critères stricts : besoin identifié, budget disponible, pouvoir de décision confirmé. Vous ne perdez plus de temps avec des prospects froids.',
                },
                {
                  title: 'Gain de Productivité',
                  desc: "Libérez votre équipe commerciale des tâches de démarchage pour la concentrer sur ce qu'elle fait de mieux : vendre et fidéliser.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#D71C1C] hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booster Methodology */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-black mb-4">
            2. Notre Méthodologie « Booster »
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-lg text-gray-700 mb-12 leading-relaxed"
          >
            Notre approche repose sur un processus structuré, transparent et
            orienté résultats :
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Audit & Stratégie',
                desc: "Analyse de votre marché cible, de vos concurrents et de votre positionnement. Définition d'un plan de prospection sur mesure.",
              },
              {
                step: 'Campagnes de Conquête',
                desc: 'Déploiement des campagnes de prospection multicanale avec des scripts personnalisés et des séquences de relance optimisées.',
              },
              {
                step: 'Qualification & Transfert',
                desc: 'Chaque prospect intéressé est qualifié selon les critères BANT (Budget, Autorité, Besoin, Timing) avant de vous être transmis.',
              },
              {
                step: 'Optimisation Continue',
                desc: 'Analyse des performances, ajustement des messages, affinage du ciblage pour améliorer continuellement les résultats.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center bg-white border-2 border-gray-100 rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#D71C1C] text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-black mb-2">{item.step}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              Passez à l'offensive commerciale
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "Le succès en prospection appartient à ceux qui ont une méthode —
              pas à ceux qui attendent que le téléphone sonne."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Ne laissez plus vos concurrents capter les opportunités à votre
              place. Confiez-nous votre prospection et concentrez-vous sur votre
              cœur de métier.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Prêt à remplir votre pipeline commercial ?
              </h3>
              <p className="text-white/90">
                Contactez-nous dès maintenant pour un diagnostic gratuit de
                votre stratégie de prospection.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProspectionCommercialeB2B;
