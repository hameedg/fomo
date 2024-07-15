const express = require('express');
const { pollData, getRecentData } = require('../controllers/stockController');

const router = express.Router();

router.get('/poll', pollData);
router.get('/recent/:name', getRecentData);

module.exports = router;
