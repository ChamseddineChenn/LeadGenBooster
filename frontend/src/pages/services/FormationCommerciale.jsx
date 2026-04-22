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

const FormationCommerciale = () => {
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
                Formation Commerciale
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Transformez vos Vendeurs en « Top Performers ».
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Un produit exceptionnel ne se vend pas tout seul. Ce sont les
              compétences de vos équipes qui font la différence. Nos formations
              sont conçues pour équiper vos commerciaux des techniques les plus
              efficaces du marché — et en faire de véritables machines à closer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Training Pillars */}
      <section className="bg-[#f2f2f2] py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Nos Piliers de{' '}
              <span className="text-[#D71C1C]">Formation</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Chaque module est conçu pour répondre aux défis concrets
              rencontrés par vos équipes terrain :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Cold Calling (Appels à froid)',
                  desc: "Maîtriser l'art de l'appel à froid : les premières secondes, la gestion du barrage secrétariat, l'accroche percutante et la prise de RDV téléphonique. Formation pratique avec mise en situation et écoute commentée.",
                },
                {
                  title: 'Social Selling & LinkedIn',
                  desc: "Exploiter LinkedIn comme un véritable outil de prospection : optimisation du profil, techniques de connexion, rédaction de messages InMail à forte valeur ajoutée et construction d'une routine de prospection digitale quotidienne.",
                },
                {
                  title: 'Vente de Valeur & Closing',
                  desc: "Apprendre à vendre la valeur plutôt que le prix. Techniques de découverte des besoins (SPIN Selling), construction d'une proposition irrésistible et méthodes de closing efficaces sans pression.",
                },
                {
                  title: 'Traitement des Objections',
                  desc: "Transformer chaque objection en opportunité. Travail sur les objections les plus fréquentes (prix, timing, concurrence) avec des réponses structurées et convaincantes. Simulation d'entretiens difficiles.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why choose our training */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            2. Pourquoi choisir notre formation ?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Résultats Immédiats',
                desc: 'Nos formations sont opérationnelles dès le lendemain. Pas de théorie inutile : uniquement des outils et techniques applicables immédiatement en rendez-vous.',
              },
              {
                title: 'Adaptabilité Totale',
                desc: 'Chaque formation est personnalisée : nous travaillons sur vos cas réels, vos scripts, vos objections terrain et vos cycles de vente spécifiques.',
              },
              {
                title: 'Motivation et Confiance',
                desc: 'Au-delà des techniques, nous redonnons confiance à vos équipes. Un commercial motivé et outillé est un commercial qui performe.',
              },
              {
                title: 'ROI Mesurable',
                desc: 'Nous définissons des indicateurs de performance avant/après la formation pour mesurer concrètement son impact sur vos résultats commerciaux.',
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
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#f2f2f2] py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              Investissez dans vos talents
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "La différence entre un bon commercial et un excellent commercial,
              c'est la formation."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Vos équipes sont votre plus grand actif. Donnez-leur les armes
              pour exceller et regardez vos résultats décoller.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Formez vos équipes dès aujourd'hui
              </h3>
              <p className="text-white/90">
                Contactez-nous pour un diagnostic gratuit des compétences de
                votre équipe commerciale et un programme de formation sur
                mesure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FormationCommerciale;
