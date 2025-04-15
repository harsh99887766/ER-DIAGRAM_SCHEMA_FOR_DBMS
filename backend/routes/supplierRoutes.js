const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const db = require('../config/db');
router.get('/', async (req, res) => {
    try {
      const [suppliers] = await db.query('SELECT * FROM suppliers');
      res.json(suppliers);
    } catch (err) {
      console.error('Error fetching suppliers:', err); // <-- Add this
      res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
  });
router.post('/', supplierController.addSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;