const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Le nom est requis'],
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
      required: [true, 'Le téléphone est requis'],
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    service: {
      type: String,
      default: '',
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'La date est requise'],
    },
    timeSlot: {
      type: String,
      required: [true, "L'heure est requise"],
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['en attente', 'confirmé', 'annulé'],
      default: 'en attente',
    },
    adminComment: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

meetingSchema.index({ status: 1 });
meetingSchema.index({ date: 1 });
meetingSchema.index({ email: 1 });
meetingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Meeting', meetingSchema);
