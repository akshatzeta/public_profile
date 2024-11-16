const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const adminFilePath = path.join(__dirname, '../data/admin.json');

// Admin login route (No password hashing or JWT)
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Read admin data from admin.json
    const admins = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

    // Find the admin account by email
    const admin = admins.find(a => a.email === email);

    // If admin doesn't exist or password doesn't match, return error
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Return success if credentials are correct
    res.status(200).json({ message: 'Admin login successful', admin });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
