const Supplier = require('../models/supplier');

exports.getSuppliers = async (req, res) => {
  const [rows] = await Supplier.getAllSuppliers();
  res.json(rows);
};

exports.addSupplier = async (req, res) => {
  await Supplier.createSupplier(req.body);
  res.status(201).json({ message: 'Supplier added' });
};

exports.deleteSupplier = async (req, res) => {
  const result =await Supplier.deleteSupplier(req.params.id);
  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(404).json({ message: result.message });
  }
};