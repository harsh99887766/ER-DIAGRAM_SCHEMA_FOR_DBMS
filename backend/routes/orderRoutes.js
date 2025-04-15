const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const db = require('../config/db');
router.get('/', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
router.post('/', orderController.createOrder);
router.post('/checkCustomer', orderController.checkCustomer);
router.post('/getAmount', orderController.getAmount);

module.exports = router;