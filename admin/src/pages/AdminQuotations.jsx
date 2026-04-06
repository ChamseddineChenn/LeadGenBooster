import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Trash2,
  Eye,
  Inbox,
  Loader2,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Check,
  X,
  XCircle,
  PlayCircle,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusConfig = {
  nouveau: {
    label: 'Nouveau',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  vu: {
    label: 'Vu',
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  },
  'en cours': {
    label: 'En cours',
    bg: 'bg-purple-100',
    text: 'text-purple-700',
  },
  terminé: {
    label: 'Terminé',
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  rejeté: {
    label: 'Rejeté',
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
};

const AdminQuotations = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [quotations, setQuotations] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    nouveau: 0,
    vu: 0,
    enCours: 0,
    termine: 0,
    rejete: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback
  const [message, setMessage] = useState(null);

  const fetchQuotations = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/quotations/admin/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setQuotations(data.quotations || []);
        setStats(
          data.stats || {
            total: 0,
            nouveau: 0,
            vu: 0,
            enCours: 0,
            termine: 0,
            rejete: 0,
          },
        );
      }
    } catch {
      console.error('Failed to fetch quotations');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) fetchQuotations();
  }, [accessToken, fetchQuotations]);

  const filteredQuotations = quotations.filter((q) => {
    const fullName = `${q.firstName} ${q.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.company &&
        q.company.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && q.status === filterStatus;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/quotations/admin/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        setQuotations((prev) => prev.filter((q) => q._id !== deleteId));
        setStats((prev) => ({ ...prev, total: prev.total - 1 }));
        setMessage({ type: 'success', text: 'Devis supprimé' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' });
    } finally {
      setDeleting(false);
      setDeleteId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'short',
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Devis</h1>
          <p className="text-gray-500 mt-1">
            Gérez les demandes de devis reçues.
          </p>
        </div>
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filterStatus === 'all'
              ? 'border-[#D71C1C] ring-2 ring-red-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <FileText className="w-6 h-6 text-[#D71C1C] mb-1.5" />
          <div className="text-xl font-bold text-black">{stats.total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </button>
        <button
          onClick={() => setFilterStatus('nouveau')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filterStatus === 'nouveau'
              ? 'border-blue-500 ring-2 ring-blue-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <AlertCircle className="w-6 h-6 text-blue-500 mb-1.5" />
          <div className="text-xl font-bold text-blue-600">{stats.nouveau}</div>
          <div className="text-xs text-gray-500">Nouveau</div>
        </button>
        <button
          onClick={() => setFilterStatus('vu')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filterStatus === 'vu'
              ? 'border-gray-500 ring-2 ring-gray-200'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <Eye className="w-6 h-6 text-gray-500 mb-1.5" />
          <div className="text-xl font-bold text-gray-600">{stats.vu}</div>
          <div className="text-xs text-gray-500">Vu</div>
        </button>
        <button
          onClick={() => setFilterStatus('en cours')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filterStatus === 'en cours'
              ? 'border-purple-500 ring-2 ring-purple-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <PlayCircle className="w-6 h-6 text-purple-500 mb-1.5" />
          <div className="text-xl font-bold text-purple-600">
            {stats.enCours}
          </div>
          <div className="text-xs text-gray-500">En cours</div>
        </button>
        <button
          onClick={() => setFilterStatus('terminé')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filterStatus === 'terminé'
              ? 'border-green-500 ring-2 ring-green-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <CheckCircle className="w-6 h-6 text-green-500 mb-1.5" />
          <div className="text-xl font-bold text-green-600">
            {stats.termine}
          </div>
          <div className="text-xs text-gray-500">Terminé</div>
        </button>
        <button
          onClick={() => setFilterStatus('rejeté')}
          className={`bg-white rounded-xl p-4 border transition-all text-left ${
            filterStatus === 'rejeté'
              ? 'border-red-500 ring-2 ring-red-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <XCircle className="w-6 h-6 text-red-400 mb-1.5" />
          <div className="text-xl font-bold text-red-500">{stats.rejete}</div>
          <div className="text-xs text-gray-500">Rejeté</div>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou entreprise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Client
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Service
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Budget
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Statut
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Inbox className="w-12 h-12 mb-3" />
                      <p className="text-sm font-medium">Aucun devis</p>
                      <p className="text-xs mt-1">
                        Les demandes de devis apparaîtront ici.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredQuotations.map((q) => {
                  const sc = statusConfig[q.status] || statusConfig.nouveau;
                  return (
                    <tr
                      key={q._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/quotations/${q._id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-black text-sm">
                          {q.firstName} {q.lastName}
                        </div>
                        <div className="text-xs text-gray-500 break-all">
                          {q.email}
                        </div>
                        {q.company && (
                          <div className="text-xs text-gray-400">
                            {q.company}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {q.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {q.budget || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(q.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}
                        >
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/quotations/${q._id}`);
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                            title="Voir"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(q._id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-black mb-2">
              Supprimer ce devis ?
            </h3>
            <p className="text-gray-600 mb-6">
              Cette action est irréversible. Le devis sera définitivement
              supprimé.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
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

export default AdminQuotations;
