const express = require('express');
const { Message } = require('../models/Message');
const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const { search } = req.query;
  const findParams = search ? { message: { $regex: `.*${search}.*` } } : {};
  const messages = await Message.find(findParams).sort({ timestamp: 'desc' });
  res.status(200).json(messages);
});

messagesRouter.post('/', (req, res) => {
  const message = new Message(req.body);
  message
    .save()
    .then(() => {
      res.status(200).send('Added');
    })
    .catch(() => {
      res.status(400).send('unable to save to database');
    });
});

messagesRouter.put('/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body, {}, () =>
    res.status(200).send('Updated'),
  );
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
