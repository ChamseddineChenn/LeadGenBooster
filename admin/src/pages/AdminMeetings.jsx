import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Inbox,
  Loader2,
  Trash2,
  Settings,
  X,
  Check,
  Building2,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DAY_LABELS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const AdminMeetings = () => {
  const { accessToken } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    confirme: 0,
    annule: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [savingAvailability, setSavingAvailability] = useState(false);

  const fetchMeetings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/meetings/admin/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMeetings(data.meetings || []);
        setStats(data.stats || {});
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de chargement' });
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const fetchAvailability = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/meetings/admin/availability`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (res.ok) setAvailability(data);
    } catch {
      // silent
    }
  }, [accessToken]);

  useEffect(() => {
    fetchMeetings();
    fetchAvailability();
  }, [fetchMeetings, fetchAvailability]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/meetings/admin/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: `Rendez-vous ${status}` });
        fetchMeetings();
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' });
    }
  };

  const deleteMeeting = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`${API_URL}/meetings/admin/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Rendez-vous supprimé' });
        fetchMeetings();
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' });
    } finally {
      setDeleteId(null);
    }
  };

  const saveAvailability = async () => {
    setSavingAvailability(true);
    try {
      const res = await fetch(`${API_URL}/meetings/admin/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          activeDays: availability.activeDays,
          startHour: availability.startHour,
          endHour: availability.endHour,
          lunchStart: availability.lunchStart,
          lunchEnd: availability.lunchEnd,
          slotDuration: availability.slotDuration,
          maxAdvanceDays: availability.maxAdvanceDays,
          blockedDates: availability.blockedDates,
        }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Disponibilité mise à jour' });
        setShowSettings(false);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Erreur' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion' });
    } finally {
      setSavingAvailability(false);
    }
  };

  const toggleDay = (day) => {
    if (!availability) return;
    const days = availability.activeDays.includes(day)
      ? availability.activeDays.filter((d) => d !== day)
      : [...availability.activeDays, day].sort();
    setAvailability({ ...availability, activeDays: days });
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const filteredMeetings = meetings.filter((m) => {
    const matchesSearch =
      `${m.firstName} ${m.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (m.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
      </div>
    );
  }

  return (
    <div>
      {/* Toast */}
      {message && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {message.text}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-black mb-2">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce rendez-vous ?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={deleteMeeting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">
            Rendez-vous Planifiés
          </h1>
          <p className="text-gray-500 mt-1">
            Suivez et gérez tous les rendez-vous avec vos clients.
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <Settings className="w-4 h-4" />
          Disponibilité
        </button>
      </div>

      {/* Availability Settings Panel */}
      {showSettings && availability && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-black">
              Paramètres de disponibilité
            </h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Days */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Jours actifs
              </label>
              <div className="flex flex-wrap gap-2">
                {DAY_LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => toggleDay(i)}
                    className={`w-12 h-12 rounded-lg text-sm font-semibold transition-all ${
                      availability.activeDays.includes(i)
                        ? 'bg-[#D71C1C] text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Heures de travail
              </label>
              <div className="flex items-center gap-3">
                <select
                  value={availability.startHour}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      startHour: parseInt(e.target.value),
                    })
                  }
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C]"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
                <span className="text-gray-500 font-medium">à</span>
                <select
                  value={availability.endHour}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      endHour: parseInt(e.target.value),
                    })
                  }
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C]"
                >
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lunch Break */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Pause déjeuner
              </label>
              <div className="flex items-center gap-3">
                <select
                  value={availability.lunchStart ?? 12}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      lunchStart: parseInt(e.target.value),
                    })
                  }
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C]"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
                <span className="text-gray-500 font-medium">à</span>
                <select
                  value={availability.lunchEnd ?? 14}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      lunchEnd: parseInt(e.target.value),
                    })
                  }
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C]"
                >
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Slot Duration */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Durée du créneau
              </label>
              <div className="flex gap-3">
                {[60, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() =>
                      setAvailability({ ...availability, slotDuration: d })
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      availability.slotDuration === d
                        ? 'bg-[#D71C1C] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Max Advance Days */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Réservation max (jours à l&apos;avance)
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={availability.maxAdvanceDays}
                onChange={(e) =>
                  setAvailability({
                    ...availability,
                    maxAdvanceDays: parseInt(e.target.value) || 30,
                  })
                }
                className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] w-24"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={saveAvailability}
              disabled={savingAvailability}
              className="px-6 py-2.5 bg-[#D71C1C] text-white rounded-lg font-semibold hover:bg-[#B01818] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {savingAvailability ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            key: 'all',
            label: 'Total',
            count: stats.total,
            icon: CalendarCheck,
            color: 'text-[#D71C1C]',
          },
          {
            key: 'en attente',
            label: 'En Attente',
            count: stats.enAttente,
            icon: Clock,
            color: 'text-yellow-600',
          },
          {
            key: 'confirmé',
            label: 'Confirmés',
            count: stats.confirme,
            icon: CheckCircle,
            color: 'text-green-600',
          },
          {
            key: 'annulé',
            label: 'Annulés',
            count: stats.annule,
            icon: XCircle,
            color: 'text-red-500',
          },
        ].map((card) => (
          <div
            key={card.key}
            className={`rounded-xl p-6 shadow-sm border cursor-pointer transition-all ${
              filter === card.key
                ? 'bg-[#D71C1C] text-white border-[#D71C1C]'
                : 'bg-white border-gray-100 hover:shadow-md'
            }`}
            onClick={() => setFilter(card.key)}
          >
            <card.icon
              className={`w-8 h-8 mb-3 ${filter === card.key ? 'text-white' : card.color}`}
            />
            <div
              className={`text-2xl font-bold ${filter === card.key ? 'text-white' : 'text-black'}`}
            >
              {card.count}
            </div>
            <div
              className={`text-sm ${filter === card.key ? 'text-white/80' : 'text-gray-500'}`}
            >
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, entreprise ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C]"
          />
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Inbox className="w-12 h-12 mb-3" />
              <p className="text-sm font-medium">Aucun rendez-vous</p>
              <p className="text-xs mt-1">
                Les rendez-vous planifiés apparaîtront ici.
              </p>
            </div>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-black">
                      {meeting.firstName} {meeting.lastName}
                    </h3>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        meeting.status === 'confirmé'
                          ? 'bg-green-100 text-green-700'
                          : meeting.status === 'en attente'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </div>

                  {meeting.company && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
                      <Building2 className="w-4 h-4" />
                      {meeting.company}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarCheck className="w-4 h-4" />
                      {formatDate(meeting.date)} à {meeting.timeSlot}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {meeting.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {meeting.email}
                    </div>
                  </div>

                  {meeting.service && (
                    <div className="inline-block bg-[#D71C1C]/10 px-3 py-1 rounded-lg text-sm font-medium text-[#D71C1C] mb-2">
                      {meeting.service}
                    </div>
                  )}

                  {meeting.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg mt-2">
                      <strong>Notes:</strong> {meeting.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4 shrink-0">
                  {meeting.status === 'en attente' && (
                    <>
                      <button
                        onClick={() => updateStatus(meeting._id, 'confirmé')}
                        className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        title="Confirmer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStatus(meeting._id, 'annulé')}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        title="Annuler"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setDeleteId(meeting._id)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMeetings;
