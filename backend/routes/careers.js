const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const CareerCategory = require('../models/CareerCategory');
const { protect } = require('../middleware/auth');

// ============ PUBLIC ROUTES ============

// Get all published careers (public)
router.get('/', async (req, res) => {
  try {
    const { category, type, limit = 20, page = 1 } = req.query;

    const query = { isPublished: true };

    // Filter out closed positions
    query.$or = [{ closingDate: null }, { closingDate: { $gte: new Date() } }];

    if (category && category !== 'all') {
      query.category = category;
    }
    if (type && type !== 'all') {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const careers = await Career.find(query)
      .select('-responsibilities -requirements -benefits')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Career.countDocuments(query);

    res.json({
      careers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Get all categories (public)
router.get('/categories', async (req, res) => {
  try {
    const categories = await CareerCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Get single career by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const career = await Career.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!career) {
      return res.status(404).json({ message: 'Poste non trouvé' });
    }

    res.json(career);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ============ ADMIN ROUTES ============

// Get all careers (admin - includes drafts)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const { category, type, status, limit = 20, page = 1 } = req.query;

    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (type && type !== 'all') {
      query.type = type;
    }
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const careers = await Career.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Career.countDocuments(query);

    res.json({
      careers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Get all categories (admin)
router.get('/admin/categories', protect, async (req, res) => {
  try {
    const categories = await CareerCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Create category (admin)
router.post('/admin/categories', protect, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res
        .status(400)
        .json({ message: 'Le nom de la catégorie est requis' });
    }

    // Check if it already exists (case-insensitive)
    const existing = await CareerCategory.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
    });
    if (existing) {
      return res.json(existing); // Return existing instead of error
    }

    const category = await CareerCategory.create({ name: name.trim() });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      const existing = await CareerCategory.findOne({
        name: req.body.name.trim(),
      });
      return res.json(existing);
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Delete category (admin)
router.delete('/admin/categories/:id', protect, async (req, res) => {
  try {
    const category = await CareerCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Get single career by ID (admin)
router.get('/admin/:id', protect, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({ message: 'Poste non trouvé' });
    }

    res.json(career);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Create career (admin)
router.post('/', protect, async (req, res) => {
  try {
    const careerData = {
      ...req.body,
      createdBy: req.user._id,
    };

    // Auto-create category if it doesn't exist
    if (careerData.category) {
      const existing = await CareerCategory.findOne({
        name: { $regex: new RegExp(`^${careerData.category.trim()}$`, 'i') },
      });
      if (!existing) {
        await CareerCategory.create({ name: careerData.category.trim() });
      }
    }

    const career = await Career.create(careerData);
    res.status(201).json(career);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Un poste avec ce titre existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Update career (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    // Auto-create category if it doesn't exist
    if (req.body.category) {
      const existing = await CareerCategory.findOne({
        name: { $regex: new RegExp(`^${req.body.category.trim()}$`, 'i') },
      });
      if (!existing) {
        await CareerCategory.create({ name: req.body.category.trim() });
      }
    }

    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Poste non trouvé' });
    }

    Object.assign(career, req.body);
    await career.save();

    res.json(career);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Un poste avec ce titre existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Toggle publish status (admin)
router.patch('/:id/publish', protect, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({ message: 'Poste non trouvé' });
    }

    career.isPublished = !career.isPublished;
    if (career.isPublished && !career.publishedAt) {
      career.publishedAt = new Date();
    }

    await career.save();
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Delete career (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);

    if (!career) {
      return res.status(404).json({ message: 'Poste non trouvé' });
    }

    res.json({ message: 'Poste supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;
