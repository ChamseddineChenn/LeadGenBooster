import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const PriseRDVQualifies = () => {
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
                Prise de RDV Qualifiés
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Votre Agenda au Service de votre Chiffre d'Affaires.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Décrocher un rendez-vous, c'est bien. Décrocher un rendez-vous
              avec le bon interlocuteur, au bon moment, avec un besoin réel :
              c'est notre métier. Chez LeadGen Booster, nous vous garantissons
              des rendez-vous qui comptent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-[#f2f2f2] py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Ce que nous vous{' '}
              <span className="text-[#D71C1C]">garantissons</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Chaque RDV que nous planifions répond à 4 critères non négociables
              :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Le Bon Interlocuteur',
                  desc: "Le rendez-vous est pris avec un décideur ou un influenceur clé dans le processus d'achat.",
                },
                {
                  title: 'Un Besoin Identifié',
                  desc: 'Le prospect a exprimé un besoin ou une problématique en lien direct avec vos solutions.',
                },
                {
                  title: 'Budget & Timing',
                  desc: 'Le projet est budgété ou en cours de budgétisation, avec un calendrier de décision identifié.',
                },
                {
                  title: 'Intérêt Confirmé',
                  desc: 'Le prospect a explicitement accepté le rendez-vous et souhaite en savoir plus sur votre offre.',
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

      {/* Rigorous Qualification Process */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-black mb-4">
            2. Un Processus de Qualification Rigoureux
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-lg text-gray-700 mb-12 leading-relaxed"
          >
            Derrière chaque rendez-vous planifié, il y a un processus méthodique
            qui assure la qualité :
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Scripting & Préparation',
                desc: "Élaboration d'argumentaires sur mesure, adaptés à votre offre et au profil de chaque cible.",
              },
              {
                step: 'Passage Barrage Secrétariat',
                desc: 'Nos agents sont formés aux techniques de franchissement des filtres téléphoniques pour atteindre directement les décideurs.',
              },
              {
                step: 'Validation BANT',
                desc: "Chaque prospect est évalué selon les critères Budget, Autorité, Besoin et Timing avant d'être qualifié.",
              },
              {
                step: 'Synchronisation Agenda',
                desc: 'Le RDV est fixé dans votre agenda avec un brief complet : contexte, besoin exprimé, coordonnées et notes de conversation.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center bg-[#f2f2f2] border-2 border-gray-100 rounded-xl p-6"
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

      {/* What you receive */}
      <section className="bg-[#f2f2f2] py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-black mb-8">
            3. Ce que vous recevez à chaque RDV
          </motion.h2>
          <div className="space-y-4">
            {[
              "Nom et fonction de l'interlocuteur",
              'Coordonnées complètes (téléphone, email)',
              'Résumé du besoin exprimé',
              "Niveau d'urgence et de budget estimé",
              "Notes de qualification et contexte de l'échange",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-[#D71C1C] shrink-0 mt-0.5" />
                <p className="text-gray-700 text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              Remplissez votre agenda de décideurs
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "Un commercial sans rendez-vous qualifié est un pilote sans piste
              d'atterrissage."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Arrêtez de courir après les prospects. Laissez-nous vous les
              amener — qualifiés, intéressés, et prêts à discuter.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Un agenda bien rempli commence ici
              </h3>
              <p className="text-white/90">
                Contactez-nous pour découvrir combien de rendez-vous qualifiés
                nous pouvons vous générer chaque mois.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PriseRDVQualifies;
