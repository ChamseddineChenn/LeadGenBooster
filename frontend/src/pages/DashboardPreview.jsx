// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Activity,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Clock,
} from 'lucide-react';
import { useState } from 'react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = [
    { icon: Activity, label: 'Taux de contact', value: 'Élevé', change: '▲' },
    { icon: Users, label: 'Leads qualifiés', value: 'Croissant', change: '▲' },
    { icon: Calendar, label: 'Rendez-vous', value: 'Actif', change: '▲' },
    {
      icon: TrendingUp,
      label: 'Taux de conversion',
      value: 'Optimal',
      change: '▲',
    },
  ];

  const recentCalls = [
    {
      name: 'Marie Tremblay',
      status: 'Qualifié',
      time: '10:30',
      duration: '12 min',
    },
    {
      name: 'Jean Dubois',
      status: 'Rendez-vous',
      time: '11:15',
      duration: '8 min',
    },
    {
      name: 'Sophie Martin',
      status: 'À rappeler',
      time: '14:45',
      duration: '6 min',
    },
    {
      name: 'Pierre Gagnon',
      status: 'Non intéressé',
      time: '16:20',
      duration: '4 min',
    },
  ];

  return (
    <section id="resultats" className="py-20 bg-white">
      <div className="container">
        <div className="grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-[#E10C14]/10 text-[#E10C14] font-semibold px-4 py-2 rounded-full mb-6">
              <Eye className="w-4 h-4" />
              <span>Tableau de bord en temps réel</span>
            </div>

            <h2 className="heading-2 mb-6">
              Transparence totale sur vos résultats
            </h2>

            <p className="paragraph-lg mb-8">
              Suivez vos appels, taux de contact, conversions et rendez-vous en
              temps réel grâce à notre tableau de bord.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {[
                'Données mises à jour en temps réel',
                'Export des rapports en PDF/Excel',
                "Accès permanent depuis n'importe quel appareil",
                'Alertes automatiques sur objectifs',
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-[#E10C14]/10 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-[#E10C14] rounded-full"></div>
                  </div>
                  <span className="text-[#222222]">{feature}</span>
                </div>
              ))}
            </div>

            <button className="btn-secondary m-2">Demander une démo</button>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dashboard Container */}
            <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-[#2a2a2a] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-[#E10C14] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#000000] rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  <span className="text-white/80 font-medium">
                    Dashboard LeadGen Booster
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-sm">
                    Dernière mise à jour : il y a 5 min
                  </span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Tabs */}
                <div className="flex space-x-4 mb-8">
                  {['overview', 'performance', 'agents', 'analytics'].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? 'bg-[#E10C14] text-white'
                            : 'bg-[#E10C14]/10 text-[#E10C14] hover:bg-[#E10C14]/20'
                        }`}
                      >
                        {tab === 'overview'
                          ? "Vue d'ensemble"
                          : tab === 'performance'
                            ? 'Performance'
                            : tab === 'agents'
                              ? 'Agents'
                              : 'Analytique'}
                      </button>
                    ),
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {metrics.map((metric, index) => (
                    <div key={index} className="bg-[#132D4F] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <metric.icon className="w-5 h-5 text-[#1CA7A6]" />
                        <span className="text-sm text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded">
                          {metric.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-white/60">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Calls Table */}
                <div className="bg-[#132D4F] rounded-xl p-4">
                  <h4 className="text-white font-medium mb-4">
                    Appels récents
                  </h4>
                  <div className="space-y-3">
                    {recentCalls.map((call, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="text-white font-medium">
                            {call.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {call.time} • {call.duration}
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            call.status === 'Qualifié'
                              ? 'bg-green-400/10 text-green-400'
                              : call.status === 'Rendez-vous'
                                ? 'bg-blue-400/10 text-blue-400'
                                : call.status === 'À rappeler'
                                  ? 'bg-yellow-400/10 text-yellow-400'
                                  : 'bg-red-400/10 text-red-400'
                          }`}
                        >
                          {call.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call Activity Chart Placeholder */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-medium">
                      Activité des appels (7 derniers jours)
                    </h4>
                    <span className="text-white/60 text-sm">
                      En hausse vs semaine dernière
                    </span>
                  </div>
                  <div className="h-32 flex items-end space-x-2">
                    {[40, 65, 80, 60, 90, 70, 85].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-linear-to-t from-[#1CA7A6] to-[#1CA7A6]/50 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-white/40 mt-2">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mer</span>
                    <span>Jeu</span>
                    <span>Ven</span>
                    <span>Sam</span>
                    <span>Dim</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-[#FF9B42]/10 rounded-full -z-10"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#1CA7A6]/10 rounded-full -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
