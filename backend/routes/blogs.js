const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

// ============ PUBLIC ROUTES ============

// Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;

    const query = { isPublished: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(query)
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
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

// Get single blog by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ============ ADMIN ROUTES ============

// Get all blogs (admin - includes drafts)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const { category, status, limit = 20, page = 1 } = req.query;

    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
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

// Get single blog by ID (admin)
router.get('/admin/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Create blog (admin)
router.post('/', protect, async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Un article avec ce titre existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Update blog (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    res.json(blog);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Un article avec ce titre existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Toggle publish status (admin)
router.patch('/:id/publish', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    blog.isPublished = !blog.isPublished;
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Delete blog (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    // Delete associated images from Cloudinary
    const cloudinary = require('../config/cloudinary');
    if (blog.contentBlocks && Array.isArray(blog.contentBlocks)) {
      for (const block of blog.contentBlocks) {
        if (block.type === 'image' && block.publicId) {
          try {
            await cloudinary.uploader.destroy(block.publicId);
          } catch (err) {
            console.error(
              `Failed to delete image from Cloudinary: ${block.publicId}`,
              err,
            );
            // Continue with deletion even if Cloudinary cleanup fails
          }
        }
      }
    }

    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;
