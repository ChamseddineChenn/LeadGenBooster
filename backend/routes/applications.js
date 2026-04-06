const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Application = require('../models/Application');
const Career = require('../models/Career');
const { protect } = require('../middleware/auth');

// Multer config for CV uploads (PDF, DOC, DOCX)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Seuls les fichiers PDF, DOC et DOCX sont autorisés'),
        false,
      );
    }
  },
});

// ============ PUBLIC ROUTES ============

// Submit application (public)
router.post('/', upload.single('cv'), async (req, res) => {
  try {
    const { careerId, firstName, lastName, email, phone, coverLetter } =
      req.body;

    if (!careerId || !firstName || !lastName || !email || !phone) {
      return res
        .status(400)
        .json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Le CV est requis' });
    }

    // Verify career exists and is published
    const career = await Career.findById(careerId);
    if (!career || !career.isPublished) {
      return res.status(404).json({ message: "Offre d'emploi non trouvée" });
    }

    // Upload CV to Cloudinary (preserve original extension for proper download)
    const originalExt = require('path').extname(req.file.originalname);
    const safeName = req.file.originalname
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\s+/g, '_');
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'leadgenbooster/cvs',
          resource_type: 'raw',
          public_id: `${Date.now()}_${safeName}`,
          format: originalExt.replace('.', ''),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(req.file.buffer);
    });

    const application = await Application.create({
      career: careerId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      cv: {
        url: result.secure_url,
        publicId: result.public_id,
        originalName: req.file.originalname,
      },
      coverLetter: coverLetter || '',
    });

    // Increment application count on career
    await Career.findByIdAndUpdate(careerId, { $inc: { applications: 1 } });

    res
      .status(201)
      .json({ message: 'Candidature envoyée avec succès', application });
  } catch (error) {
    console.error('Application submit error:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ============ ADMIN ROUTES ============

// Get all applications (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const { status, careerId, limit = 20, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (careerId && careerId !== 'all') query.career = careerId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const applications = await Application.find(query)
      .populate('career', 'title slug category type location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(query);

    // Count by status for stats
    const statusCounts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      applications,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
      statusCounts: statusCounts.reduce(
        (acc, s) => ({ ...acc, [s._id]: s.count }),
        {},
      ),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Get single application (admin)
router.get('/admin/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'career',
      'title slug category type location',
    );

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Update application status (admin)
router.patch('/admin/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['nouveau', 'vu', 'entretien', 'accepté', 'rejeté'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate('career', 'title slug category type location');

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Update admin comment (admin)
router.patch('/admin/:id/comment', protect, async (req, res) => {
  try {
    const { adminComment } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { adminComment: adminComment || '' },
      { new: true },
    ).populate('career', 'title slug category type location');

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Delete application (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }

    // Delete CV from Cloudinary
    if (application.cv?.publicId) {
      try {
        await cloudinary.uploader.destroy(application.cv.publicId, {
          resource_type: 'raw',
        });
      } catch (err) {
        console.error('Failed to delete CV from Cloudinary:', err);
      }
    }

    // Decrement application count on career
    await Career.findByIdAndUpdate(application.career, {
      $inc: { applications: -1 },
    });

    await Application.findByIdAndDelete(req.params.id);

    res.json({ message: 'Candidature supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;
