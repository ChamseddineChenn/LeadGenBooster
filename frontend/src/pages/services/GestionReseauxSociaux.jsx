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

const GestionReseauxSociaux = () => {
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
                Gestion des Réseaux Sociaux & Community Management
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Faites de votre audience votre plus grand levier de croissance.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Les réseaux sociaux ne sont plus une option : ils sont au cœur de
              la relation entre une marque et son public. Nous gérons vos
              plateformes pour transformer chaque interaction en une opportunité
              de fidélisation et de conversion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why an expert */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Pourquoi confier vos réseaux à un{' '}
              <span className="text-[#D71C1C]">expert</span> ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Un post ne suffit pas. Derrière chaque publication réussie, il y a
              une stratégie, un calendrier, une identité visuelle maîtrisée et
              une analyse fine des résultats. Avec notre équipe :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Cohérence de marque',
                  desc: 'Vous maintenez une cohérence de marque sur tous vos canaux.',
                },
                {
                  title: 'Création de contenu',
                  desc: "Vous publiez du contenu qui suscite l'intérêt et l'engagement.",
                },
                {
                  title: 'Résultats mesurables',
                  desc: 'Vous mesurez vos performances pour optimiser votre retour sur investissement.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6"
                >
                  <h3 className="font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            2. Nos Domaines d'Intervention
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Stratégie Éditoriale',
                desc: "Définition des thématiques clés, du ton rédactionnel et de la fréquence de publication adaptée à votre secteur. Création d'un calendrier éditorial mensuel validé ensemble.",
              },
              {
                title: 'Création de Contenu Multi-Format',
                desc: "Visuels (infographies, carrousels, bannières), vidéos courtes (Reels, TikToks, Shorts), textes accrocheurs et storytelling. Chaque contenu est pensé pour s'adapter au format et à l'algorithme de chaque plateforme.",
              },
              {
                title: 'Animation et Modération',
                desc: 'Réponses aux commentaires et messages privés, gestion de la relation client en ligne, modération proactive pour protéger votre image de marque.',
              },
              {
                title: 'Analyse de Performance',
                desc: 'Suivi mensuel des KPIs (portée, engagement, clics, conversions), rapports détaillés avec recommandations concrètes pour améliorer les prochaines actions.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            3. Notre Approche en 4 Temps
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Audit',
                desc: 'Analyse de votre présence actuelle, de vos concurrents et de votre cible.',
              },
              {
                step: 'Lancement',
                desc: "Mise en place de la stratégie éditoriale et de l'identité visuelle de vos réseaux.",
              },
              {
                step: 'Action',
                desc: 'Publication, animation quotidienne et modération.',
              },
              {
                step: 'Optimisation',
                desc: 'Analyse, ajustement et montée en puissance progressive.',
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

      {/* Why trust us */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              4. Pourquoi nous faire confiance ?
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "La meilleure publicité est celle qui ne ressemble pas à de la
              publicité."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Notre mission est de faire parler votre marque avec authenticité.
              Parce que la confiance ne se décrète pas, elle se construit — post
              après post, réponse après réponse, vidéo après vidéo.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Prêt à dynamiser votre présence en ligne ?
              </h3>
              <p className="text-white/90">
                Parlez-nous de votre projet et découvrez comment nous pouvons
                transformer vos réseaux sociaux en un véritable canal de
                croissance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GestionReseauxSociaux;
