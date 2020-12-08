const express = require('express');
const servicesRouter = express.Router();

servicesRouter.get('/', async (req, res) => {
  const services = [
    {
      id: 'service1',
      img: 'services-1.jpg',
      title: 'Off The Ground Off The Ground',
      description: 'Perfect for fresh ideas or young startups, this package will help get the business off the ground',
      price: '$199',
    },
    {
      id: 'service2',
      img: 'services-2.jpg',
      title: 'Accelerated Growth',
      description: 'Use this service pack to give your company the necessary impulse to become an leader',
      price: '$299',
    },
    {
      id: 'service3',
      img: 'services-3.jpg',
      title: 'Off The Ground Off The Ground',
      description: 'You already are a reference point in your industry now you need to learn about',
      price: '$399',
    },
  ];
  res.status(200).json(services);
});

module.exports.servicesRouter = servicesRouter;
