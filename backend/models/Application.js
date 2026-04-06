const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
      required: [true, "L'offre d'emploi est requise"],
    },
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
    cv: {
      url: { type: String, required: [true, 'Le CV est requis'] },
      publicId: { type: String },
      originalName: { type: String },
    },
    coverLetter: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['nouveau', 'vu', 'entretien', 'accepté', 'rejeté'],
      default: 'nouveau',
    },
    adminComment: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

applicationSchema.index({ career: 1, createdAt: -1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ email: 1 });

module.exports = mongoose.model('Application', applicationSchema);
