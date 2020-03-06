require('dotenv').config()
const app = require('express')();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const mongoose = require('mongoose');
// const passport = require('passport');
const user = require('./routes/api/user');
// const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const port = process.env.PORT || 5000;

//Connect database
connectDB();
app.get('/', (req, res) => res.send('API running'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// //Passport middleware and config
// app.use(passport.initialize());
// require('./config/passport')(passport);

// //Routes
app.use('/api/user', user);
// app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/post', post);


app.listen(5000, () => console.log(`Server is running on port ${port}`));