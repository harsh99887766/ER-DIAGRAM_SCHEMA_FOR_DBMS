const db = require('../config/db');

exports.getAllItems = () => db.query('SELECT * FROM Items');

// exports.getAllItemsToChoose = async () => {
//     const [rows] = await db.query(`
//       SELECT Items.I_id, Categories.Cat_name 
//       FROM Items 
//       JOIN Categories ON Items.Cat_id = Categories.Cat_id
//     `);
//     return rows;
//   };

exports.createItem = (data) => {
    const dbData = {
        Cat_id: data.selectedCat,
        I_price: data.price,
        I_brand: data.brand,
        I_size: data.size,
        I_sex: data.gender,
        I_stock: data.stock,
        I_name: data.name
    }
    return db.query('INSERT INTO Items SET ?', [dbData]);
}
exports.deleteItem = (id) => db.query('DELETE FROM Items WHERE I_id = ?', [id]);
exports.getItemId = async (catId) => {
    const [rows] = await db.query('SELECT I_id FROM Items WHERE Cat_id = ?', [catId]);
    return rows;
  };