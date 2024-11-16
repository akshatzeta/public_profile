// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const adminAuthRoutes = require('./routes/adminauth');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes, adminAuthRoutes);
app.use('/api/profiles', profileRoutes);
 // Change the route to make sure it doesn't conflict
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
