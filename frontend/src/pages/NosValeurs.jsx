import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NosValeurs = () => {
  const values = [
    {
      title: 'Excellence',
      description:
        "Nous poursuivons l'excellence dans tout ce que nous faisons. Chaque détail compte, et nous ne acceptons rien de moins que notre meilleur travail.",
      icon: '⭐',
    },
    {
      title: 'Intégrité',
      description:
        'La confiance est le fondement de nos relations. Nous opérons avec honnêteté, transparence et éthique dans toutes nos interactions.',
      icon: '🤝',
    },
    {
      title: 'Innovation',
      description:
        'Nous embrassons le changement et explorons constamment de nouvelles façons de résoudre les problèmes et de créer de la valeur.',
      icon: '💡',
    },
    {
      title: 'Passion',
      description:
        'Notre équipe est passionnée par le succès de nos clients. Cette passion nous pousse à aller au-delà et à créer des résultats exceptionnels.',
      icon: '🔥',
    },
    {
      title: 'Collaboration',
      description:
        "Nous croyons à la puissance du travail d'équipe. Ensemble, nous accomplissons plus et créons une culture d'entraide et de soutien.",
      icon: '🤲',
    },
    {
      title: 'Croissance',
      description:
        "Nous investissons dans l'apprentissage continu et le développement de nos talents. La croissance personnelle et collective est essentielle.",
      icon: '📈',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <Link
          to="/about"
          className="flex items-center gap-2 text-[#D71C1C] font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Nos Valeurs
            </h1>
          </div>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Les valeurs suivantes guident chaque décision, action et interaction
            chez Lead Gen Booster. Elles définissent qui nous sommes et comment
            nous servons nos clients et notre communauté.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NosValeurs;
