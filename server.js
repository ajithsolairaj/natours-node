const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log('UNCAUGHT EXCEPTION! shutting down..');
  if (process.env.NODE_ENV === 'production') process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`connected to server listening at port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION! shutting down..');
  if (process.env.NODE_ENV === 'production')
    server.close(() => {
      process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
  console.log('errror', err);
  console.log('UNCAUGHT EXCEPTION! shutting down..', err);
  if (process.env.NODE_ENV === 'production')
    server.close(() => {
      process.exit(1);
    });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED, Shutting down gracefully');
  server.close(() => {
    console.log('🎆 process terminated');
  });
});
