/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const mongoose = require('mongoose');
const cors = require('cors');

const argv = require('./argv');
const port = require('./port');
const { messagesRouter } = require('./routes/messages');
const { featureFlagsRouter } = require('./routes/featureFlags');
const { loginRouter } = require('./routes/login');
const { servicesRouter } = require('./routes/nextJsServices');

const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use(cors());
app.use(express.json());
app.use('/api/messages', messagesRouter);
app.use('/api/feature-flags', featureFlagsRouter);
app.use('/api/login', loginRouter);
app.use('/api/services', servicesRouter);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// https://cloud.mongodb.com/
mongoose.connect(
  isDev
    ? 'mongodb+srv://bee-it-user:bee-it-user@bee-it-messenger.e5nip.mongodb.net/bee-it-messenger?retryWrites=true&w=majority'
    : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  },
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Connected to DB');
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
