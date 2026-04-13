const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema(
  {
    // Days of week enabled (0=Sunday, 1=Monday, ..., 6=Saturday)
    activeDays: {
      type: [Number],
      default: [1, 2, 3, 4, 5], // Mon-Fri by default
      validate: {
        validator: (v) => v.every((d) => d >= 0 && d <= 6),
        message: 'Les jours doivent être entre 0 (dimanche) et 6 (samedi)',
      },
    },
    // Start hour (24h format)
    startHour: {
      type: Number,
      default: 9,
      min: 0,
      max: 23,
    },
    // End hour (24h format, exclusive)
    endHour: {
      type: Number,
      default: 17,
      min: 1,
      max: 24,
    },
    // Slot duration in minutes
    slotDuration: {
      type: Number,
      default: 60,
      enum: [30, 60],
    },
    // Lunch break
    lunchStart: {
      type: Number,
      default: 12,
      min: 0,
      max: 23,
    },
    lunchEnd: {
      type: Number,
      default: 14,
      min: 1,
      max: 24,
    },
    // Specific dates to block (holidays, days off)
    blockedDates: {
      type: [Date],
      default: [],
    },
    // How many days in advance can book
    maxAdvanceDays: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Availability', availabilitySchema);
