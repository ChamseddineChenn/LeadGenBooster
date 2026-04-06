import {
  Eye,
  CalendarCheck,
  FileText,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Visiteurs ce mois',
      value: '0',
      change: '—',
      trend: 'up',
      icon: Eye,
    },
    {
      title: 'Rendez-vous planifiés',
      value: '0',
      change: '—',
      trend: 'up',
      icon: CalendarCheck,
    },
    {
      title: 'Demandes de devis',
      value: '0',
      change: '—',
      trend: 'up',
      icon: FileText,
    },
    {
      title: 'Abonnés Newsletter',
      value: '0',
      change: '—',
      trend: 'up',
      icon: Mail,
    },
  ];

  const recentMeetings = [];
  const recentQuotations = [];

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
          </div>
          {recentMeetings.length === 0 ? (
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
                  {recentMeetings.map((meeting, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-black text-sm">
                          {meeting.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {meeting.company}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {meeting.date}
                        </div>
                        <div className="text-xs text-gray-500">
                          {meeting.time}
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
          {recentQuotations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
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
                  {recentQuotations.map((quote, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-black text-sm">
                          {quote.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {quote.client}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-black">
                          {quote.amount}
                        </div>
                        <div className="text-xs text-gray-500">
                          {quote.service}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            quote.status === 'accepté'
                              ? 'bg-green-100 text-green-700'
                              : quote.status === 'envoyé'
                                ? 'bg-blue-100 text-blue-700'
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
