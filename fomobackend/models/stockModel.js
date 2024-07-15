const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({

    symbol: String,
    name: String,
    rate: Number,
    volume: Number,
    cap: Number,
    timestamp: { type: Date, default: Date.now }

});

stockSchema.index({ name: 1 });



module.exports = mongoose.model('Stock',stockSchema)