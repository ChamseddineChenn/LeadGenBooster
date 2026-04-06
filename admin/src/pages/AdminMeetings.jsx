import { useState } from 'react';
import {
  Search,
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Inbox,
} from 'lucide-react';

const AdminMeetings = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const meetings = [];

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || meeting.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: meetings.length,
    confirmé: meetings.filter((m) => m.status === 'confirmé').length,
    'en attente': meetings.filter((m) => m.status === 'en attente').length,
    annulé: meetings.filter((m) => m.status === 'annulé').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Rendez-vous Planifiés</h1>
        <p className="text-gray-500 mt-1">
          Suivez et gérez tous les rendez-vous avec vos clients.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div
          className={`rounded-xl p-6 shadow-sm border cursor-pointer transition-all ${
            filter === 'all'
              ? 'bg-[#D71C1C] text-white border-[#D71C1C]'
              : 'bg-white border-gray-100 hover:shadow-md'
          }`}
          onClick={() => setFilter('all')}
        >
          <CalendarCheck
            className={`w-8 h-8 mb-3 ${filter === 'all' ? 'text-white' : 'text-[#D71C1C]'}`}
          />
          <div
            className={`text-2xl font-bold ${filter === 'all' ? 'text-white' : 'text-black'}`}
          >
            {statusCounts.all}
          </div>
          <div
            className={`text-sm ${filter === 'all' ? 'text-white/80' : 'text-gray-500'}`}
          >
            Total
          </div>
        </div>
        <div
          className={`rounded-xl p-6 shadow-sm border cursor-pointer transition-all ${
            filter === 'confirmé'
              ? 'bg-[#D71C1C] text-white border-[#D71C1C]'
              : 'bg-white border-gray-100 hover:shadow-md'
          }`}
          onClick={() => setFilter('confirmé')}
        >
          <CheckCircle
            className={`w-8 h-8 mb-3 ${filter === 'confirmé' ? 'text-white' : 'text-green-600'}`}
          />
          <div
            className={`text-2xl font-bold ${filter === 'confirmé' ? 'text-white' : 'text-black'}`}
          >
            {statusCounts['confirmé']}
          </div>
          <div
            className={`text-sm ${filter === 'confirmé' ? 'text-white/80' : 'text-gray-500'}`}
          >
            Confirmés
          </div>
        </div>
        <div
          className={`rounded-xl p-6 shadow-sm border cursor-pointer transition-all ${
            filter === 'en attente'
              ? 'bg-[#D71C1C] text-white border-[#D71C1C]'
              : 'bg-white border-gray-100 hover:shadow-md'
          }`}
          onClick={() => setFilter('en attente')}
        >
          <Clock
            className={`w-8 h-8 mb-3 ${filter === 'en attente' ? 'text-white' : 'text-yellow-600'}`}
          />
          <div
            className={`text-2xl font-bold ${filter === 'en attente' ? 'text-white' : 'text-black'}`}
          >
            {statusCounts['en attente']}
          </div>
          <div
            className={`text-sm ${filter === 'en attente' ? 'text-white/80' : 'text-gray-500'}`}
          >
            En Attente
          </div>
        </div>
        <div
          className={`rounded-xl p-6 shadow-sm border cursor-pointer transition-all ${
            filter === 'annulé'
              ? 'bg-[#D71C1C] text-white border-[#D71C1C]'
              : 'bg-white border-gray-100 hover:shadow-md'
          }`}
          onClick={() => setFilter('annulé')}
        >
          <XCircle
            className={`w-8 h-8 mb-3 ${filter === 'annulé' ? 'text-white' : 'text-red-500'}`}
          />
          <div
            className={`text-2xl font-bold ${filter === 'annulé' ? 'text-white' : 'text-black'}`}
          >
            {statusCounts['annulé']}
          </div>
          <div
            className={`text-sm ${filter === 'annulé' ? 'text-white/80' : 'text-gray-500'}`}
          >
            Annulés
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou entreprise..."
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
              key={meeting.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-black">
                      {meeting.name}
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
                  <p className="text-sm text-gray-600 mb-3">
                    {meeting.company}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarCheck className="w-4 h-4" />
                      {meeting.date} à {meeting.time}
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
                  {meeting.notes && (
                    <p className="mt-3 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <strong>Notes:</strong> {meeting.notes}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="bg-[#D71C1C]/10 px-3 py-1.5 rounded-lg">
                    <p className="text-xs text-gray-500">Service</p>
                    <p className="text-sm font-semibold text-[#D71C1C]">
                      {meeting.service}
                    </p>
                  </div>
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
