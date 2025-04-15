import {React, useState, useEffect} from 'react';
import '../Style/remove.css';

function RemoveCategory() {
    const [category, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/categories/')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete this category?");
    if (!confirm) return;

    fetch(`http://localhost:3001/api/categories/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete category.");
        setCategories(prev => prev.filter(category => category.Cat_id !== id));
        alert("Category deleted successfully!");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="items-page">
      <h2>Category List</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {category.map(category => (
            <tr key={category.Cat_id}>
              <td>{category.Cat_name}</td>
              <td>{category.Cat_det}</td>
              <td><button  onClick={() => handleDelete(category.Cat_id)} style={{ backgroundColor: 'red', color: 'white' ,height: '5vh',width: '10vh' , border:"none" , borderRadius:"5px"}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RemoveCategory;