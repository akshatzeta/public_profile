router.post('/pending', async (req, res) => {
    try {
      const newProfile = req.body;
      const pendingProfiles = await readJSONFile(pendingProfileFilePath);
      pendingProfiles.push(newProfile);
      await writeJSONFile(pendingProfileFilePath, pendingProfiles);
      res.status(201).json({ message: 'Profile submitted for approval' });
    } catch (err) {
      res.status(500).json({ error: 'Error submitting profile' });
    }
  });
  //working post pending