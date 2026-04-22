import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTH_NAMES = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const DEFAULT_AVAILABILITY = {
  activeDays: [1, 2, 3, 4, 5],
  startHour: 9,
  endHour: 17,
  lunchStart: 12,
  lunchEnd: 14,
  slotDuration: 60,
  maxAdvanceDays: 30,
  blockedDates: [],
};

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1=date, 2=time, 3=form, 4=success
  const [availability, setAvailability] = useState(DEFAULT_AVAILABILITY);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  // Listen for custom event to open modal
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('openBookingModal', handler);
    return () => window.removeEventListener('openBookingModal', handler);
  }, []);

  // Fetch availability settings when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
    setError(null);
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      notes: '',
    });

    const fetchAvailability = async () => {
      try {
        const res = await fetch(`${API_URL}/meetings/availability`);
        const data = await res.json();
        if (res.ok) setAvailability({ ...DEFAULT_AVAILABILITY, ...data });
      } catch {
        setAvailability(DEFAULT_AVAILABILITY);
      }
    };
    fetchAvailability();
  }, [isOpen]);

  // Generate default slots client-side from availability settings
  const generateDefaultSlots = useCallback((date, avail) => {
    const a = avail || DEFAULT_AVAILABILITY;
    const lunchStart = a.lunchStart ?? 12;
    const lunchEnd = a.lunchEnd ?? 14;
    const result = [];
    for (let h = a.startHour; h < a.endHour; h++) {
      if (h >= lunchStart && h < lunchEnd) continue;
      if (a.slotDuration === 60) {
        result.push(`${String(h).padStart(2, '0')}:00`);
      } else {
        result.push(`${String(h).padStart(2, '0')}:00`);
        result.push(`${String(h).padStart(2, '0')}:30`);
      }
    }
    return result;
  }, []);

  // Fetch available slots when date is selected
  const fetchSlots = useCallback(async (date) => {
    setLoadingSlots(true);
    setSlots([]);
    try {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const res = await fetch(`${API_URL}/meetings/slots?date=${dateStr}`);
      const data = await res.json();
      if (res.ok && data.slots && data.slots.length > 0) {
        setSlots(data.slots);
      } else {
        setSlots(generateDefaultSlots(date, availability));
      }
    } catch {
      setSlots(generateDefaultSlots(date, availability));
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    fetchSlots(date);
    setStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    try {
      const res = await fetch(`${API_URL}/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date: dateStr,
          timeSlot: selectedSlot,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(4);
      } else {
        setError(data.message || 'Erreur lors de la réservation');
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => setIsOpen(false);

  // Calendar logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + (availability?.maxAdvanceDays || 30));

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const isDateAvailable = (date) => {
    if (!availability) return false;
    if (date < today) return false;
    if (date > maxDate) return false;
    if (!availability.activeDays.includes(date.getDay())) return false;
    if (availability.blockedDates?.length) {
      const dateStr = date.toISOString().split('T')[0];
      if (
        availability.blockedDates.some(
          (bd) => new Date(bd).toISOString().split('T')[0] === dateStr,
        )
      )
        return false;
    }
    return true;
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const available = isDateAvailable(date);
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === today.toDateString();

      cells.push(
        <button
          key={day}
          disabled={!available}
          onClick={() => handleDateSelect(date)}
          className={`w-full aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
            isSelected
              ? 'bg-[#D71C1C] text-white shadow-lg'
              : available
                ? isToday
                  ? 'bg-[#D71C1C]/10 text-[#D71C1C] hover:bg-[#D71C1C] hover:text-white'
                  : 'text-gray-800 hover:bg-[#D71C1C]/10 hover:text-[#D71C1C]'
                : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          {day}
        </button>,
      );
    }

    return cells;
  };

  const canGoPrev = () => {
    const prevEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0,
    );
    return prevEnd >= today;
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          >
            {/* Header */}
            <div className="bg-[#D71C1C] px-5 py-3.5 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">
                  Réserver un appel
                </h2>
              </div>
              <button
                onClick={close}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            {step < 4 && (
              <div className="px-5 pt-4">
                <div className="flex items-center">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                          s === step
                            ? 'bg-[#D71C1C] text-white'
                            : s < step
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {s < step ? '✓' : s}
                      </div>
                      {s < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex mt-1.5 text-xs text-gray-500">
                  {['Date', 'Heure', 'Infos'].map((label, i) => (
                    <span
                      key={label}
                      className={i < 2 ? 'flex-1' : ''}
                      style={{ paddingLeft: i === 0 ? '0.25rem' : 0 }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="px-5 pb-5 pt-3">
              {/* Step 1: Calendar */}
              {step === 1 && (
                <div>
                  <p className="text-gray-600 text-sm mb-4">
                    Choisissez une date disponible
                  </p>

                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      disabled={!canGoPrev()}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-black">
                      {MONTH_NAMES[currentMonth.getMonth()]}{' '}
                      {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={nextMonth}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAY_NAMES.map((d) => (
                      <div
                        key={d}
                        className="text-center text-xs font-semibold text-gray-500 py-1"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>
              )}

              {/* Step 2: Time Slots */}
              {step === 2 && (
                <div>
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-4"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Retour
                  </button>

                  <div className="flex items-center gap-2 mb-4 bg-[#D71C1C]/5 px-4 py-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#D71C1C]" />
                    <span className="text-sm font-medium text-black capitalize">
                      {formatSelectedDate()}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    Choisissez un créneau horaire
                  </p>

                  {loadingSlots ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-[#D71C1C]" />
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        Aucun créneau disponible pour cette date
                      </p>
                      <button
                        onClick={() => setStep(1)}
                        className="mt-3 text-[#D71C1C] text-sm font-medium hover:underline"
                      >
                        Choisir une autre date
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                            selectedSlot === slot
                              ? 'bg-[#D71C1C] text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-[#D71C1C]/10 hover:text-[#D71C1C]'
                          }`}
                        >
                          <Clock className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Contact Form */}
              {step === 3 && (
                <div>
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-4"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Retour
                  </button>

                  {/* Selected Summary */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-2 bg-[#D71C1C]/5 px-3 py-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-[#D71C1C]" />
                      <span className="text-sm font-medium capitalize">
                        {formatSelectedDate()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#D71C1C]/5 px-3 py-2 rounded-lg">
                      <Clock className="w-4 h-4 text-[#D71C1C]" />
                      <span className="text-sm font-medium">
                        {selectedSlot}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Prénom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={form.firstName}
                            onChange={(e) =>
                              setForm({ ...form, firstName: e.target.value })
                            }
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] text-sm"
                            placeholder="Prénom"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Nom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(e) =>
                              setForm({ ...form, lastName: e.target.value })
                            }
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] text-sm"
                            placeholder="Nom"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] text-sm"
                          placeholder="email@exemple.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] text-sm"
                          placeholder="+33 6 00 00 00 00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Entreprise
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] text-sm"
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Notes
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                          value={form.notes}
                          onChange={(e) =>
                            setForm({ ...form, notes: e.target.value })
                          }
                          rows={2}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D71C1C] text-sm resize-none"
                          placeholder="Décrivez brièvement votre projet..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-[#D71C1C] text-white rounded-lg font-bold hover:bg-[#B01818] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Calendar className="w-5 h-5" />
                      )}
                      Confirmer la réservation
                    </button>
                  </form>
                </div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Réservation envoyée !
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Votre demande de rendez-vous a été envoyée avec succès.
                  </p>
                  <div className="bg-[#f2f2f2] rounded-lg px-4 py-3 inline-block mb-6">
                    <p className="text-sm font-medium text-black capitalize">
                      {formatSelectedDate()}
                    </p>
                    <p className="text-sm text-[#D71C1C] font-bold">
                      {selectedSlot}
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs mb-6">
                    Vous recevrez une confirmation une fois votre rendez-vous
                    validé par notre équipe.
                  </p>
                  <button
                    onClick={close}
                    className="px-8 py-3 bg-[#D71C1C] text-white rounded-lg font-bold hover:bg-[#B01818] transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
