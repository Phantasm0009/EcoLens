const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); // Add this dependency
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const wasteRoutes = require('./routes/waste');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware with increased payload limit for images
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ecolens', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/waste', wasteRoutes);

// Add missing API endpoints
app.get('/api/waste/leaderboard', (req, res) => {
    // Mock leaderboard data
    res.json([
        { id: 1, username: 'EcoChampion', ecoImpact: 127 },
        { id: 2, username: 'GreenWarrior', ecoImpact: 98 },
        { id: 3, username: 'RecycleHero', ecoImpact: 76 }
    ]);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});