const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log('UNCAUGHT EXCEPTION! shutting down..');
  if (process.env.NODE_ENV === 'production') process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(app.get('env')); // express environment variable (by default set to 'development')

//
// console.log(process.env); node "process" core module-                (need not want to require it's available anyways)
//                           node  environment variable                (nodejs sets a lot of environment variables itself  )
// node uses them internally eg:- cwd , home folder etc..               for some reason nodejs internally needs

//
//  in express many packages depend on a special
//  variable called NODE_ENV,so it's a variable
// that's kind of convention in which should
// define whether we're in development or production mode.
// express doesn't really define this variable,
//  we've to do that manually. 2 ways :
// 1 - using terminal and
// 2-  creating a config.env file and then using dotenv module
//     adding or saving them as environment variables in our node application

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
  console.log('connected to server listening at http://localhost:3000');
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
//
//we usually use environment variables like
// configuration settings for our applications.
// so whwnever our app need some configuration for
// stuff that might change based on environment that
// app is running in, we use environment variables.
// eg: we might use different databases for development
// and production or testing. we could define one variable
// for each and then activate the right database according
//  to the environment.
