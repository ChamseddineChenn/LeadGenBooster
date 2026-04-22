// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Phone, Mail, Sparkles } from 'lucide-react';

const packs = [
  {
    name: 'ESSENTIAL',
    tagline: 'Idéal pour une présence essentielle',
    features: [
      'Conception de 2 Postes / Semaine',
      'Planification des publications',
      'Facebook',
      'Modération automatisée',
    ],
    tier: 'basic',
  },
  {
    name: 'PERFORMANCE',
    tagline: 'Parfait pour renforcer votre engagement',
    features: [
      'Conception de 3 Postes / Semaine',
      'Planification des publications',
      'Facebook & Instagram',
      'Bannière personnalisée',
      'Modération humaine (9h – 18h)',
    ],
    tier: 'mid',
  },
  {
    name: 'PREMIUM',
    tagline: 'La solution complète pour maximiser votre impact',
    features: [
      'Conception de 5 Postes / Semaine',
      'Planification des publications',
      'Facebook, Instagram & LinkedIn',
      'Bannière personnalisée',
      '1 carrousel par mois',
      'Reporting détaillé',
      'Modération humaine (9h – 18h)',
    ],
    tier: 'high',
  },
];

const PackCard = ({ pack, index }) => {
  const isBasic = pack.tier === 'basic';
  const isMid = pack.tier === 'mid';
  const isHigh = pack.tier === 'high';

  // Card styles (no backdrop-blur for performance)
  const cardGlass = isBasic
    ? 'bg-[#edecec] border-gray-300 hover:border-gray-300 shadow-lg shadow-gray-200/50'
    : isMid
      ? 'bg-[#fef2f2] border-[#D71C1C]/20 hover:border-[#D71C1C]/40 shadow-lg shadow-[#D71C1C]/10'
      : 'bg-black from-gray-900 to-[#1a0508] border-[#D71C1C]/30 hover:border-[#D71C1C]/60 shadow-xl shadow-[#D71C1C]/15';

  // Header label
  const headerStyle = isBasic
    ? 'bg-white text-gray-700'
    : isMid
      ? 'bg-[#D71C1C]/15 text-[#D71C1C]'
      : 'bg-[#D71C1C] text-white';

  // Check icon colour + glow
  const checkStyle = isBasic
    ? 'text-[#D71C1C]'
    : isMid
      ? 'text-[#D71C1C] drop-shadow-[0_0_4px_rgba(215,28,28,0.5)]'
      : 'text-[#D71C1C] drop-shadow-[0_0_6px_rgba(215,28,28,0.7)]';

  const featureColor = isBasic
    ? 'text-gray-800'
    : isMid
      ? 'text-gray-700'
      : 'text-white/90';

  const taglineColor = isBasic
    ? 'text-[#D71C1C]'
    : isMid
      ? 'text-[#D71C1C]/70'
      : 'text-[#D71C1C]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative group"
    >
      {/* Outer glow — Premium only */}
      {isHigh && (
        <div className="absolute -inset-[2px] rounded-[1.75rem] bg-gradient-to-b from-[#D71C1C]/40 via-[#D71C1C]/10 to-[#D71C1C]/40 opacity-60 group-hover:opacity-100 blur-[1px] transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Card */}
      <div
        className={`relative rounded-3xl border transition-all duration-500 overflow-hidden h-full flex flex-col ${cardGlass} ${isHigh ? 'shadow-[0_0_60px_-10px_rgba(215,28,28,0.3)]' : ''}`}
      >
        {/* Inner jewelry edge (1px inset glow) */}
        <div
          className={`absolute inset-[1px] rounded-[calc(1.5rem-1px)] pointer-events-none ${
            isBasic
              ? 'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]'
              : isMid
                ? 'shadow-[inset_0_0_0_1px_rgba(215,28,28,0.12)]'
                : 'shadow-[inset_0_0_0_1px_rgba(215,28,28,0.25),inset_0_0_30px_-8px_rgba(215,28,28,0.08)]'
          }`}
        />

        {/* Top reflection line */}
        <div
          className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent to-transparent ${
            isHigh ? 'via-white/20' : 'via-black/[0.06]'
          }`}
        />

        {/* Header */}
        <div className={`relative px-7 pt-7 pb-0`}>
          <div
            className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${headerStyle}`}
          >
            {isHigh && <Sparkles className="w-3 h-3 inline mr-1.5 -mt-0.5" />}
            Pack {pack.name}
          </div>
        </div>

        {/* Pack title + tagline */}
        <div className="px-7 pt-5 pb-1">
          <h3
            className={`text-2xl md:text-3xl font-extrabold tracking-tight leading-tight ${isHigh ? 'text-white' : 'text-gray-900'}`}
          >
            {pack.name}
          </h3>
          <p className={`text-sm mt-1.5 font-medium ${taglineColor}`}>
            {pack.tagline}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-7 mt-5 mb-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Features */}
        <div className="px-7 py-5 flex-1">
          <ul className="space-y-3.5">
            {pack.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 ${checkStyle}`}>
                  <Check className="w-4.5 h-4.5" strokeWidth={3} />
                </div>
                <span className={`text-sm leading-snug ${featureColor}`}>
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom reflection line */}
        <div
          className={`mx-8 h-[1px] bg-gradient-to-r from-transparent to-transparent ${
            isBasic
              ? 'via-gray-200'
              : isMid
                ? 'via-[#D71C1C]/25'
                : 'via-[#D71C1C]/40'
          }`}
        />

        {/* CTA */}
        <div className="px-7 py-5">
          <Link
            to="/contact"
            className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isBasic
                ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-400'
                : isMid
                  ? 'bg-[#D71C1C]/15 text-[#D71C1C] hover:bg-[#D71C1C]/25 border border-[#D71C1C]/20'
                  : 'bg-[#D71C1C] text-white hover:bg-[#D71C1C]/90 shadow-lg shadow-[#D71C1C]/25 hover:shadow-[#D71C1C]/40 border border-[#D71C1C]/60'
            }`}
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Packs = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* ===== CINEMATIC BACKGROUND ===== */}

      {/* Base white */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle warm spotlight glow behind Premium (right side) */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-[#D71C1C]/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Faint cool glow left */}
      <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[350px] h-[350px] bg-gray-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Technical grid overlay — scales in opacity from left (faint) to right (stronger) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="pack-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0,0,0,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0.8" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#pack-grid)"
          mask="url(#grid-mask)"
        />
      </svg>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-[1300px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D71C1C]/10 border border-[#D71C1C]/20 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#D71C1C]" />
            <span className="text-sm font-semibold text-[#D71C1C] tracking-wide">
              Nos Offres
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Choisissez votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D71C1C] to-[#ff4d4d]">
              Pack
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Des formules adaptées à chaque étape de votre croissance digitale.
          </p>
        </motion.div>

        {/* Pack cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {packs.map((pack, i) => (
            <PackCard key={pack.name} pack={pack} index={i} />
          ))}
        </div>

        {/* Footer branding — separated from cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-md"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>+216 98 635 324</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span>contact@leadgenbooster.com</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
          <span>Consultation gratuite · Devis sous 24h</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Packs;
