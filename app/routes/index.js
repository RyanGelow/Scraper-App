const express = require('express');
const path = require('path');
const router = express.Router();


const apiRoutes = require('./apiRoutes.js');
const htmlRoutes = require('./htmlRoutes.js');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

// Make public a static folder
router.use(express.static(path.join(__dirname, "../public")));

module.exports = router;