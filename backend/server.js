const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const nowPlayingRoute = require('./api/now-playing');
const contactRoute = require('./api/contact');
const healthCheckRoute = require('./api/healthcheck');

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/now-playing', nowPlayingRoute);
app.use('/api/contact', contactRoute);
app.use('/api/health', healthCheckRoute);

// For production, serve the frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  });

