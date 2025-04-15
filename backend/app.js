const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const path = require('path');


const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Clothing Store Management System API');
  });
  
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/includes', require('./routes/includesRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

module.exports = app;
const PORT = 3001;
// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


