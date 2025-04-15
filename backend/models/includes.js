const db = require('../config/db');

exports.createIncludes = (data) => {
    // Map frontend fields to database fields
    const dbData = {
        O_id: data.orderId,
        I_id: data.itemId,
        In_qty: data.qty,
    };
    return db.query('INSERT INTO Includes SET ?', [dbData]);
}

exports.deleteIncludes = (data) => {
    // Map frontend fields to database fields
    const dbData = {
        I_id: data.itemId,
        O_id: data.orderId,
    };
    return db.query('DELETE FROM Includes WHERE I_id = ? AND O_id = ?', [dbData.I_id, dbData.O_id]);
}