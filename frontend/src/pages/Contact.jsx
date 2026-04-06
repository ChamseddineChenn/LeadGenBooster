import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    timeline: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/quotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          timeline: '',
          message: '',
        });
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Demandez un Devis
            </h1>
            <div className="w-1.5 h-10 bg-[#D71C1C] rounded-full" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Décrivez votre projet et recevez un devis personnalisé. Notre équipe
            vous répondra dans les plus brefs délais.
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
                98 635 324
                <br />
                Lun-Ven: 9h-18h
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
                contact@leadgen-booster.com
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
                39, Bis av Khereddine Pacha
                <br />
                5ème étage Montplaisir – Tunis
              </p>
            </div>
          </div>

          {/* Quotation Form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-black mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Votre demande de devis a été envoyée avec succès. Notre équipe
                  vous contactera dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-[#D71C1C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B01818] transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 p-8 rounded-lg space-y-6"
              >
                <h2 className="text-xl font-bold text-black mb-2">
                  Demande de Devis
                </h2>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Email *
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
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                      placeholder="98 635 324"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Service souhaité *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                    >
                      <option value="">Sélectionnez un service</option>
                      <optgroup label="Communication">
                        <option value="Création Graphique & Identité Visuelle">
                          Création Graphique & Identité Visuelle
                        </option>
                        <option value="Développement de Site Web">
                          Développement de Site Web
                        </option>
                        <option value="Gestion des Réseaux Sociaux">
                          Gestion des Réseaux Sociaux
                        </option>
                        <option value="Rédaction de Contenu & SEO">
                          Rédaction de Contenu & SEO
                        </option>
                      </optgroup>
                      <optgroup label="Prospection & Visibilité">
                        <option value="Prospection Commerciale B2B">
                          Prospection Commerciale B2B
                        </option>
                        <option value="Prise de RDV Qualifiés">
                          Prise de RDV Qualifiés
                        </option>
                        <option value="Relance des Clients Inactifs">
                          Relance des Clients Inactifs
                        </option>
                        <option value="Formation Commerciale">
                          Formation Commerciale
                        </option>
                      </optgroup>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Délai souhaité
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white"
                    >
                      <option value="">Sélectionnez un délai</option>
                      <option value="Moins d'1 mois">{"Moins d'1 mois"}</option>
                      <option value="1 - 3 mois">1 - 3 mois</option>
                      <option value="3 - 6 mois">3 - 6 mois</option>
                      <option value="Plus de 6 mois">Plus de 6 mois</option>
                      <option value="Pas de contrainte">
                        Pas de contrainte
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Description du projet *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D71C1C] bg-white resize-none"
                    placeholder="Décrivez votre projet, vos objectifs et vos besoins spécifiques..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71C1C] text-white font-semibold py-3 rounded-lg hover:bg-[#B01818] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {submitting
                    ? 'Envoi en cours...'
                    : 'Envoyer la Demande de Devis'}
                </button>
              </form>
            )}
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
    </div>
  );
};

export default Contact;
