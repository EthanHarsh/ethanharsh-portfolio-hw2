const express = require('express');
const router = express.Router();

router
    .route('/forkify')
    .get((req, res) => res.render('forkify/index.ejs'));

router
    .route('/pig_dice')
    .get((req, res) => res.render('pig_dice/index.ejs'));

router
    .route('/pig_dice/rules')
    .get((req, res) => res.render('pig_dice/rules/index.ejs'));

router
    .route('/budgety')
    .get((req, res) => res.render('budgety/index.ejs'));

module.exports = router;