const express = require('express');
const featureFlagsRouter = express.Router();

featureFlagsRouter.get('/', async (req, res) => {
  const ffs = {
    search: {
      enabled: true,
    },
    showIcon: {
      enabled: false,
    },
  };
  res.status(200).json(ffs);
});

module.exports.featureFlagsRouter = featureFlagsRouter;
