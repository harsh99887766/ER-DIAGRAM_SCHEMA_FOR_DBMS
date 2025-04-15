const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const db = require('../config/db');
router.get('/', async (req, res) => {
    try {
        const [customers] = await db.query('SELECT * FROM customers');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});
router.post('/', customerController.addCustomer);

module.exports = router;