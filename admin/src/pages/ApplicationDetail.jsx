import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Download,
  FileText,
  Trash2,
  Save,
  Check,
  AlertCircle,
  MessageSquare,
  User,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusOptions = [
  {
    value: 'nouveau',
    label: 'Nouveau',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    ring: 'ring-blue-300',
  },
  {
    value: 'vu',
    label: 'Vu',
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    ring: 'ring-gray-300',
  },
  {
    value: 'entretien',
    label: 'Entretien',
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    ring: 'ring-purple-300',
  },
  {
    value: 'accepté',
    label: 'Accepté',
    bg: 'bg-green-100',
    text: 'text-green-700',
    ring: 'ring-green-300',
  },
  {
    value: 'rejeté',
    label: 'Rejeté',
    bg: 'bg-red-100',
    text: 'text-red-700',
    ring: 'ring-red-300',
  },
];

const typeLabels = {
  'temps-plein': 'Temps plein',
  'temps-partiel': 'Temps partiel',
  contrat: 'Contrat',
  stage: 'Stage',
};

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit state
  const [comment, setComment] = useState('');
  const [savingComment, setSavingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [message, setMessage] = useState(null);

  // Delete
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/applications/admin/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        if (res.ok) {
          setApplication(data);
          setComment(data.adminComment || '');
        } else {
          setError(data.message || 'Candidature introuvable');
        }
      } catch {
        setError('Impossible de charger la candidature');
      } finally {
        setLoading(false);
      }
    };

    if (id && accessToken) fetchApplication();
  }, [id, accessToken]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const updateStatus = async (newStatus) => {
    setUpdatingStatus(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/applications/admin/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplication(data);
        setMessage({ type: 'success', text: 'Statut mis à jour' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Erreur' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion' });
    } finally {
      setUpdatingStatus(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const saveComment = async () => {
    setSavingComment(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/applications/admin/${id}/comment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ adminComment: comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplication(data);
        setMessage({ type: 'success', text: 'Commentaire enregistré' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Erreur' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion' });
    } finally {
      setSavingComment(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/applications/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        navigate('/applications');
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {error || 'Candidature introuvable'}
        </h1>
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold hover:underline mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux candidatures
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/applications')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {application.firstName} {application.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              Candidature pour{' '}
              <span className="font-medium text-gray-700">
                {application.career?.title || 'Poste supprimé'}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDelete(true)}
          className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#D71C1C]" />
              Informations du candidat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">
                    Nom complet
                  </div>
                  <div className="text-sm font-medium text-black">
                    {application.firstName} {application.lastName}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg min-w-0">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 uppercase font-semibold">
                    Email
                  </div>
                  <a
                    href={`mailto:${application.email}`}
                    className="text-sm font-medium text-[#D71C1C] hover:underline break-all"
                  >
                    {application.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">
                    Téléphone
                  </div>
                  <a
                    href={`tel:${application.phone}`}
                    className="text-sm font-medium text-[#D71C1C] hover:underline"
                  >
                    {application.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">
                    Date de candidature
                  </div>
                  <div className="text-sm font-medium text-black">
                    {formatDate(application.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CV Download */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D71C1C]" />
              Curriculum Vitae
            </h2>
            <a
              href={application.cv?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#D71C1C]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#D71C1C]" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-black text-sm group-hover:text-[#D71C1C] transition-colors">
                  {application.cv?.originalName || 'CV'}
                </div>
                <div className="text-xs text-gray-400">
                  Cliquez pour télécharger
                </div>
              </div>
              <Download className="w-5 h-5 text-gray-400 group-hover:text-[#D71C1C] transition-colors" />
            </a>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#D71C1C]" />
                Lettre de motivation
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                {application.coverLetter}
              </p>
            </div>
          )}

          {/* Admin Comment */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D71C1C]" />
              Remarque interne
            </h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajoutez une remarque ou un commentaire interne..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] resize-none text-sm mb-3"
            />
            <button
              onClick={saveComment}
              disabled={savingComment}
              className="flex items-center gap-2 px-4 py-2 bg-[#D71C1C] text-white rounded-lg font-medium hover:bg-[#B01818] transition-colors text-sm disabled:opacity-50"
            >
              {savingComment ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Enregistrer
            </button>
          </div>
        </div>

        {/* Sidebar - right */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Statut
            </h3>
            <div className="space-y-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateStatus(opt.value)}
                  disabled={updatingStatus}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-2 ${
                    application.status === opt.value
                      ? `${opt.bg} ${opt.text} border-current ring-2 ${opt.ring}`
                      : 'border-transparent hover:bg-gray-50 text-gray-600'
                  } disabled:opacity-50`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      application.status === opt.value
                        ? 'bg-current'
                        : 'bg-gray-300'
                    }`}
                  />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Info */}
          {application.career && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Poste
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-[#D71C1C]" />
                  <span className="font-medium text-black">
                    {application.career.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{application.career.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {typeLabels[application.career.type] ||
                      application.career.type}
                  </span>
                </div>
                {application.career.category && (
                  <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-[#D71C1C]">
                    {application.career.category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-black mb-2">
              Supprimer cette candidature ?
            </h3>
            <p className="text-gray-600 mb-6">
              Cette action est irréversible. La candidature et le CV seront
              définitivement supprimés.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
