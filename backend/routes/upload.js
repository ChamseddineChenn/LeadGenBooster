const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

// Multer config - memory storage for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  },
});

// Upload image to Cloudinary
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image fournie' });
    }

    // Upload to Cloudinary via buffer
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'leadgenbooster/blogs',
          resource_type: 'image',
          transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'upload", error: error.message });
  }
});

// Delete image from Cloudinary
// Using POST with body because publicIds contain slashes (e.g. "leadgenbooster/blogs/abc")
// which break Express path params
router.post('/delete', protect, async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ message: 'publicId requis' });
    }
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image supprimée avec succès', result });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la suppression', error: error.message });
  }
});

module.exports = router;
