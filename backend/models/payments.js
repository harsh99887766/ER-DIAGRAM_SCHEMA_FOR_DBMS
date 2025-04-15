const db = require('../config/db');

exports.addPayment = (data) => {
    const dbData = {
        O_id: data.orderId,
        P_status: data.payStatus,
        P_mode: data.payMode,
        P_charge: data.amount,
        P_value: data.amount
    }
    return  db.query('INSERT INTO Payments SET ?', [dbData]);
}