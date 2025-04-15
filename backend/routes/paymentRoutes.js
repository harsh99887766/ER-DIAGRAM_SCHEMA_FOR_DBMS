const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const db = require('../config/db');
router.post('/', paymentController.addPayment);

module.exports = router;