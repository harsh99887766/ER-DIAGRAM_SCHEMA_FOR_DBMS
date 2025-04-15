const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  const [rows] = await Category.getAllCategories();
  res.json(rows);
};

exports.addCategory = async (req, res) => {
  await Category.createCategory(req.body);
  res.status(201).json({ message: 'Category added' });
};

exports.deleteCategory = async (req, res) => {
  await Category.deleteCategory(req.params.id);
  res.json({ message: 'Category deleted' });
};