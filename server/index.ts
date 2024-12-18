const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const fileUpload = require('express-fileupload');

// For getting Vercel to work
app.get("/", (req, res) => res.send("Express on Vercel"));

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use(fileUpload()); //Used for accepting file uploads

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
