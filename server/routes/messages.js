const express = require('express');
const bodyParser = require('body-parser');
const { Message } = require('../models/Message');
const messagesRouter = express.Router();
const jsonParser = bodyParser.json();

messagesRouter.get('/', async (req, res) => {
  const messages = await Message.find({});
  res.status(200).json(messages);
});

messagesRouter.post('/', jsonParser, (req, res) => {
  const message = new Message(req.body);
  message
    .save()
    .then(() => {
      res.json('Message added successfully');
    })
    .catch(() => {
      res.status(400).send('unable to save to database');
    });
});

messagesRouter.delete('/:id', (req, res) => {
  Message.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(204).json('Message deleted successfully');
    })
    .catch(() => {
      res.status(400).send('Unable to delete ');
    });
});

module.exports.messagesRouter = messagesRouter;
