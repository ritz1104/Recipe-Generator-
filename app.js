const express = require('express');
require('dotenv').config();
const app = express();
const ConnectDB = require('./config/db');
ConnectDB();
const userRoutes = require('./routes/user.routes');
const indexRoutes = require('./routes/index.routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',indexRoutes);
app.use('/user', userRoutes);

app.listen('3000', (req, res) => {
    console.log('Server is running on port 3000');
});