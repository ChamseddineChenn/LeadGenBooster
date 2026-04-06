import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
  Award,
  Loader2,
  Upload,
  Send,
  Check,
  AlertCircle,
  FileText,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const typeLabels = {
  'temps-plein': 'Temps plein',
  'temps-partiel': 'Temps partiel',
  contrat: 'Contrat',
  stage: 'Stage',
};

const CareerDetail = () => {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchCareer = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/careers/slug/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setCareer(data);
        } else {
          setError(data.message || 'Poste introuvable');
        }
      } catch {
        setError('Impossible de charger le poste');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCareer();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowed.includes(file.type)) {
        setSubmitMessage({
          type: 'error',
          text: 'Seuls les fichiers PDF, DOC et DOCX sont autorisés.',
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setSubmitMessage({
          type: 'error',
          text: 'Le fichier ne doit pas dépasser 10 Mo.',
        });
        return;
      }
      setCvFile(file);
      setSubmitMessage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      setSubmitMessage({
        type: 'error',
        text: 'Veuillez remplir tous les champs obligatoires.',
      });
      return;
    }
    if (!cvFile) {
      setSubmitMessage({
        type: 'error',
        text: 'Veuillez joindre votre CV.',
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append('careerId', career._id);
      formData.append('firstName', firstName.trim());
      formData.append('lastName', lastName.trim());
      formData.append('email', email.trim());
      formData.append('phone', phone.trim());
      formData.append('cv', cvFile);
      if (coverLetter.trim()) {
        formData.append('coverLetter', coverLetter.trim());
      }

      const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitMessage({
          type: 'success',
          text: 'Votre candidature a été envoyée avec succès! Nous vous contacterons bientôt.',
        });
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCvFile(null);
        setCoverLetter('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.message || "Erreur lors de l'envoi de votre candidature.",
        });
      }
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Erreur de connexion. Veuillez réessayer.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="max-w-[800px] mx-auto px-4 py-20 text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || 'Poste introuvable'}
          </h1>
          <p className="text-gray-500 mb-6">
            Le poste que vous cherchez n'existe pas ou a été clôturé.
          </p>
          <Link
            to="/carrieres"
            className="inline-flex items-center gap-2 text-[#D71C1C] font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux carrières
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-4">
        {/* Back link */}
        <Link
          to="/carrieres"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D71C1C] transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux carrières
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Category */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#D71C1C] mb-4">
            {career.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
            {career.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D71C1C]" />
              <span>{career.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#D71C1C]" />
              <span>{typeLabels[career.type] || career.type}</span>
            </div>
            {career.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Publié le {formatDate(career.publishedAt)}</span>
              </div>
            )}
            {career.closingDate && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Clôture le {formatDate(career.closingDate)}</span>
              </div>
            )}
          </div>

          {/* Salary */}
          {career.salary?.isVisible &&
            (career.salary.min || career.salary.max) && (
              <div className="mt-4 flex items-center gap-2 text-[#D71C1C] font-semibold text-lg">
                <DollarSign className="w-5 h-5" />
                <span>
                  {career.salary.min && career.salary.max
                    ? `${career.salary.min.toLocaleString()} $ - ${career.salary.max.toLocaleString()} $`
                    : career.salary.min
                      ? `À partir de ${career.salary.min.toLocaleString()} $`
                      : `Jusqu'à ${career.salary.max.toLocaleString()} $`}
                </span>
              </div>
            )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-black mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {career.description}
          </p>
        </motion.div>

        {/* Responsibilities */}
        {career.responsibilities?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-black mb-4">
              Responsabilités
            </h2>
            <ul className="space-y-3">
              {career.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-[#D71C1C] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Requirements */}
        {career.requirements?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-black mb-4">Exigences</h2>
            <ul className="space-y-3">
              {career.requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Star className="w-5 h-5 text-[#D71C1C] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Benefits */}
        {career.benefits?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-16"
          >
            <h2 className="text-xl font-bold text-black mb-4">Avantages</h2>
            <ul className="space-y-3">
              {career.benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Award className="w-5 h-5 text-[#D71C1C] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Application Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          id="postuler"
          className="bg-gray-50 rounded-2xl p-8 md:p-10"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">
              Postuler pour ce poste
            </h2>
            <p className="text-gray-500">
              Remplissez le formulaire ci-dessous pour soumettre votre
              candidature. Les champs marqués d'un * sont obligatoires.
            </p>
          </div>

          {/* Submit message */}
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {submitMessage.type === 'success' ? (
                <Check className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <span>{submitMessage.text}</span>
            </div>
          )}

          {submitMessage?.type !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nom de famille *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom de famille"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98 635 324"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white transition-colors"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  CV *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    cvFile
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-[#D71C1C]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {cvFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-6 h-6 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {cvFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCvFile(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = '';
                        }}
                        className="p-1 hover:bg-red-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="text-[#D71C1C] font-semibold">
                          Cliquez pour télécharger
                        </span>{' '}
                        votre CV
                      </p>
                      <p className="text-xs text-gray-400">
                        PDF, DOC ou DOCX (max 10 Mo)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Lettre de motivation{' '}
                  <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Décrivez votre motivation et pourquoi vous êtes le candidat idéal..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white resize-none transition-colors"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[#D71C1C] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#B01818] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {submitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CareerDetail;
