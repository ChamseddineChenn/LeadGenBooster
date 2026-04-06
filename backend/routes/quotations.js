const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');
const { protect } = require('../middleware/auth');

// ============ PUBLIC ROUTES ============

// Submit a quotation request (public)
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      budget,
      timeline,
      message,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return res
        .status(400)
        .json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    const quotation = await Quotation.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company ? company.trim() : '',
      service: service.trim(),
      budget: budget ? budget.trim() : '',
      timeline: timeline ? timeline.trim() : '',
      message: message.trim(),
    });

    res
      .status(201)
      .json({
        message: 'Votre demande de devis a été envoyée avec succès',
        quotation,
      });
  } catch (error) {
    console.error('Quotation submit error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ============ ADMIN ROUTES (protected) ============

// Get all quotations with stats
router.get('/admin/all', protect, async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });

    const stats = {
      total: quotations.length,
      nouveau: quotations.filter((q) => q.status === 'nouveau').length,
      vu: quotations.filter((q) => q.status === 'vu').length,
      enCours: quotations.filter((q) => q.status === 'en cours').length,
      termine: quotations.filter((q) => q.status === 'terminé').length,
      rejete: quotations.filter((q) => q.status === 'rejeté').length,
    };

    res.json({ quotations, stats });
  } catch (error) {
    console.error('Fetch quotations error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get single quotation by ID
router.get('/admin/:id', protect, async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Devis introuvable' });
    }
    res.json(quotation);
  } catch (error) {
    console.error('Fetch quotation error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Update quotation status
router.patch('/admin/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['nouveau', 'vu', 'en cours', 'terminé', 'rejeté'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!quotation) {
      return res.status(404).json({ message: 'Devis introuvable' });
    }
    res.json(quotation);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Update admin comment
router.patch('/admin/:id/comment', protect, async (req, res) => {
  try {
    const { adminComment } = req.body;
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { adminComment: adminComment || '' },
      { new: true },
    );
    if (!quotation) {
      return res.status(404).json({ message: 'Devis introuvable' });
    }
    res.json(quotation);
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Delete quotation
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Devis introuvable' });
    }
    res.json({ message: 'Devis supprimé avec succès' });
  } catch (error) {
    console.error('Delete quotation error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
