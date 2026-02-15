import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotreEquipe = () => {
  const team = [
    {
      name: 'Marc Dubois',
      role: 'Fondateur & PDG',
      bio: "Visionnaire avec 15+ ans d'expérience en prospection commerciale",
    },
    {
      name: 'Sophie Martin',
      role: 'Directrice des Opérations',
      bio: 'Spécialiste en optimisation des processus et gestion de projet',
    },
    {
      name: 'Jean Lefebvre',
      role: 'Directeur Technologie',
      bio: 'Expert en solutions innovantes et automations commerciales',
    },
    {
      name: 'Marie Rousseau',
      role: 'Directrice Ventes',
      bio: 'Stratège vente avec un track record de croissance exponentielle',
    },
    {
      name: 'Philippe Leroy',
      role: 'Responsable Formation',
      bio: "Passionné par le développement des talents et l'excellence",
    },
    {
      name: 'Nathalie Gagnon',
      role: 'Directrice Qualité',
      bio: 'Garante de la qualité et de la satisfaction client',
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
              Notre Équipe
            </h1>
          </div>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Notre équipe de 50+ experts passionnés est composée des meilleurs
            talents en prospection, ventes et service client. Chacun apporte
            expertise, créativité et engagement envers l'excellence.
          </p>

          <h2 className="text-2xl font-bold text-black mb-8">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-[#D71C1C]/10 flex items-center justify-center mb-4 text-2xl font-bold text-[#D71C1C]">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-black mb-1">
                  {member.name}
                </h3>
                <p className="text-[#D71C1C] font-semibold text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#D71C1C]/10 border border-[#D71C1C]/20 rounded-lg p-8">
            <h3 className="text-xl font-bold text-black mb-4">
              Pourquoi Rejoindre Notre Équipe
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Environnement de travail collaboratif et dynamique</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>
                  Opportunités de croissance et de développement professionnel
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>Compensation compétitive et avantages sociaux</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#D71C1C] font-bold mr-3">✓</span>
                <span>
                  Travail flexible et équilibre travail-vie personnelle
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotreEquipe;
