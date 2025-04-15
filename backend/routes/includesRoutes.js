const express = require('express');
const router = express.Router();
const includesController = require('../controllers/includesController');
const db = require('../config/db');

router.post('/', includesController.addItemIncludes);
router.delete('/', includesController.deleteItemIncludes);

module.exports = router;