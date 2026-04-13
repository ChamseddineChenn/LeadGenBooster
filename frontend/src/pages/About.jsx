import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, Target, Award } from 'lucide-react';

const About = () => {
  const aboutSections = [
    {
      title: 'Qui Sommes-Nous',
      href: '/about/qui-sommes-nous',
      icon: Users,
      description:
        'Découvrez notre histoire, notre expertise et notre passion pour le succès de nos clients.',
    },
    {
      title: 'Notre Mission',
      href: '/about/notre-mission',
      icon: Target,
      description:
        "Nos objectifs et notre engagement envers l'excellence et la satisfaction client.",
    },
    {
      title: 'Nos Valeurs',
      href: '/about/nos-valeurs',
      icon: Lightbulb,
      description:
        'Les principes fondamentaux qui guident chaque décision et action que nous prenons.',
    },
    {
      title: 'Notre Équipe',
      href: '/about/notre-equipe',
      icon: Award,
      description:
        'Rencontrez les experts passionnés qui font fonctionner Lead Gen Booster.',
    },
    {
      title: 'Notre Processus',
      href: '/about/notre-processus',
      icon: Lightbulb,
      description:
        'Comment nous travaillons pour garantir des résultats mesurables et durables.',
    },
    {
      title: 'Carrières',
      href: '/about/carrieres',
      icon: Target,
      description:
        'Rejoignez notre équipe dynamique et contribuez à notre croissance.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              À Propos de Nous
            </h1>
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lead Gen Booster est votre partenaire de confiance pour un
            accompagnement sur mesure vers la réussite et le développement de
            vos affaires.
          </p>
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={index}
                to={section.href}
                className="group bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:bg-white cursor-pointer"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-lg bg-[#D71C1C]/10 flex items-center justify-center group-hover:bg-[#D71C1C]/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-[#D71C1C]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#D71C1C] transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {section.description}
                </p>
                <div className="flex items-center text-[#D71C1C] font-semibold group-hover:gap-2 transition-all">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#D71C1C] text-white py-16 mt-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">Nombreux</div>
              <p className="text-white/80">Clients Satisfaits</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Experte</div>
              <p className="text-white/80">Équipe Pluridisciplinaire</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Dédiée</div>
              <p className="text-white/80">Équipe Passionnée</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Fort</div>
              <p className="text-white/80">Volume de Contacts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
