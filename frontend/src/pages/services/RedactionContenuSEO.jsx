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

const RedactionContenuSEO = () => {
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
                Rédaction de Contenu & SEO
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Écrire pour vos lecteurs, optimiser pour les algorithmes.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Le contenu est la pierre angulaire de toute stratégie digitale
              performante. Nous créons des textes qui parlent à vos prospects —
              et qui plaisent à Google.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visibility & Credibility */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Visibilité + Crédibilité ={' '}
              <span className="text-[#D71C1C]">Croissance</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Dans un marché saturé, seules les entreprises capables de produire
              du contenu de qualité tirent leur épingle du jeu. Un bon contenu
              vous permet de :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Être trouvé facilement',
                  desc: "Grimper dans les résultats de recherche Google grâce à l'optimisation SEO.",
                },
                {
                  title: 'Éduquer et convaincre',
                  desc: 'Partager des contenus utiles qui positionnent votre entreprise comme référence.',
                },
                {
                  title: 'Convertir',
                  desc: "Guider naturellement vos lecteurs vers l'action : demande de devis, appel, inscription.",
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

      {/* Writing Services */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            2. Nos Services de Rédaction
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Optimisation SEO On-Page',
                desc: "Recherche de mots-clés stratégiques, optimisation des balises (titres, méta-descriptions, URL), structuration du contenu (H1, H2, listes) pour maximiser l'indexation de chaque page.",
              },
              {
                title: 'Articles de Blog',
                desc: "Création d'articles longs et engageants, pensés pour attirer du trafic organique qualifié. Chaque article est rédigé après une analyse concurrentielle et sémantique.",
              },
              {
                title: 'Pages de Vente et Landing Pages',
                desc: "Rédaction de textes persuasifs pour des pages clés : page d'accueil, page service, page \"à propos\". L'objectif : captiver, rassurer et inciter à l'action.",
              },
              {
                title: 'Audit de Contenu',
                desc: 'Analyse de votre site existant pour repérer les lacunes, les contenus obsolètes ou les opportunités SEO non exploitées.',
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

      {/* Quality Process */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            3. Notre Processus de Qualité
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Analyse Sémantique',
                desc: 'Étude des mots-clés cibles et des intentions de recherche de votre audience.',
              },
              {
                step: 'Rédaction Adaptée',
                desc: 'Écriture dans le ton de votre marque, avec un style clair, engageant et professionnel.',
              },
              {
                step: 'Optimisation Technique',
                desc: 'Balisage HTML, maillage interne, intégration des mots-clés dans les zones stratégiques.',
              },
              {
                step: 'Analyse des Résultats',
                desc: 'Suivi des positions Google, du trafic organique et des taux de conversion.',
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

      {/* Why our writing */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              4. Pourquoi notre rédaction fait la différence ?
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "Le meilleur endroit pour cacher un corps, c'est la deuxième page
              de Google."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Notre ambition est simple : vous placer en première page. Et y
              rester. Chaque mot est pesé, chaque paragraphe est structuré pour
              servir à la fois le lecteur et l'algorithme.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Boostez votre visibilité dès maintenant
              </h3>
              <p className="text-white/90">
                Contactez-nous pour un audit gratuit de votre contenu et
                découvrez comment nous pouvons améliorer votre référencement
                naturel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RedactionContenuSEO;
