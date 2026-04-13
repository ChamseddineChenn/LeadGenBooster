// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, Users, BarChart3, Clock } from 'lucide-react';

const SocialProof = () => {
  const metrics = [
    {
      icon: CheckCircle,
      value: 'Volume élevé',
      label: "d'appels qualifiés",
      color: '#E10C14',
    },
    {
      icon: BarChart3,
      value: 'Haut taux',
      label: 'de conversion',
      color: '#000000',
    },
    {
      icon: Users,
      value: 'Confiance',
      label: 'de nos clients',
      color: '#E10C14',
    },
    {
      icon: Clock,
      value: 'Rapide',
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
    <section className="py-12 bg-black">
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
                style={{ backgroundColor: `${metric.color}25` }}
              >
                <metric.icon
                  className="w-8 h-8"
                  style={{
                    color:
                      metric.color === '#000000' ? '#ffffff' : metric.color,
                  }}
                />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-gray-400 font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
