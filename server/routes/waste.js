const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

// Route to log a scanned waste item
router.post('/log', wasteController.logWaste);

// Route to classify a waste item
router.post('/classify', wasteController.classifyWaste);

// Route to get user's waste log
router.get('/user/:userId/logs', wasteController.getWasteLogs);

// Add the missing leaderboard endpoint
router.get('/leaderboard', (req, res) => {
    res.json([
        { id: 1, username: 'EcoChampion', ecoImpact: 127 },
        { id: 2, username: 'GreenWarrior', ecoImpact: 98 },
        { id: 3, username: 'RecycleHero', ecoImpact: 76 }
    ]);
});

module.exports = router;