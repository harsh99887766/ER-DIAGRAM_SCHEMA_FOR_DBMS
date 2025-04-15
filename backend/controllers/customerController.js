const Customer = require('../models/customer');

exports.getCustomers = async (req, res) => {
  const [rows] = await Customer.getAllCustomers();
  res.json(rows);
};

// exports.addCustomer = async (req, res) => {
//   await Customer.createCustomer(req.body);
//   res.status(201).json({ message: 'Customer added' });
// };

exports.addCustomer = async (req, res) => {
  const result = await Customer.createCustomer(req.body);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message }); // 400 for client error like duplicate
  }
};
