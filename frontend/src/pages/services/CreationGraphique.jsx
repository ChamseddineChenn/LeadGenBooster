import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, CheckCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const CreationGraphique = () => {
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
                Création Graphique et Identité Visuelle
              </h1>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mb-6">
              Transformez votre vision en une identité visuelle inoubliable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-black mb-6">
              1. Pourquoi l'identité visuelle est-elle{' '}
              <span className="text-[#D71C1C]">cruciale</span> ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Votre logo et votre charte graphique sont bien plus que de simples
              dessins. C'est la première poignée de main avec vos clients. Une
              identité forte permet de :
            </p>
            <div className="space-y-4">
              {[
                'Se démarquer instantanément de la concurrence.',
                'Inspirer confiance et professionnalisme dès le premier regard.',
                'Fédérer vos clients autour de vos valeurs et de votre mission.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#D71C1C] shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            2. Nos Services de Création Graphique
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Conception de Logo (Branding)',
                description:
                  'Nous créons des logos uniques, mémorables et déclinables sur tous supports. Chaque trait et chaque couleur sont choisis pour raconter votre histoire.',
              },
              {
                title: 'Charte Graphique Complète',
                description:
                  'Pour garantir une cohérence totale sur tous vos supports, nous définissons :',
                list: [
                  'La palette de couleurs (codes HEX, RVB, CMJN).',
                  'La typographie (polices de caractères).',
                  "Les règles d'utilisation (interlignages, marges, déclinaisons).",
                ],
              },
              {
                title: 'Supports de Communication (Print & Digital)',
                description: '',
                list: [
                  "Papeterie : Cartes de visite, papier à en-tête, signatures d'e-mail.",
                  'Marketing : Brochures, flyers, catalogues, affiches.',
                  'Digital : Bannières pour réseaux sociaux, visuels pour sites web, présentations professionnelles.',
                ],
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
                <h3 className="text-xl font-bold text-black mb-4">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
                {item.list && (
                  <ul className="space-y-2">
                    {item.list.map((li, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-[#D71C1C] rounded-full mt-2 shrink-0" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-black mb-12"
          >
            3. Notre Méthode de Travail
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                step: 'Immersion & Brief',
                desc: 'Comprendre votre secteur, vos cibles et vos objectifs.',
              },
              {
                step: 'Recherche Créative',
                desc: 'Exploration de concepts et création de planches de tendances (Moodboards).',
              },
              {
                step: 'Conception',
                desc: 'Réalisation des premières pistes graphiques.',
              },
              {
                step: 'Affinage',
                desc: 'Retours et ajustements pour atteindre la perfection.',
              },
              {
                step: 'Livraison',
                desc: 'Remise de vos fichiers dans tous les formats nécessaires (Vecteurs, HD, Web).',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 items-start bg-white rounded-xl p-6 border-2 border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D71C1C] flex items-center justify-center text-white font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black mb-1">
                    {item.step}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#D71C1C] to-[#B01818] rounded-2xl p-10 md:p-14 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              4. Pourquoi nous choisir ?
            </h2>
            <blockquote className="text-xl italic text-white/90 mb-6 border-l-4 border-white/30 pl-6">
              "Le design n'est pas seulement ce à quoi cela ressemble. Le
              design, c'est comment ça fonctionne."
            </blockquote>
            <p className="text-white/90 text-lg leading-relaxed">
              Nous allions l'esthétique à l'efficacité commerciale. Que vous
              soyez une entreprise industrielle cherchant à moderniser son image
              ou un professionnel de la culture souhaitant affirmer son style,
              nous adaptons notre plume graphique à votre ADN.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CreationGraphique;
