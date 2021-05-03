if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');


//const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes');
//const APIRoutes = require('./routes/APIRoutes');

const app = express();

//view engine
app.set('view-engine', 'ejs');

//middleware
app.use(express.static('public'));


//routes
app.get('/', (req, res) => res.render('index.ejs'));
//app.use(authRoutes);
app.use('/projects', projectRoutes);
//app.use('/api/v1', APIRoutes);
module.exports = app;