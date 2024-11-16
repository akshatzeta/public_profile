const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const profileFilePath = path.join(__dirname, '../data/profile.json');
const pendingProfileFilePath = path.join(__dirname, '../data/pendingProfiles.json');

// Utility to read JSON files
const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

// Utility to write JSON files
const writeJSONFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Helper function to generate a random ID
const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);  // Random number between 0 and 999999
};

// Get all approved profiles
router.get('/', async (req, res) => {
  try {
    const data = await readJSONFile(profileFilePath);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error reading profiles' });
  }
});

// Get pending profiles
router.get('/pending', async (req, res) => {
  try {
    const data = await readJSONFile(pendingProfileFilePath);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error reading pending profiles' });
  }
});

// Add pending profile
router.post('/pending', async (req, res) => {
  try {
    const newProfile = req.body;

    // Assign a random ID to the new profile
    newProfile.id = generateRandomId();

    const pendingProfiles = await readJSONFile(pendingProfileFilePath);
    pendingProfiles.push(newProfile);
    await writeJSONFile(pendingProfileFilePath, pendingProfiles);

    res.status(201).json({ message: 'Profile submitted for approval' });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting profile' });
  }
});

// Approve profile
router.post('/approve/:id', async (req, res) => {
  try {
    const profileId = parseInt(req.params.id, 10);
    const pendingProfiles = await readJSONFile(pendingProfileFilePath);
    const approvedProfile = pendingProfiles.find((profile) => profile.id === profileId);

    if (!approvedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Remove from pendingProfiles.json
    const updatedPendingProfiles = pendingProfiles.filter((profile) => profile.id !== profileId);
    await writeJSONFile(pendingProfileFilePath, updatedPendingProfiles);

    // Add to profiles.json
    const profiles = await readJSONFile(profileFilePath);
    profiles.push(approvedProfile);
    await writeJSONFile(profileFilePath, profiles);

    res.json({ message: 'Profile approved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error approving profile' });
  }
});
// Reject profile: Remove the profile from pendingProfiles.json
router.post('/pending', async (req, res) => {
  try {
    const updatedPendingProfiles = req.body; // The updated list sent from the frontend

    // Write the updated list back to the pendingProfiles.json file
    await writeJSONFile(pendingProfileFilePath, updatedPendingProfiles);

    res.status(200).json({ message: 'Profile rejected successfully' });
  } catch (err) {
    console.error("Error rejecting profile:", err);
    res.status(500).json({ error: 'Error rejecting profile' });
  }
});



module.exports = router;