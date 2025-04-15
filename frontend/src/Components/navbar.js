import {React , useState} from 'react';
import {Link} from 'react-router-dom';
import '../Style/navbar.css';

function Navbar() {

  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const toggleSupplierDropdown = () => setShowSupplierDropdown(!showSupplierDropdown);
  const closeSupplierDropdown = () => setShowSupplierDropdown(false);
  const toggleItemsDropdown = () => setShowItemsDropdown(!showItemsDropdown);
  const closeItemsDropdown = () => setShowItemsDropdown(false);
  const toggleCategoryDropdown = () => setShowCategoryDropdown(!showCategoryDropdown);
  const closeCategoryDropdown = () => setShowCategoryDropdown(false);

  return (
    <>
    <nav className="navbar">
      <div className="navbar-brand">Cloth Manager</div>
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        {/* <li className="dropdown" onMouseEnter={()=>setShowDropdown(true)} onMouseLeave={closeDropdown}> */}
        <li className="dropdown">
          <span onClick= {toggleSupplierDropdown} >Suppliers</span>
          {showSupplierDropdown && (
            <ul className="floating-dropdown suppliers">
              <li><Link to="/suppliers/list" onClick={closeSupplierDropdown}>Show Suppliers</Link></li>
              <li><Link to="/suppliers/add" onClick={closeSupplierDropdown}>Add Supplier</Link></li>
              <li><Link to="/suppliers/remove" onClick={closeSupplierDropdown}>Remove Supplier</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li className="dropdown">
          <span onClick= {toggleItemsDropdown} >Items</span>
          {showItemsDropdown && (
            <ul className="floating-dropdown items">
              <li><Link to="/items/add" onClick={closeItemsDropdown}>Add Item</Link></li>
              <li><Link to="/items/remove" onClick={closeItemsDropdown}>Remove Item</Link></li>
            </ul>
          )}
        </li>
        <li className="dropdown" >
          <span onClick= {toggleCategoryDropdown} >Category</span>
          {showCategoryDropdown && (
            <ul className="floating-dropdown category">
              <li><Link to="/categories/add" onClick={closeCategoryDropdown}>Add Category</Link></li>
              <li><Link to="/categories/remove" onClick={closeCategoryDropdown}>Remove Category</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
    </>
  );
}

export default Navbar;

/* <li className="dropdown" onMouseEnter={toggleCustomerDropdown} onMouseLeave={toggleCustomerDropdown}>
  <span onClick= {toggleCustomerDropdown} >Customers</span>
  {showCustomerDropdown && (
    <ul className="floating-dropdown customers">
      <li><Link to="/suppliers/add" onClick={closeCustomerDropdown}>Add Customer</Link></li>
    </ul>
  )}
</li> */