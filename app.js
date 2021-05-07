if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const Project = require('./models/projectModel');

//const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes');
//const APIRoutes = require('./routes/APIRoutes');

const app = express();

//view engine
app.set('view-engine', 'ejs');

//middleware
app.use(express.static('public'));


//routes
app.get('/', async (req, res) =>{
    const projects = await Project.find().sort({
        createdAt: 'desc'
    });

    res.render('index.ejs', {projects: projects});
}); 
//app.use(authRoutes);
app.use('/projects', projectRoutes);
//app.use('/api/v1', APIRoutes);
app.use((req, res, next) => {
    res.render('404.ejs');
})
module.exports = app;