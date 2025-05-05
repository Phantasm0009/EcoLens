const express = require('express');
const multer = require('multer');
const { predictWaste } = require('./model'); // Assuming model.js exports a predictWaste function

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to store uploaded images

// Endpoint for waste prediction
router.post('/predict', upload.single('image'), async (req, res) => {
    try {
        const result = await predictWaste(req.file.path);
        res.status(200).json({ classification: result });
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({ error: 'Failed to classify waste' });
    }
});

module.exports = router;