const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const db = require('../config/db');
router.get('/', async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
router.post('/', categoryController.addCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;