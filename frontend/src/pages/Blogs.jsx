import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, BookOpen, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import NewsletterForm from '../components/NewsletterForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="col-span-full flex flex-col items-center justify-center py-20"
  >
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
    >
      <BookOpen className="w-12 h-12 text-gray-400" />
    </motion.div>
    <h3 className="text-2xl font-bold text-gray-800 mb-2">
      Aucun article pour le moment
    </h3>
    <p className="text-gray-500 text-center max-w-md">
      Nous préparons du contenu de qualité pour vous. Revenez bientôt pour
      découvrir nos derniers articles et conseils en prospection commerciale.
    </p>
  </motion.div>
);

const LoadingState = () => (
  <div className="col-span-full flex items-center justify-center py-20">
    <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
  </div>
);

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const url =
          selectedCategory === 'all'
            ? `${API_URL}/blogs`
            : `${API_URL}/blogs?category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setBlogs(data.blogs || []);
        } else {
          setError(data.message || 'Erreur lors du chargement');
        }
      } catch {
        setError('Impossible de charger les articles');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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
            { label: 'Tous', value: 'all' },
            { label: 'Conseils', value: 'conseils' },
            { label: 'Tendances', value: 'tendances' },
            { label: 'Études', value: 'etudes' },
            { label: 'Technologie', value: 'technologie' },
            { label: 'Législation', value: 'legislation' },
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-[#D71C1C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <LoadingState />
          ) : blogs.length === 0 ? (
            <EmptyState />
          ) : (
            blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                >
                  {/* Image */}
                  <div
                    className={`h-48 ${blog.coverGradient || 'bg-gradient-to-br from-[#D71C1C] to-[#B01818]'} flex items-center justify-center text-white text-4xl font-bold`}
                  >
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="w-12 h-12" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#D71C1C] uppercase">
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {blog.readTime} min de lecture
                      </span>
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
                        <span className="text-xs text-gray-600">
                          {blog.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {formatDate(blog.publishedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Read More */}
                    <button className="mt-4 text-[#D71C1C] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              </Link>
            ))
          )}
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
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default Blogs;
