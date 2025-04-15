const db = require('../config/db');

exports.createOrder = (data) => db.query('INSERT INTO Orders SET ?', [data]);
// exports.getOrderByCustomer = (phoneOrNameOrId) =>
//   db.query(`SELECT * FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id
//             WHERE c.phone = ? OR c.name = ? OR c.customer_id = ?`,
//             [phoneOrNameOrId, phoneOrNameOrId, phoneOrNameOrId]);

exports.checkCustomer = (mobile) => 
{
  return db.query('CALL AddOrder(?, @Or_id); SELECT @Or_id AS Or_id;', [mobile]);
}

exports.getAmount = (orderId) => 
{
  return db.query('SELECT O_total FROM Orders WHERE O_id = ?', [orderId]);
}