import express from 'express';
import mongoose from 'mongoose';

import ApiRoutes from './routes/api/auth.routes';
import { MONGO_URI, PORT } from './config';
import errorHandler from './error-handler';

const app = express();
app.use('api', ApiRoutes);

(async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI, {
    	useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log('port listened');
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
    process.exit(1);
  }
}());

app.use(errorHandler);
