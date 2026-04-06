const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre du poste est requis'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Le lieu est requis'],
      default: 'Montréal, QC',
    },
    type: {
      type: String,
      required: [true, "Le type d'emploi est requis"],
      enum: ['temps-plein', 'temps-partiel', 'contrat', 'stage'],
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    benefits: [
      {
        type: String,
      },
    ],
    salary: {
      min: {
        type: Number,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    closingDate: {
      type: Date,
      default: null,
    },
    applications: {
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
careerSchema.pre('save', function () {
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
careerSchema.index({ isPublished: 1, publishedAt: -1 });
careerSchema.index({ category: 1 });
careerSchema.index({ type: 1 });

module.exports = mongoose.model('Career', careerSchema);
