const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
};


app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(cookieParser()); 

app.use(authMiddleware); 

app.use(routes);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/furniture')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.listen(3000, () => console.log('Server running on port 3000...'));
