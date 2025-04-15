import {React, useState, useEffect} from 'react';
import '../Style/remove.css';

function RemoveItem() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/items/')
      .then(res => res.json())
      .then(data => {setItems(data);console.log("Items:", data); })
      .catch(err => console.error('Error fetching items:', err));
      fetch('http://localhost:3001/api/categories/')
      .then(res => res.json())
      .then(data => {setCategories(data); })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete this item?");
    if (!confirm) return;

    fetch(`http://localhost:3001/api/items/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete item.");
        setItems(prev => prev.filter(item => item.I_id !== id));
        alert("Item deleted successfully!");
      })
      .catch(err => alert(err.message));
  };

  const getCategory = (cat_id) => {
    return categories.find(cat => cat.Cat_id === cat_id);
  };

  return (
    <div className="items-page">
      <h2>Item List</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Size</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Category</th>
            <th>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {items.map(item => {
            const category = getCategory(item.Cat_id);
            return (
              <tr key={item.I_id}>
                <td>{item.I_brand}</td>
                <td>{item.I_name}</td>
                <td>{item.I_size}</td>
                <td>{item.I_stock}</td>
                <td>{item.I_price}</td>
                <td>{category ? category.Cat_name : 'N/A'}</td>
                <td>{item.I_sex}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item.I_id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      height: '5vh',
                      width: '10vh',
                      border: 'none',
                      borderRadius: '5px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RemoveItem;