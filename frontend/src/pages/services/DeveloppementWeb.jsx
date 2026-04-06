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

const DeveloppementWeb = () => {
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
                Développement de Site Web
              </h1>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-4">
              Concevoir une présence en ligne robuste, rapide et évolutive.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Votre site internet est le centre névralgique de votre écosystème
              numérique. Nous ne créons pas seulement des sites ; nous
              construisons des plateformes optimisées pour convertir vos
              visiteurs en partenaires durables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Pourquoi un site web professionnel est{' '}
              <span className="text-[#D71C1C]">indispensable</span> ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              À l'ère du tout-numérique, l'absence de site ou un site obsolète
              est un frein majeur à votre croissance. Un développement sur
              mesure vous permet de :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Crédibiliser votre entreprise',
                  desc: 'Proposer une interface moderne qui rassure vos prospects.',
                },
                {
                  title: 'Maîtriser votre communication',
                  desc: 'Être propriétaire de votre propre plateforme, sans dépendre uniquement des réseaux sociaux.',
                },
                {
                  title: 'Capter des opportunités',
                  desc: 'Transformer chaque visite en une demande de devis ou un contact direct.',
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

      {/* Solutions */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            2. Nos Solutions de Développement
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Sites Vitrines (Corporate)',
                desc: "L'idéal pour présenter votre entreprise, vos services techniques ou votre univers artistique. Un design épuré, une navigation fluide et une présentation claire de vos forces.",
              },
              {
                title: 'Landing Pages (Pages de Vente)',
                desc: "Des pages conçues pour un seul objectif : la conversion. Idéal pour vos campagnes publicitaires ou le lancement d'un service spécifique.",
              },
              {
                title: 'E-commerce & Catalogues en ligne',
                desc: 'Vendez vos produits ou présentez vos équipements avec des solutions de paiement sécurisées et une gestion simplifiée de vos stocks.',
              },
              {
                title: 'Refonte et Maintenance',
                desc: "Votre site est lent ou n'est plus au goût du jour ? Nous modernisons l'existant en améliorant la vitesse de chargement et l'ergonomie, tout en assurant une maintenance technique régulière.",
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

      {/* Technical Commitments */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            3. Nos Engagements Techniques
          </motion.h2>
          <div className="space-y-4">
            {[
              'Responsive Design : Votre site sera parfaitement lisible sur smartphone, tablette et ordinateur.',
              "Vitesse & Performance : Un code optimisé pour un chargement instantané, essentiel pour l'expérience utilisateur et le SEO.",
              'Sécurité Maximale : Installation de certificats SSL (HTTPS) et protection contre les intrusions.',
              'Autonomie : Nous utilisons des systèmes (CMS) vous permettant de modifier vos textes et images facilement sans connaissances techniques.',
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

      {/* Methodology */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            4. Notre Méthodologie de Projet
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Cahier des charges',
                desc: "Analyse précise de vos besoins et de l'architecture du site.",
              },
              {
                step: 'Webdesign',
                desc: 'Création de maquettes visuelles alignées avec votre identité graphique.',
              },
              {
                step: 'Développement',
                desc: 'Codage et intégration des fonctionnalités.',
              },
              {
                step: 'Tests & Mise en ligne',
                desc: 'Vérification sur tous les navigateurs avant le lancement officiel.',
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

      {/* Why Us */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              5. Pourquoi nous confier votre projet ?
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "Un site web réussi est l'équilibre parfait entre une technologie
              invisible et une expérience utilisateur inoubliable."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Nous ne livrons pas qu'un site, nous livrons un outil de réussite.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Bâtissons votre projet dès aujourd'hui
              </h3>
              <p className="text-white/90">
                Votre futur site web commence par une discussion. Contactez-nous
                pour transformer votre idée en une réalité digitale.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeveloppementWeb;
