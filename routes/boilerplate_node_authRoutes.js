if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const initializePassport = require('./../configs/boilerplate_node_auth/passport-config.js');
const users = [];
initializePassport(
    passport, 
    email =>
    users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


router
    .route('/')
    .get(checkAuthenticated, (req, res) => {
        res.render('boilerplate_node_auth/index.ejs', { name: req.user.name});
    });

router
    .get('/login', checkNotAuthenticated, (req, res) => {
    console.log(users);
    res.render('boilerplate_node_auth/login.ejs')
});

router
    .post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router
    .get('/register', checkNotAuthenticated, (req, res) => {
    res.render('boilerplate_node_auth/register.ejs')
});

router
    .post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
    } catch {
        res.redirect('boilerplate_node_auth/register.ejs');
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

router
    .delete('/logout', (req, res) => {
        req.logOut();
        res.redirect('boilerplate_node_auth/login.ejs');
    });

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next();
}

module.exports = router;