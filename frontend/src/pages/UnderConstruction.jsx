import React from 'react';
import * as assets from '../assets/assets';

const UnderConstruction = () => {
  const services = [
    {
      icon: assets.strategieIcon,
      title: 'Stratégie de Visibilité & Marketing',
    },
    {
      icon: assets.partenaireIcon,
      title: 'Partenariats & Relations B2B',
    },
    {
      icon: assets.croissanceIcon,
      title: 'Croissance & Optimisation',
    },
  ];

  return (
    <div className="flex-col items-center min-h-screen bg-white">
      {/* Logo & Header */}
      <div className="max-w-[1100px] mx-auto ">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img src={assets.logoMain} alt="LeadGen Booster" className="h-48 w-auto" />
        </div>
      </div>

      {/* Hero & Content Section */}
      <div className="relative w-full">
        {/* Hero Image Container - Full height */}
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="relative rounded-lg overflow-hidden">
            {/* Hero image - natural height */}
            <img
              src={assets.heroPlaceholder}
              alt="Hero background"
              className="w-full max-h-[500px] h-auto object-cover object-center"
              style={{
                filter: 'grayscale(100%) contrast(100%) brightness(95%)',
              }}
            />
          </div>
        </div>

        {/* Overlapping Content Box - positioned 30% higher */}
        <div className="max-w-[1100px] mx-auto px-4 relative -mt-68 flex justify-center">
          <div className="relative max-w-[1000px] w-full bg-transparent backdrop-blur-md rounded-lg shadow-2xl border-4 border-black/10">
            {/* Headline */}
            <div className="text-center  bg-black/10">
              <h1 className="text-3xl md:text-4xl  text-white uppercase tracking-wider mt-4 px-4 py-2 rounded inline-block font-black">
                Propulsez Votre Croissance
              </h1>
              <p className="text-lg md:text-xl text-white font-medium px-4 pb-6 rounded inline-block mt-3">
                Visibilité | Engagement | Résultats
              </p>
            </div>

            {/* Section Heading - Speech Bubble Style */}
            <div className="relative flex justify-center mb-0 mt-12 z-10">
              <div className="relative bg-[#D71C1C] rounded px-8 py-4">
                <h2 className="text-white w-2xl font-bold uppercase text-lg md:text-xl text-center tracking-wide">
                  À Propos de Nous
                </h2>
                {/* Triangle pointer at bottom */}
                <div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '16px solid transparent',
                    borderRight: '16px solid transparent',
                    borderTop: '16px solid #D71C1C',
                  }}
                />
              </div>
            </div>

            {/* About Text */}
            <div className="text-center bg-[#f2f2f2] rounded-b-sm px-8 py-8 md:px-12 md:py-10 -mt-6 relative z-0 space-y-6 mb-0">
              <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                Lead Gen Booster est votre partenaire de confiance pour un
                accompagnement sur mesure vers la réussite et le développement
                de vos affaires.
              </p>
              <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                Notre mission est de propulser votre croissance en plaçant la
                visibilité commerciale et la communication stratégique au cœur
                de votre expansion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-[1100px] mx-auto px-4 pt-12 mt-12">
        {/* Services Heading */}
        <div className="flex items-center gap-4 mb-12">
          {/* Red vertical bar */}
          <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-black tracking-wider">
            Nos Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Red icon circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#D71C1C] flex items-center justify-center shadow-lg">
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
              </div>

              {/* Service title */}
              <h3 className="text-lg md:text-xl font-bold text-black text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Gear (Bottom Right) */}
      <div className="fixed bottom-0 right-0 pointer-events-none overflow-hidden w-64 h-64 opacity-5">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-gray-400"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const x1 = 50 + 42 * Math.cos((angle * Math.PI) / 180);
            const y1 = 50 + 42 * Math.sin((angle * Math.PI) / 180);
            const x2 = 50 + 35 * Math.cos((angle * Math.PI) / 180);
            const y2 = 50 + 35 * Math.sin((angle * Math.PI) / 180);
            return (
              <g key={i}>
                <line
                  x1={x2}
                  y1={y2}
                  x2={x1}
                  y2={y1}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x={x1 - 2}
                  y={y1 - 2}
                  width="4"
                  height="4"
                  fill="currentColor"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default UnderConstruction;
