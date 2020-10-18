const mongoose = require('mongoose');

const whatsappSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   from: String, 
   to: String,
   message: String
});

module.exports = mongoose.model('whatsapp', whatsappSchema);