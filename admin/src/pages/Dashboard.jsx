import { useState, useEffect } from 'react';
import {
  Users,
  CalendarCheck,
  FileText,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { accessToken } = useAuth();
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [recentQuotations, setRecentQuotations] = useState([]);
  const [statsData, setStatsData] = useState({
    totalMeetings: 0,
    plannedMeetings: 0,
    totalQuotations: 0,
    blogsThisMonth: 0,
  });

  useEffect(() => {
    if (!accessToken) return;

    const fetchDashboardData = async () => {
      try {
        const [meetingsRes, quotationsRes, blogsRes] = await Promise.all([
          fetch(`${API_URL}/meetings/admin/all`, { headers: { Authorization: `Bearer ${accessToken}` } }),
          fetch(`${API_URL}/quotations/admin/all`, { headers: { Authorization: `Bearer ${accessToken}` } }),
          fetch(`${API_URL}/blogs/admin/all`, { headers: { Authorization: `Bearer ${accessToken}` } }),
        ]);

        let allMeetings = [];
        let allQuotations = [];
        let allBlogs = [];

        if (meetingsRes.ok) {
          const data = await meetingsRes.json();
          allMeetings = data.meetings || [];
          const now = new Date();
          const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          const upcoming = allMeetings
            .filter((m) => {
              const d = new Date(m.date);
              return d >= now && d <= oneWeekLater && m.status !== 'annulé';
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);
          setUpcomingMeetings(upcoming);
        }

        if (quotationsRes.ok) {
          const data = await quotationsRes.json();
          allQuotations = data.quotations || [];
          setRecentQuotations(allQuotations.slice(0, 5));
        }

        if (blogsRes.ok) {
          const data = await blogsRes.json();
          allBlogs = data.blogs || data || [];
        }

        // Compute stats
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        setStatsData({
          totalMeetings: allMeetings.length,
          plannedMeetings: allMeetings.filter(
            (m) => m.status === 'planifié' || m.status === 'confirmé'
          ).length,
          totalQuotations: allQuotations.length,
          blogsThisMonth: allBlogs.filter(
            (b) => new Date(b.createdAt) >= startOfMonth
          ).length,
        });
      } catch {
        // silently fail — dashboard is non-critical
      }
    };

    fetchDashboardData();
  }, [accessToken]);
  const stats = [
    {
      title: 'Total rendez-vous',
      value: statsData.totalMeetings.toString(),
      change: '—',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Rendez-vous planifiés',
      value: statsData.plannedMeetings.toString(),
      change: '—',
      trend: 'up',
      icon: CalendarCheck,
    },
    {
      title: 'Demandes de devis',
      value: statsData.totalQuotations.toString(),
      change: '—',
      trend: 'up',
      icon: FileText,
    },
    {
      title: 'Articles ce mois',
      value: statsData.blogsThisMonth.toString(),
      change: '—',
      trend: 'up',
      icon: BookOpen,
    },
  ];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Bienvenue dans votre panneau d'administration.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#D71C1C]/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-[#D71C1C]" />
                </div>
                {stat.change !== '—' && (
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Meetings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-black">
              Prochains Rendez-vous
            </h2>
            <span className="text-xs text-gray-400">7 prochains jours</span>
          </div>
          {upcomingMeetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Inbox className="w-12 h-12 mb-3" />
              <p className="text-sm font-medium">Aucun rendez-vous</p>
              <p className="text-xs mt-1">Les rendez-vous apparaîtront ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Client
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {upcomingMeetings.map((meeting) => (
                    <tr
                      key={meeting._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-black text-sm">
                          {meeting.firstName} {meeting.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {meeting.company || meeting.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {formatDate(meeting.date)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {meeting.timeSlot}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            meeting.status === 'confirmé'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {meeting.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Quotations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-black">Derniers Devis</h2>
          </div>
          {recentQuotations.length === 0 ? (            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Inbox className="w-12 h-12 mb-3" />
              <p className="text-sm font-medium">Aucun devis</p>
              <p className="text-xs mt-1">Les devis apparaîtront ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Devis
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Montant
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentQuotations.map((quote) => (
                    <tr
                      key={quote._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-black text-sm">
                          #{quote._id.slice(-6).toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {quote.firstName} {quote.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-black">
                          {quote.budget || '—'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {quote.service}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            quote.status === 'terminé'
                              ? 'bg-green-100 text-green-700'
                              : quote.status === 'en cours'
                                ? 'bg-blue-100 text-blue-700'
                                : quote.status === 'rejeté'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {quote.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
