const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    itemType: {
        type: String,
        enum: ['plastic', 'metal', 'glass', 'compost', 'landfill'],
        required: true
    },
    scannedAt: {
        type: Date,
        default: Date.now
    },
    impact: {
        co2Saved: {
            type: Number,
            default: 0
        },
        materialsRecycled: {
            type: Number,
            default: 0
        }
    }
});

const WasteLog = mongoose.model('WasteLog', wasteLogSchema);

module.exports = WasteLog;