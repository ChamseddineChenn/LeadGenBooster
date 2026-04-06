import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Lightbulb,
  Flame,
  Users,
  TrendingUp,
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const values = [
  {
    title: 'Excellence',
    description:
      "Nous poursuivons l'excellence dans tout ce que nous faisons. Chaque détail compte, et nous ne acceptons rien de moins que notre meilleur travail.",
    icon: Star,
  },
  {
    title: 'Intégrité',
    description:
      'La confiance est le fondement de nos relations. Nous opérons avec honnêteté, transparence et éthique dans toutes nos interactions.',
    icon: ShieldCheck,
  },
  {
    title: 'Innovation',
    description:
      'Nous embrassons le changement et explorons constamment de nouvelles façons de résoudre les problèmes et de créer de la valeur.',
    icon: Lightbulb,
  },
  {
    title: 'Passion',
    description:
      'Notre équipe est passionnée par le succès de nos clients. Cette passion nous pousse à aller au-delà et à créer des résultats exceptionnels.',
    icon: Flame,
  },
  {
    title: 'Collaboration',
    description:
      "Nous croyons à la puissance du travail d'équipe. Ensemble, nous accomplissons plus et créons une culture d'entraide et de soutien.",
    icon: Users,
  },
  {
    title: 'Croissance',
    description:
      "Nous investissons dans l'apprentissage continu et le développement de nos talents. La croissance personnelle et collective est essentielle.",
    icon: TrendingUp,
  },
];

const NosValeurs = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold mb-10 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Nos Valeurs
              </h1>
            </div>

            <p className="text-lg text-gray-700 mb-16 leading-relaxed max-w-4xl">
              Les valeurs suivantes guident chaque décision, action et
              interaction chez Lead Gen Booster. Elles définissent qui nous
              sommes et comment nous servons nos clients et notre communauté.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#D71C1C] hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D71C1C]/10 flex items-center justify-center mb-5 group-hover:bg-[#D71C1C] transition-colors">
                  <value.icon className="w-7 h-7 text-[#D71C1C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NosValeurs;
