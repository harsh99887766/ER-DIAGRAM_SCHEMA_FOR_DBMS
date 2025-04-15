import { React, useState } from 'react';
import '../Style/form.css';

function AddSupplier() {

  const [errorName, setErrorName] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const checkName = (e) => {
    if (/^[A-Za-z]*$/.test(e.target.value)) {
      setName(e.target.value);
      setErrorName(""); // Clear error if input is valid
    }
    else {
      setErrorName("Only alphabets are allowed!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/suppliers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, details }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add supplier');
        return res.json();
      })
      .then((data) => {
        console.log('Supplier added:', data);
        alert('Supplier added successfully!');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className='page'>
        <div className='container'>
          <h2>Add supplier</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={checkName}
              required
            />
            {errorName && <p style={{ color: "red" }}>{errorName}</p>} {/* Show error message */}
            <textarea
              rows="4"
              cols="50"
              name="detail"
              placeholder="Details of Supplier"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
            <input
              type="text"
              name="ItemName"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <input
              type="text"
              name="ItemCategory"
              placeholder="Item Category"
              value={itemCategory}
              onChange={(e) => { setItemCategory(e.target.value) }}
              required
            />
            <button type="submit" style={{ backgroundColor: "#007bff" }}>Add Supplier</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddSupplier;
