require('dotenv').config()
const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const user = require('./routes/user');
const profile = require('./routes/profile');
const post = require('./routes/post');

const port = process.env.PORT || 5000;
const url = process.env.DB_URL || "mongodb://localhost:27017/contrivocial";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log(err ? err : "Database connection established")
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome'));
//Routes
app.use('/user', user);
app.use('/profile', profile);
app.use('/post', post);


app.listen(5000, () => console.log(`Server is running on port ${port}`));