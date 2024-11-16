// routes/auth.js
const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();
const userFilePath = path.join(__dirname, '../data/user.json');
const adminFilePath = path.join(__dirname, '../data/admin.json');

const secretKey = 'your_secret_key';

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role: 'user',
    };

    users.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
    const admins = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

    const user = users.find(u => u.email === email);
    const admin = admins.find(a => a.email === email);

    const account = user || admin;

    if (!account) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: account.id, email: account.email, role: account.role },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Verify route (for protected routes)
router.get('/verify', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token required.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.status(200).json({ message: 'Token valid', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
});

module.exports = router;
