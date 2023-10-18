const express = require('express');
const router = express.Router();

//Setup routes
router.route('/')
    .get((req, res) =>{
        res.render('dashboard');

    });

module.exports = router;