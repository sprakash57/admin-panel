require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const connectDB = require('./config/db');
const logger = require('morgan');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const swaggerSpec = require('./swaggerSpec');

const port = process.env.PORT || 5000;

//Database
connectDB();
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ extended: false }));

//Routes 
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/post', post);

//Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen(5000, () => console.log(`Server is running on port ${port}`));
