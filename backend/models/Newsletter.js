const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "L'adresse email est requise"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: {
      type: String,
      default: null,
    },
    confirmationTokenExpires: {
      type: Date,
      default: null,
    },
    unsubscribed: {
      type: Boolean,
      default: false,
    },
    unsubscribeToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

newsletterSchema.index({ isConfirmed: 1 });
newsletterSchema.index({ confirmationToken: 1 });
newsletterSchema.index({ unsubscribeToken: 1 });

module.exports = mongoose.model('Newsletter', newsletterSchema);
