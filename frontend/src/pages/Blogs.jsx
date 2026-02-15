import React, { useState } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogs = [
    {
      id: 1,
      category: 'conseils',
      title: '5 Stratégies Éprouvées pour Augmenter votre Taux de Conversion',
      excerpt:
        'Découvrez les meilleures pratiques utilisées par les entreprises les plus performantes pour convertir leurs prospects...',
      date: '15 Février 2026',
      author: 'Marc Dubois',
      readTime: '5 min de lecture',
      image: 'bg-gradient-to-br from-[#D71C1C] to-[#B01818]',
    },
    {
      id: 2,
      category: 'tendances',
      title: 'Les Tendances du Télémarketing en 2026',
      excerpt:
        'Explorez les dernières tendances et innovations dans le domaine du télémarketing et de la prospection commerciale...',
      date: '10 Février 2026',
      author: 'Sophie Martin',
      readTime: '7 min de lecture',
      image: 'bg-gradient-to-br from-[#6B7280] to-[#4B5563]',
    },
    {
      id: 3,
      category: 'etudes',
      title: 'Étude de Cas: Comment TechCorp a Augmenté ses Ventes de 150%',
      excerpt:
        "Cas d'étude détaillé montrant comment nos solutions ont transformé le pipeline commercial d'une entreprise leader...",
      date: '8 Février 2026',
      author: 'Jean Lefebvre',
      readTime: '10 min de lecture',
      image: 'bg-gradient-to-br from-[#059669] to-[#027a48]',
    },
    {
      id: 4,
      category: 'conseils',
      title: 'Guide Complet: Scripts de Prospection Efficaces',
      excerpt:
        'Les meilleurs scripts télephoniques et les techniques de communication qui convertissent vraiment les prospects...',
      date: '5 Février 2026',
      author: 'Marie Rousseau',
      readTime: '8 min de lecture',
      image: 'bg-gradient-to-br from-[#1e3a8a] to-[#1e1b4b]',
    },
    {
      id: 5,
      category: 'technologie',
      title: 'Les Meilleurs Outils de Prospection en 2026',
      excerpt:
        "Comparaison complète des outils CRM, d'automatisation et de prospection les plus performants du marché...",
      date: '1 Février 2026',
      author: 'Philippe Leroy',
      readTime: '9 min de lecture',
      image: 'bg-gradient-to-br from-[#7c3aed] to-[#5b21b6]',
    },
    {
      id: 6,
      category: 'legislation',
      title:
        'Législation Québécoise: Ce que Vous Devez Savoir sur la Prospection',
      excerpt:
        'Guide complet de la conformité légale pour vos campagnes de prospection téléphonique au Québec...',
      date: '28 Janvier 2026',
      author: 'Nathalie Gagnon',
      readTime: '6 min de lecture',
      image: 'bg-gradient-to-br from-[#ea580c] to-[#c2410c]',
    },
  ];

  const filteredBlogs =
    selectedCategory === 'all'
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Blog & Ressources
            </h1>
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Restez informé des dernières tendances, stratégies et insights du
            domaine de la prospection commerciale.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[
            'Tous',
            'Conseils',
            'Tendances',
            'Études',
            'Technologie',
            'Législation',
          ].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === 'Tous' ? 'all' : category.toLowerCase(),
                )
              }
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory ===
                (category === 'Tous' ? 'all' : category.toLowerCase())
                  ? 'bg-[#D71C1C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div
                className={`h-48 ${blog.image} flex items-center justify-center text-white text-4xl font-bold`}
              >
                {blog.id}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#D71C1C] uppercase">
                    {blog.category}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{blog.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-[#D71C1C] transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{blog.date}</span>
                  </div>
                </div>

                {/* Read More */}
                <button className="mt-4 text-[#D71C1C] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16 mt-16">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ne manquez aucun Article
          </h2>
          <p className="text-gray-600 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir les derniers
            articles, conseils et ressources directement dans votre boîte de
            réception.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C]"
            />
            <button className="bg-[#D71C1C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B01818] transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
