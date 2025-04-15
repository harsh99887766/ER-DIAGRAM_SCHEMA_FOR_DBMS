const Includes = require('../models/includes');

exports.addItemIncludes = async (req, res) => {
  await Includes.createIncludes(req.body);
  res.status(201).json({ message: 'Item added' });
};

exports.deleteItemIncludes = async (req, res) => {
  await Includes.deleteIncludes(req.body);
  res.status(201).json({ message: 'Item deleted' });
};