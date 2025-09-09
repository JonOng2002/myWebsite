const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const nowPlayingRoute = require('./api/now-playing');
const contactRoute = require('./api/contact');

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/now-playing', nowPlayingRoute);
app.use('/contact', contactRoute);

// For production, serve the frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(port, () => {
  consoe.log(`Server running on port ${port}`);
       });