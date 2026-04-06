const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

console.log('MONGO_URI loaded:', process.env.MONGO_URI ? 'YES' : 'NOT SET');

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté pour le seeding...');

    // Check if default admin already exists
    const existingAdmin = await Admin.findOne({
      email: 'admin@leadgenbooster.ca',
    });

    if (existingAdmin) {
      console.log('Admin par défaut existe déjà — aucune action requise.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      firstName: 'Admin',
      lastName: 'LeadGenBooster',
      email: 'admin@leadgen-booster.com',
      password: '***REMOVED***',
      phone: '+1 (514) 000-0000',
      userType: 'Admin',
      role: 'super_admin',
      permissions: [
        'manage_blogs',
        'manage_careers',
        'manage_meetings',
        'manage_quotations',
        'manage_newsletter',
        'manage_users',
      ],
      isActive: true,
    });

    console.log(`Admin par défaut créé avec succès:`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Rôle:  ${admin.role}`);
    console.log(`  Type:  ${admin.userType}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`Erreur lors du seeding:`);
    console.error(`  Message: ${error.message}`);
    console.error(`  Stack: ${error.stack}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();
