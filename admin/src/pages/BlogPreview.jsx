import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Loader2,
  BookOpen,
  Edit,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Replace non-breaking spaces (&nbsp; / \u00A0) with regular spaces.
 * Quill encodes every space as &nbsp;, which prevents the browser from
 * wrapping text naturally and causes words to be cut in the middle.
 * Blank Quill paragraphs are normalized so intentional empty lines still render.
 */
const sanitizeHtml = (html) => {
  if (!html) return html;
  const cleaned = html.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
  if (typeof document === 'undefined') return cleaned;
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');
  doc.body.querySelectorAll('p').forEach((p) => {
    if (p.querySelector('img, video, iframe, picture, svg')) return;
    const text = p.textContent
      .replace(/\u200b/g, '')
      .replace(/\u00a0/g, ' ')
      .trim();
    if (text !== '') return;
    p.innerHTML = '<br>';
  });
  return doc.body.innerHTML;
};

const BlogPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/blogs/admin/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        if (res.ok) {
          setBlog(data);
        } else {
          setError(data.message || 'Article introuvable');
        }
      } catch {
        setError("Impossible de charger l'article");
      } finally {
        setLoading(false);
      }
    };

    if (id && accessToken) fetchBlog();
  }, [id, accessToken]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-[800px] mx-auto px-4 py-20 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || 'Article introuvable'}
          </h1>
          <p className="text-gray-500 mb-6">
            L'article que vous cherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </button>
        </div>
      </div>
    );
  }

  // Render a content block
  const renderBlock = (block, index) => {
    switch (block.type) {
      case 'title':
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold mt-10 mb-4"
            style={{ color: block.color || '#1f2937' }}
          >
            {block.content}
          </h2>
        );
      case 'paragraph':
        return (
          <div
            key={index}
            className="blog-content text-gray-700 leading-relaxed mb-6 text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.content) }}
          />
        );
      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={block.content}
              alt=""
              className="w-full max-w-full rounded-lg shadow-sm"
              loading="lazy"
            />
          </figure>
        );
      default:
        return null;
    }
  };

  const sortedBlocks = [...(blog.contentBlocks || [])].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-4 pt-8 pb-4">
        {/* Back link with Edit button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D71C1C] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </button>
          <button
            onClick={() => navigate(`/blogs/edit/${blog._id}`)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D71C1C] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#D71C1C] uppercase tracking-wider">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-200">
          {blog.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
          )}
          {blog.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          )}
          {blog.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min de lecture</span>
            </div>
          )}
          {blog.views > 0 && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{blog.views} vues</span>
            </div>
          )}
          {!blog.isPublished && (
            <div className="flex items-center gap-1.5 text-orange-600 font-semibold">
              <span>🔒 Brouillon</span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="max-w-[800px] mx-auto px-4 py-8">
        {sortedBlocks.length > 0
          ? sortedBlocks.map(renderBlock)
          : /* Fallback for older blogs with flat content */
            blog.content && (
              <div
                className="blog-content text-gray-700 leading-relaxed text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
              />
            )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-600 mb-3">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPreview;
