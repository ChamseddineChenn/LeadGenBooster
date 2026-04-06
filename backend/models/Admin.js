const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['super_admin', 'admin'],
    default: 'admin',
  },
  permissions: {
    type: [String],
    default: [
      'manage_blogs',
      'manage_careers',
      'manage_meetings',
      'manage_quotations',
      'manage_newsletter',
      'manage_users',
    ],
  },
});

const Admin = User.discriminator('Admin', adminSchema);

module.exports = Admin;
