const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const db = require('../config/db');
router.get('/', itemController.getAllItems);
// router.get('/choose', itemController.getAllItemsToChoose);
router.post('/', itemController.addItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;