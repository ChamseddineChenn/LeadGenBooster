// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, Users, BarChart3, Clock } from 'lucide-react';

const SocialProof = () => {
  const metrics = [
    {
      icon: CheckCircle,
      value: '+120 000',
      label: 'appels effectués',
      color: '#E10C14',
    },
    {
      icon: BarChart3,
      value: '12–35 %',
      label: 'taux de conversion moyen',
      color: '#000000',
    },
    {
      icon: Users,
      value: '200+',
      label: 'clients satisfaits',
      color: '#E10C14',
    },
    {
      icon: Clock,
      value: '< 72h',
      label: 'mise en place',
      color: '#000000',
    },
  ];

  // Placeholder client logos - in a real project, replace with actual client logos
  const clientLogos = [
    { name: 'Client A', initials: 'CA' },
    { name: 'Client B', initials: 'CB' },
    { name: 'Client C', initials: 'CC' },
    { name: 'Client D', initials: 'DD' },
    { name: 'Client E', initials: 'EE' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${metric.color}15` }}
              >
                <metric.icon
                  className="w-8 h-8"
                  style={{ color: metric.color }}
                />
              </div>
              <div className="text-3xl font-bold text-[#0A2846] mb-2">
                {metric.value}
              </div>
              <div className="text-[#6D7280] font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
