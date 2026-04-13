const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const Availability = require('../models/Availability');
const { protect } = require('../middleware/auth');

// ============ PUBLIC ROUTES ============

// Get available slots for a given date
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'La date est requise' });
    }

    const requestedDate = new Date(date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ message: 'Date invalide' });
    }

    // Get availability settings (singleton)
    let availability = await Availability.findOne();
    if (!availability) {
      availability = await Availability.create({});
    }

    const dayOfWeek = requestedDate.getDay();

    // Check if day is active
    if (!availability.activeDays.includes(dayOfWeek)) {
      return res.json({ slots: [], message: 'Jour non disponible' });
    }

    // Check if date is blocked
    const dateStr = requestedDate.toISOString().split('T')[0];
    const isBlocked = availability.blockedDates.some(
      (bd) => bd.toISOString().split('T')[0] === dateStr,
    );
    if (isBlocked) {
      return res.json({ slots: [], message: 'Date bloquée' });
    }

    // Check date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + availability.maxAdvanceDays);

    if (requestedDate < today || requestedDate > maxDate) {
      return res.json({
        slots: [],
        message: 'Date hors de la plage disponible',
      });
    }

    // Generate time slots (skip lunch break)
    const lunchStart = availability.lunchStart ?? 12;
    const lunchEnd = availability.lunchEnd ?? 14;
    const slots = [];
    for (let h = availability.startHour; h < availability.endHour; h++) {
      if (h >= lunchStart && h < lunchEnd) continue;
      if (availability.slotDuration === 60) {
        slots.push(`${String(h).padStart(2, '0')}:00`);
      } else {
        slots.push(`${String(h).padStart(2, '0')}:00`);
        slots.push(`${String(h).padStart(2, '0')}:30`);
      }
    }

    // Remove already booked slots
    const startOfDay = new Date(dateStr + 'T00:00:00.000Z');
    const endOfDay = new Date(dateStr + 'T23:59:59.999Z');

    const bookedMeetings = await Meeting.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: 'annulé' },
    });

    const bookedSlots = bookedMeetings.map((m) => m.timeSlot);
    const availableSlots = slots.filter((s) => !bookedSlots.includes(s));

    res.json({ slots: availableSlots });
  } catch (error) {
    console.error('Get slots error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get availability settings (public - for calendar UI)
router.get('/availability', async (req, res) => {
  try {
    let availability = await Availability.findOne();
    if (!availability) {
      availability = await Availability.create({});
    }
    res.json({
      activeDays: availability.activeDays,
      startHour: availability.startHour,
      endHour: availability.endHour,
      slotDuration: availability.slotDuration,
      lunchStart: availability.lunchStart,
      lunchEnd: availability.lunchEnd,
      blockedDates: availability.blockedDates,
      maxAdvanceDays: availability.maxAdvanceDays,
    });
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Book a meeting (public)
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      date,
      timeSlot,
      notes,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    // Verify slot is still available
    const dateStr = new Date(date).toISOString().split('T')[0];
    const startOfDay = new Date(dateStr + 'T00:00:00.000Z');
    const endOfDay = new Date(dateStr + 'T23:59:59.999Z');

    const existing = await Meeting.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: timeSlot.trim(),
      status: { $ne: 'annulé' },
    });

    if (existing) {
      return res
        .status(409)
        .json({
          message: 'Ce créneau est déjà réservé. Veuillez en choisir un autre.',
        });
    }

    const meeting = await Meeting.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company ? company.trim() : '',
      service: service ? service.trim() : '',
      date: new Date(dateStr),
      timeSlot: timeSlot.trim(),
      notes: notes ? notes.trim() : '',
    });

    res.status(201).json({
      message:
        'Votre rendez-vous a été réservé avec succès. Nous vous confirmerons par email.',
      meeting,
    });
  } catch (error) {
    console.error('Book meeting error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ============ ADMIN ROUTES (protected) ============

// Get all meetings with stats
router.get('/admin/all', protect, async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: -1, timeSlot: -1 });

    const stats = {
      total: meetings.length,
      enAttente: meetings.filter((m) => m.status === 'en attente').length,
      confirme: meetings.filter((m) => m.status === 'confirmé').length,
      annule: meetings.filter((m) => m.status === 'annulé').length,
    };

    res.json({ meetings, stats });
  } catch (error) {
    console.error('Fetch meetings error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Update meeting status (confirm / cancel)
router.patch('/admin/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['en attente', 'confirmé', 'annulé'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!meeting) {
      return res.status(404).json({ message: 'Rendez-vous introuvable' });
    }
    res.json(meeting);
  } catch (error) {
    console.error('Update meeting status error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Update admin comment
router.patch('/admin/:id/comment', protect, async (req, res) => {
  try {
    const { adminComment } = req.body;
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { adminComment: adminComment || '' },
      { new: true },
    );
    if (!meeting) {
      return res.status(404).json({ message: 'Rendez-vous introuvable' });
    }
    res.json(meeting);
  } catch (error) {
    console.error('Update meeting comment error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Delete a meeting
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Rendez-vous introuvable' });
    }
    res.json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    console.error('Delete meeting error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ============ ADMIN AVAILABILITY ROUTES ============

// Get availability settings
router.get('/admin/availability', protect, async (req, res) => {
  try {
    let availability = await Availability.findOne();
    if (!availability) {
      availability = await Availability.create({});
    }
    res.json(availability);
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Update availability settings
router.put('/admin/availability', protect, async (req, res) => {
  try {
    const {
      activeDays,
      startHour,
      endHour,
      slotDuration,
      blockedDates,
      maxAdvanceDays,
      lunchStart,
      lunchEnd,
    } = req.body;

    let availability = await Availability.findOne();
    if (!availability) {
      availability = new Availability();
    }

    if (activeDays !== undefined) availability.activeDays = activeDays;
    if (startHour !== undefined) availability.startHour = startHour;
    if (endHour !== undefined) availability.endHour = endHour;
    if (slotDuration !== undefined) availability.slotDuration = slotDuration;
    if (lunchStart !== undefined) availability.lunchStart = lunchStart;
    if (lunchEnd !== undefined) availability.lunchEnd = lunchEnd;
    if (blockedDates !== undefined)
      availability.blockedDates = blockedDates.map((d) => new Date(d));
    if (maxAdvanceDays !== undefined)
      availability.maxAdvanceDays = maxAdvanceDays;

    await availability.save();
    res.json(availability);
  } catch (error) {
    console.error('Update availability error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
