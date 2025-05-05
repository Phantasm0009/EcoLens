const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile
router.get('/:id', userController.getProfile);

// Update user profile
router.put('/:id', userController.updateProfile);

// Get user eco impact - Add this new endpoint
router.get('/:id/impact', (req, res) => {
    // Mock eco impact data
    res.json({
        co2Saved: 45,
        materialsRecycled: 23,
        rank: 5
    });
});

module.exports = router;