const db = require('../config/db');

exports.getAllCategories = () => db.query('SELECT * FROM Categories');
exports.createCategory = (data) => {
    const dbData = {
        Cat_name: data.name,
        Cat_det: data.details
    }
    return db.query('INSERT INTO Categories SET ?', [dbData]);
}
exports.deleteCategory = (id) => {
    return db.query('DELETE FROM Categories WHERE Cat_id = ?', [id]);
}
