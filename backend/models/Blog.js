const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['title', 'paragraph', 'image'],
    },
    content: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: true },
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, "L'extrait est requis"],
      maxlength: [500, "L'extrait ne peut pas dépasser 500 caractères"],
    },
    contentBlocks: {
      type: [contentBlockSchema],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: [
        'conseils',
        'tendances',
        'etudes',
        'guide',
        'technologie',
        'legislation',
      ],
    },
    author: {
      type: String,
      required: [true, "L'auteur est requis"],
    },
    coverImage: {
      type: String,
      default: null,
    },
    coverImagePublicId: {
      type: String,
      default: null,
    },
    coverGradient: {
      type: String,
      default: 'bg-gradient-to-br from-[#D71C1C] to-[#B01818]',
    },
    readTime: {
      type: Number,
      default: 5,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// Generate slug from title before saving
blogSchema.pre('save', function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Set publishedAt when publishing
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

// Index for faster queries
blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });

module.exports = mongoose.model('Blog', blogSchema);
