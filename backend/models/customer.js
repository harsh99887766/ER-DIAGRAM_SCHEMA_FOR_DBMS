const db = require('../config/db');

// all the queries and the methods that are required to be implemented and to connect the database

exports.getAllCustomers = () => db.query('SELECT * FROM Customers');
exports.getCustomerById = (id) => db.query('SELECT * FROM Customers WHERE customer_id = ?', [id]);
// exports.createCustomer = (data) => db.query('INSERT INTO Customers SET ?', [data]);
// exports.createCustomer = (data) => {
//     // Map frontend fields to database fields
//     const dbData = {
//       C_name: data.name,
//       C_mob: data.mobile,
//       C_adr: data.address
//     };
  
//     return db.query('INSERT INTO Customers SET ?', [dbData]);
//   };

exports.createCustomer = async (data) => {
  const dbData = {
    C_name: data.name,
    C_mob: data.mobile,
    C_adr: data.address
  };

  try {
    await db.query('INSERT INTO Customers SET ?', [dbData]);
    return { success: true, message: 'Customer added successfully.' };
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'Customer already exists.' };
    } else {
      console.error(err);
      return { success: false, message: 'Failed to add customer.' };
    }
  }
};