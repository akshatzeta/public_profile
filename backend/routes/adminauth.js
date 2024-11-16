const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const adminFilePath = path.join(__dirname, '../data/admin.json');


router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
   
    const admins = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

    
    const admin = admins.find(a => a.email === email);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

  
    res.status(200).json({ message: 'Admin login successful', admin });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
