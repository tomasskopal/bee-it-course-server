const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: String,
  author: String,
});

module.exports.MessageSchema = MessageSchema;
module.exports.Message = mongoose.model('messages', MessageSchema);
