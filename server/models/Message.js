const mongoose = require('mongoose');

const opts = {
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000),
    createdAt: 'timestamp',
  },
};

const MessageSchema = new mongoose.Schema(
  {
    message: String,
    reactions: Array,
    username: String,
    timestamp: Number,
  },
  opts,
);

module.exports.MessageSchema = MessageSchema;
module.exports.Message = mongoose.model('messages', MessageSchema);
