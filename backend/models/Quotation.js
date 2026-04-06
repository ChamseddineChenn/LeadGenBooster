const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Le nom de famille est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Le numéro de téléphone est requis'],
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Le service est requis'],
      trim: true,
    },
    budget: {
      type: String,
      default: '',
      trim: true,
    },
    timeline: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'La description du projet est requise'],
    },
    status: {
      type: String,
      enum: ['nouveau', 'vu', 'en cours', 'terminé', 'rejeté'],
      default: 'nouveau',
    },
    adminComment: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

quotationSchema.index({ status: 1 });
quotationSchema.index({ email: 1 });
quotationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Quotation', quotationSchema);
