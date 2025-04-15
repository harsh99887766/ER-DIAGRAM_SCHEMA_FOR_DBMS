const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  await Order.createOrder(req.body);
  res.status(201).json({ message: 'Order created' });
};

exports.checkCustomer = async (req, res) => {
  // const [rows] = await Order.getOrderByCustomer(req.params.query);
  // res.json(rows);
  try {
    const [rows] = await Order.checkCustomer(req.body.customerMob);
    const orderId = rows[1][0].Or_id;

    if (orderId) {
      console.log(orderId);
      res.json({ success: true, orderId });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    if (error.sqlState === '45000') {
      // This is the SIGNAL error from the stored procedure
      res.json({ success: false, message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};

// exports.getAmount = async (req, res) => {
//   try {
//     const amount = await Order.getAmount(req.body.orderId);

//     if (amount) {
//       console.log(amount);
//       res.json({ success: true, amount });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (error) {
//     if (error.sqlState === '45000') {
//       // This is the SIGNAL error from the stored procedure
//       res.json({ success: false, message: error.message });
//     } else {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   }
// };

exports.getAmount = async (req, res) => {
  try {
    const [result] = await Order.getAmount(req.body.orderId);

    if (result && result.length > 0) {
      console.log(result);
      const amount = result[0].O_total;
      console.log(amount);
      res.json({ success: true, amount });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    if (error.sqlState === '45000') {
      res.json({ success: false, message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};