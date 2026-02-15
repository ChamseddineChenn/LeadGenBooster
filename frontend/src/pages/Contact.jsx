import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Contactez-Nous
            </h1>
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes toujours prêts à discuter de vos besoins et à explorer
            comment nous pouvons vous aider à atteindre vos objectifs
            commerciaux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Phone */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#D71C1C] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-black">Téléphone</h3>
              </div>
              <p className="text-gray-600 text-sm ml-16">
                +1 (514) 555-0000
                <br />
                Lun-Ven: 9h-18h EST
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#D71C1C] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-black">Email</h3>
              </div>
              <p className="text-gray-600 text-sm ml-16">
                contact@leadgenbooster.ca
                <br />
                Réponse sous 24h
              </p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#D71C1C] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-black">Adresse</h3>
              </div>
              <p className="text-gray-600 text-sm ml-16">
                123 Rue du Commerce
                <br />
                Montréal, QC H2X 1Y8
                <br />
                Canada
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-8 rounded-lg space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                    placeholder="+1 (514) 555-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                    placeholder="Votre Entreprise"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Sujet
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="services">Informations Services</option>
                  <option value="pricing">Tarification</option>
                  <option value="partnership">Partenariat</option>
                  <option value="support">Support Client</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white resize-none"
                  placeholder="Dites-nous comment nous pouvons vous aider..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D71C1C] text-white font-semibold py-3 rounded-lg hover:bg-[#B01818] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer le Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">
            Visitez Notre Bureau
          </h2>
          <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#D71C1C] mx-auto mb-4 opacity-50" />
              <p className="text-gray-600">Carte intégrée ici</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#D71C1C] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Démarrer?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Obtenez un devis gratuit et découvrez comment Lead Gen Booster peut
            transformer votre croissance commerciale.
          </p>
          <button className="bg-white text-[#D71C1C] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Obtenir un Devis Gratuit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
