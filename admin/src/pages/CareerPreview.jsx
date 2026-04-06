import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  Loader2,
  Edit,
  DollarSign,
  CheckCircle,
  Star,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const typeLabels = {
  'temps-plein': 'Temps plein',
  'temps-partiel': 'Temps partiel',
  contrat: 'Contrat',
  stage: 'Stage',
};

const CareerPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareer = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/careers/admin/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        if (res.ok) {
          setCareer(data);
        } else {
          setError(data.message || 'Poste introuvable');
        }
      } catch {
        setError('Impossible de charger le poste');
      } finally {
        setLoading(false);
      }
    };

    if (id && accessToken) fetchCareer();
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
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {error || 'Poste introuvable'}
        </h1>
        <p className="text-gray-500 mb-6">
          Le poste que vous cherchez n'existe pas ou a été supprimé.
        </p>
        <button
          onClick={() => navigate('/careers')}
          className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux carrières
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Back + Edit */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/careers')}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D71C1C] transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux carrières
        </button>
        <button
          onClick={() => navigate(`/careers/edit/${career._id}`)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D71C1C] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
        >
          <Edit className="w-4 h-4" />
          Modifier
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        {/* Category badge */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-semibold text-[#D71C1C] uppercase tracking-wider">
            {career.category}
          </span>
          {!career.isPublished && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              🔒 Brouillon
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
          {career.title}
        </h1>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D71C1C]" />
            <span>{career.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#D71C1C]" />
            <span>{typeLabels[career.type] || career.type}</span>
          </div>
          {career.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Publié le {formatDate(career.publishedAt)}</span>
            </div>
          )}
          {career.closingDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Clôture le {formatDate(career.closingDate)}</span>
            </div>
          )}
        </div>

        {/* Salary */}
        {career.salary &&
          career.salary.isVisible &&
          (career.salary.min || career.salary.max) && (
            <div className="mt-4 flex items-center gap-2 text-[#D71C1C] font-semibold">
              <DollarSign className="w-5 h-5" />
              <span>
                {career.salary.min && career.salary.max
                  ? `${career.salary.min.toLocaleString()} $ - ${career.salary.max.toLocaleString()} $`
                  : career.salary.min
                    ? `À partir de ${career.salary.min.toLocaleString()} $`
                    : `Jusqu'à ${career.salary.max.toLocaleString()} $`}
              </span>
            </div>
          )}
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <h2 className="text-xl font-bold text-black mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {career.description}
        </p>
      </div>

      {/* Responsibilities */}
      {career.responsibilities?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Responsabilités</h2>
          <ul className="space-y-3">
            {career.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#D71C1C] mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {career.requirements?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Exigences</h2>
          <ul className="space-y-3">
            {career.requirements.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <Star className="w-5 h-5 text-[#D71C1C] mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {career.benefits?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Avantages</h2>
          <ul className="space-y-3">
            {career.benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <Award className="w-5 h-5 text-[#D71C1C] mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareerPreview;
