const db = require('../config/db');

exports.getAllSuppliers = () => db.query('SELECT * FROM Suppliers');
exports.createSupplier = (data) => {
    // Map frontend fields to database fields
    const dbData = {
        S_name: data.name,
        S_det: data.details
    };
    return db.query('INSERT INTO Suppliers SET ?', [dbData]);
}
// exports.deleteSupplier = (name) =>{
//    return db.query('DELETE FROM Suppliers WHERE S_name = ?', [name]);
// }

exports.deleteSupplier = async (name) => {
    try {
      // Check if supplier exists
      const [rows] = await db.query('SELECT * FROM Suppliers WHERE S_name = ?', [name]);
  
      if (rows.length === 0) {
        // Supplier doesn't exist
        return { success: false, message: "Supplier doesn't exist." };
      }
  
      // Supplier exists, so delete
      await db.query('DELETE FROM Suppliers WHERE S_name = ?', [name]);
      return { success: true, message: "Supplier deleted successfully." };
  
    } catch (err) {
      // Handle DB errors
      console.error(err);
      return { success: false, message: "Error occurred while deleting supplier." };
    }
  };