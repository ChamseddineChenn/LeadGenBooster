import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Trash2,
  Mail,
  Download,
  Users,
  Inbox,
  Loader2,
  CheckCircle,
  Clock,
  UserX,
  X,
  Send,
  AlertCircle,
  Check,
  Paperclip,
} from 'lucide-react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Use inline-style alignment so text-align survives in email clients.
// Class-based ql-align-* is stripped by Gmail / Outlook.
const AlignStyle = Quill.import('attributors/style/align');
if (AlignStyle) Quill.register(AlignStyle, true);

// Static modules — no custom toolbar handler needed because images are
// auto-uploaded via the onChange handler below (catches paste/drag-drop too).
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'align',
  'link',
];

const AdminNewsletter = () => {
  const { accessToken } = useAuth();
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    unsubscribed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Campaign modal
  const [showCampaign, setShowCampaign] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [campaignAttachments, setCampaignAttachments] = useState([]);
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [campaignResult, setCampaignResult] = useState(null);

  // Feedback message
  const [message, setMessage] = useState(null);

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/newsletter/admin/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data.subscribers || []);
        setStats(
          data.stats || { total: 0, confirmed: 0, pending: 0, unsubscribed: 0 },
        );
      }
    } catch {
      console.error('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) fetchSubscribers();
  }, [accessToken, fetchSubscribers]);

  const getStatus = (sub) => {
    if (sub.unsubscribed) return 'unsubscribed';
    if (sub.isConfirmed) return 'confirmed';
    return 'pending';
  };

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = sub.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && getStatus(sub) === filterStatus;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/newsletter/admin/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s._id !== deleteId));
        setStats((prev) => ({ ...prev, total: prev.total - 1 }));
        setMessage({ type: 'success', text: 'Abonné supprimé' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' });
    } finally {
      setDeleting(false);
      setDeleteId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch(`${API_URL}/newsletter/admin/export-csv`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'newsletter-subscribers.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch {
      setMessage({ type: 'error', text: "Erreur lors de l'export" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSendCampaign = async () => {
    const cleanContent = campaignContent.replace(/<(.|\n)*?>/g, '').trim();
    if (!campaignSubject.trim() || !cleanContent) return;
    setSendingCampaign(true);
    setCampaignResult(null);
    try {
      const formData = new FormData();
      formData.append('subject', campaignSubject);
      formData.append('content', campaignContent);
      campaignAttachments.forEach((file) =>
        formData.append('attachments', file),
      );

      const res = await fetch(`${API_URL}/newsletter/admin/campaign`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Do NOT set Content-Type — browser sets it with boundary for FormData
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCampaignResult({ type: 'success', ...data });
      } else {
        setCampaignResult({ type: 'error', message: data.message });
      }
    } catch {
      setCampaignResult({ type: 'error', message: 'Erreur de connexion' });
    } finally {
      setSendingCampaign(false);
    }
  };

  const closeCampaignModal = () => {
    setShowCampaign(false);
    setCampaignSubject('');
    setCampaignContent('');
    setCampaignAttachments([]);
    setCampaignResult(null);
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
          <h1 className="text-3xl font-bold text-black">Newsletter</h1>
          <p className="text-gray-500 mt-1">
            Gérez vos abonnés et envoyez des campagnes email.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 border-2 border-black text-black px-4 py-2.5 rounded-lg font-semibold hover:bg-black/5 transition-colors"
          >
            <Download className="w-5 h-5" />
            Exporter CSV
          </button>
          <button
            onClick={() => setShowCampaign(true)}
            className="flex items-center gap-2 bg-[#D71C1C] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-[#B01818] transition-colors"
          >
            <Mail className="w-5 h-5" />
            Nouvelle Campagne
          </button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`bg-white rounded-xl p-5 border transition-all text-left ${
            filterStatus === 'all'
              ? 'border-[#D71C1C] ring-2 ring-red-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <Users className="w-7 h-7 text-[#D71C1C] mb-2" />
          <div className="text-2xl font-bold text-black">{stats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </button>
        <button
          onClick={() => setFilterStatus('confirmed')}
          className={`bg-white rounded-xl p-5 border transition-all text-left ${
            filterStatus === 'confirmed'
              ? 'border-green-500 ring-2 ring-green-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <CheckCircle className="w-7 h-7 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-green-600">
            {stats.confirmed}
          </div>
          <div className="text-sm text-gray-500">Confirmés</div>
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`bg-white rounded-xl p-5 border transition-all text-left ${
            filterStatus === 'pending'
              ? 'border-yellow-500 ring-2 ring-yellow-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <Clock className="w-7 h-7 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-500">En attente</div>
        </button>
        <button
          onClick={() => setFilterStatus('unsubscribed')}
          className={`bg-white rounded-xl p-5 border transition-all text-left ${
            filterStatus === 'unsubscribed'
              ? 'border-red-500 ring-2 ring-red-100'
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <UserX className="w-7 h-7 text-red-400 mb-2" />
          <div className="text-2xl font-bold text-red-500">
            {stats.unsubscribed}
          </div>
          <div className="text-sm text-gray-500">Désabonnés</div>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par email..."
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
                  Email
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Inscription
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
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Inbox className="w-12 h-12 mb-3" />
                      <p className="text-sm font-medium">Aucun abonné</p>
                      <p className="text-xs mt-1">
                        Les abonnés newsletter apparaîtront ici.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => {
                  const status = getStatus(sub);
                  return (
                    <tr
                      key={sub._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-black break-all">
                          {sub.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(sub.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {status === 'confirmed'
                            ? 'Confirmé'
                            : status === 'pending'
                              ? 'En attente'
                              : 'Désabonné'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setDeleteId(sub._id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-black mb-2">
              Supprimer cet abonné ?
            </h3>
            <p className="text-gray-600 mb-6">Cette action est irréversible.</p>
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

      {/* Campaign Modal */}
      {showCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-black">
                  Nouvelle Campagne
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Envoyez un email à tous les abonnés confirmés (
                  {stats.confirmed})
                </p>
              </div>
              <button
                onClick={closeCampaignModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {campaignResult && (
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 text-sm ${
                    campaignResult.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {campaignResult.type === 'success' ? (
                    <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{campaignResult.message}</p>
                    {campaignResult.sent !== undefined && (
                      <p className="mt-1 text-xs opacity-80">
                        {campaignResult.sent} envoyé(s) •{' '}
                        {campaignResult.failed} échec(s)
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Sujet de l&apos;email
                </label>
                <input
                  type="text"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  placeholder="Ex: Notre actualité du mois"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Contenu de l&apos;email
                </label>
                <div className="rounded-lg border border-gray-200 overflow-hidden [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-sm">
                  <ReactQuill
                    theme="snow"
                    value={campaignContent}
                    onChange={setCampaignContent}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Rédigez le contenu de votre campagne..."
                  />
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Pièces jointes{' '}
                  <span className="font-normal text-gray-400">
                    (optionnel, max 5 fichiers × 10 Mo)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#D71C1C] hover:bg-red-50/40 transition-colors text-sm text-gray-600">
                  <Paperclip className="w-4 h-4" />
                  Ajouter des fichiers
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setCampaignAttachments((prev) =>
                        [...prev, ...files].slice(0, 5),
                      );
                      e.target.value = '';
                    }}
                  />
                </label>
                {campaignAttachments.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {campaignAttachments.map((file, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Paperclip className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate max-w-[300px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({(file.size / 1024).toFixed(0)} Ko)
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setCampaignAttachments((prev) =>
                              prev.filter((_, idx) => idx !== i),
                            )
                          }
                          className="ml-auto text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={closeCampaignModal}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSendCampaign}
                disabled={
                  sendingCampaign ||
                  !campaignSubject.trim() ||
                  !campaignContent.replace(/<(.|\n)*?>/g, '').trim()
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D71C1C] text-white font-semibold hover:bg-[#B01818] transition-colors disabled:opacity-50"
              >
                {sendingCampaign ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Envoyer la campagne
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletter;
