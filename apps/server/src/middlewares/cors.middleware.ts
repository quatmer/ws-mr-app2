import cors, { CorsOptions } from 'cors';

const whitelist = ['http://localhost:8100'];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS:${origin}`));
    }
  },
  exposedHeaders: ['auth', 'fire-auth'],
};

export const corsCredential = cors({ exposedHeaders: ['auth', 'fire-auth'] }); //corsOptions
