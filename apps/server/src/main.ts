import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from './config';
import { connect } from 'mongoose';
import router from './routes';
import { handleRouteError, handleError } from './middlewares/error.middleware';
import { corsCredential } from './middlewares/cors.middleware';
import { logger } from './middlewares/logger.middleware';
import * as admin from 'firebase-admin';

const firebaseConfig = require('./firebase.config.json'); // json import format

// firebase initialize
admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });

const app = express();

// middleware
app.use(bodyParser.json());
app.use(corsCredential);
app.use(logger);

//routes
app.use(router);

// Errors
app.use(handleRouteError);
app.use(handleError);

// connect database
connect(config.mongoURL, {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false
})
  .then(() => {
    const PORT = config.port || 3001;

    // listen port
    app.listen(PORT, err => {
      if (err) return console.error(err);
      return console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Database connection failed:', err);
  });
