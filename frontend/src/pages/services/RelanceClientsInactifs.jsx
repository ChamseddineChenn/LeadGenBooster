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

const RelanceClientsInactifs = () => {
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
                Relance des Clients Inactifs
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Réveillez le Potentiel Dormant de votre CRM.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Votre base de données regorge de clients qui ont déjà fait
              confiance à votre entreprise. Certains se sont éloignés — mais
              cela ne signifie pas qu'ils sont perdus. Nous les réactivons pour
              vous avec tact, méthode et résultat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why reactivate */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Pourquoi <span className="text-[#D71C1C]">réactiver</span> vos
              anciens clients ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Reconquérir un ancien client coûte bien moins cher que d'en
              acquérir un nouveau. Voici pourquoi :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Coût Réduit',
                  desc: 'Le client vous connaît déjà — pas besoin de reconstruire la confiance depuis zéro.',
                },
                {
                  title: 'Confiance Établie',
                  desc: "L'historique de collaboration facilite la reprise du dialogue.",
                },
                {
                  title: 'Feedback Précieux',
                  desc: 'La relance est aussi une occasion de comprendre pourquoi le client est parti — et de corriger le tir.',
                },
                {
                  title: 'CA Immédiat',
                  desc: "Un client réactivé peut générer du chiffre d'affaires très rapidement.",
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

      {/* Reconquest Strategy */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-black mb-4">
            2. Notre Stratégie de Reconquête
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-lg text-gray-700 mb-12 leading-relaxed"
          >
            Nous déployons une approche en 4 étapes pour réveiller vos clients
            dormants avec finesse :
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Analyse & Segmentation',
                desc: "Identification des clients inactifs, classement par potentiel de réactivation (ancienneté, volume d'achat passé, secteur).",
              },
              {
                step: 'Approche « Prendre des Nouvelles »',
                desc: 'Un premier contact bienveillant et non commercial, pour renouer le lien et comprendre la situation actuelle du client.',
              },
              {
                step: 'Offres de Réengagement',
                desc: 'Proposition de solutions adaptées à la nouvelle réalité du client : nouvelles offres, conditions spéciales, services complémentaires.',
              },
              {
                step: 'Mise à jour des Données',
                desc: 'Actualisation des informations CRM : nouveaux contacts, changements de poste, évolutions de besoins.',
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
              Réveillez votre portefeuille client
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "Le client le plus rentable est souvent celui que vous avez déjà
              conquis."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Chaque client inactif est une opportunité en sommeil. Ne laissez
              pas votre CRM prendre la poussière — laissez-nous le transformer
              en machine à revenus.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Réactivez vos anciens clients dès maintenant
              </h3>
              <p className="text-white/90">
                Contactez-nous pour un audit gratuit de votre base de données et
                découvrez le potentiel de réactivation de votre portefeuille.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RelanceClientsInactifs;
