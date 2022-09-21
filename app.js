//paqueterias
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');

//Routes
const { userRouter } = require('./routes/user.routes');
const { characterRouter } = require('./routes/character.routes');
const { movieRouter } = require('./routes/movie.routes');
const { genreRouter } = require('./routes/genre.routes');
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./utils/appError');

//Init Express
const app = express();

//Enable Cors
app.use(cors());

//Enable Morgan
app.use(morgan('default'));

//Enable incomig JSON data
app.use(express.json());

// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hr
  message: 'Number of requests have been exceeded',
});

app.use(limiter);

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

//Endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/characters', characterRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/genre', genreRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

// Handling incoming errors
app.use(globalErrorHandler);

module.exports = { app };
