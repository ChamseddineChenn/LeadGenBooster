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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

        {/* Client Logos */}
        <div className="bg-[#F5F7FA] rounded-2xl p-8 md:p-12">
          <h3 className="text-center text-2xl font-bold text-[#000000] mb-10">
            Ils nous font confiance
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow duration-300">
                  <div className="text-2xl font-bold text-[#000000]">
                    {client.initials}
                  </div>
                </div>
                <div className="text-[#6D7280] text-sm font-medium">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto text-center"
          >
            <div className="text-2xl text-[#000000] font-bold mb-6">
              "LeadGen Booster a transformé notre génération de leads. En 3
              mois, notre pipeline a augmenté de 200%."
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-r from-[#000000] to-[#E10C14] rounded-full"></div>
              <div className="text-left">
                <div className="font-bold text-[#000000]">
                  Marie-Claude Tremblay
                </div>
                <div className="text-[#6D7280]">
                  Directrice marketing, Entreprise XYZ
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
