 const mongoose = require('mongoose');

 const watsonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: String,
    message: String,
    channel: String,
    intent: String
 });

 module.exports = mongoose.model('watson', watsonSchema);