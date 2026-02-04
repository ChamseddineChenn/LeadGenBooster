import React from 'react';
import { Lightbulb, Handshake, TrendingUp } from 'lucide-react';
import { logoMain, heroPlaceholder } from '../assets/assets';

const UnderConstruction = () => {
  const services = [
    {
      icon: Lightbulb,
      title: 'Stratégie de Visibilité & Marketing',
    },
    {
      icon: Handshake,
      title: 'Partenariats & Relations B2B',
    },
    {
      icon: TrendingUp,
      title: 'Croissance & Optimisation',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Logo & Header */}
      <div className="max-w-[1100px] mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img
            src={logoMain}
            alt="LeadGen Booster"
            className="h-32 w-auto mb-4"
          />
        </div>
      </div>

      {/* Hero & Content Section */}
      <div className="relative w-full">
        {/* Hero Image Container */}
        <div className="max-w-[1100px] mx-auto px-4 py-12">
          <div className="relative rounded-lg overflow-hidden h-80">
            {/* Hero image */}
            <img
              src={heroPlaceholder}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{
                filter: 'grayscale(100%) contrast(100%) brightness(95%)',
              }}
            />
          </div>
        </div>

        {/* Overlapping Content Box - positioned 30% down from top of hero */}
        <div className="max-w-[1100px] mx-auto px-4 relative -mt-24 flex justify-center">
          <div className="relative max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12 border-4 border-[#D71C1C]">
            {/* Red triangle pointer on top */}
            <div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '18px solid transparent',
                borderRight: '18px solid transparent',
                borderBottom: '20px solid #D71C1C',
              }}
            />

            {/* Headline */}
            <div className="text-center mb-8 mt-4">
              <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-wider mb-4">
                Propulsez Votre Croissance
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                Visibilité | Engagement | Résultats
              </p>
            </div>

            {/* Red Divider Line */}
            <div className="w-16 h-1 bg-[#D71C1C] mx-auto mb-8" />

            {/* Section Heading */}
            <h2 className="text-white font-bold uppercase text-lg md:text-xl text-center tracking-wide mb-8 text-shadow-lg">
              À Propos de Nous
            </h2>

            {/* About Text */}
            <div className="text-center space-y-6">
              <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                LeadGen Booster est votre partenaire de confiance pour transformer votre approche commerciale. 
                Nous spécialisons dans la génération de leads, la qualification de prospects et l'optimisation 
                de votre croissance commerciale à travers des stratégies éprouvées et innovantes.
              </p>
              <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                Notre mission est de vous aider à atteindre vos objectifs commerciaux en fournissant des solutions 
                de prospection téléphonique, de qualification de leads et de gestion de relations clients qui 
                génèrent des résultats mesurables et durables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-[1100px] mx-auto px-4 py-24 mt-12">
        {/* Services Heading */}
        <div className="flex items-center gap-4 mb-12">
          {/* Red vertical bar */}
          <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-black tracking-wider">
            Nos Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Red icon circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#D71C1C] flex items-center justify-center shadow-lg">
                  <service.icon className="w-8 h-8 text-white" />
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
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
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

      {/* Footer spacing */}
      <div className="h-32" />
    </div>
  );
};

export default UnderConstruction;
