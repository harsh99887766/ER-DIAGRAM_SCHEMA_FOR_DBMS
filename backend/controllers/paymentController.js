const Payment = require('../models/payments');

exports.addPayment = async (req, res) => {
  await Payment.addPayment(req.body);
  res.status(201).json({ message: 'Payment Done' });
};