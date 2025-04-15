import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Home from './Components/home';
import ShowSuppliers from './Components/showSupplier';
import AddSupplier from './Components/addSupplier';
import RemoveSupplier from './Components/removeSupplier';
import Customer from './Components/customer';
import Orders from './Components/orders';
import AddItems from './Components/addItems';
import RemoveItems from './Components/removeItems';
import AddCategory from './Components/addCategory';
import RemoveCategory from './Components/removeCategory';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suppliers/list" element={<ShowSuppliers />} />
        <Route path="/suppliers/add" element={<AddSupplier />} />
        <Route path="/suppliers/remove" element={<RemoveSupplier />} />
        <Route path="/customers/" element={<Customer />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/items/add" element={<AddItems />} />
        <Route path="/items/remove" element={<RemoveItems />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/remove" element={<RemoveCategory />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
