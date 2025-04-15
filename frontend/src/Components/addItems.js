import {React , useState , useEffect} from 'react';
import '../Style/form.css';

function AddItems() { 
    const [brand,setBrand] = useState("");
    const [name,setName] = useState("");
    const [size,setSize] = useState("");
    const [gender,setGender] = useState("");
    const [price,setPrice] = useState("");
    const [stock,setStock] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');

    useEffect(() => {
      fetch('http://localhost:3001/api/categories/') // Update with your actual endpoint
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch categories');
          return res.json();
        })
        .then((data) => setCategories(data))
        .catch((err) => alert(err.message));
    }, []);

    const handleSubmit = async(e) =>
      {
          e.preventDefault();
          fetch('http://localhost:3001/api/items/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({selectedCat,price: price === "" ? 0 : parseFloat(price),brand,size,gender,stock: stock === "" ? 0 : parseInt(stock),name}),
          })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to add item');
              return res.json();
            })
            .then((data) => {
              console.log('Item added:', data);
              alert('Item added successfully!');
            })
            .catch((err) => alert(err.message));
      };
  
  
    return (
      <>
        <div className='page'>
          <div className='container'>
          <h2>Add Items</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="brand"
            placeholder="Item brand"
            value={brand}
            onChange={(e)=>{setBrand(e.target.value)}}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Item name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            required
          />
          <select className="select" value={size} onChange={(e)=>setSize(e.target.value)} style={{width: "375px",
          padding: "12px",
          margin: "10px 0",
          border: "none",
          borderRadius: "5px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          fontSize: "16px",
          outline: "none"}} required>
            {/* <option value="">-- Select --</option> Placeholder */}
            <option value="" disabled hidden>Select Size</option> {/* Acts as a placeholder */}
            <option value="XXS">XXS</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <select className="select" value={gender} onChange={(e)=>setGender(e.target.value)} style={{width: "375px",
          padding: "12px",
          margin: "10px 0",
          border: "none",
          borderRadius: "5px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          fontSize: "16px",
          outline: "none"}} required>
            {/* <option value="">-- Select --</option> Placeholder */}
            <option value="" disabled hidden>Select Gender</option> {/* Acts as a placeholder */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
          <select className="select" value={selectedCat} onChange={(e)=>{setSelectedCat(e.target.value)}} style={{width: "375px",
          padding: "12px",
          margin: "10px 0",
          border: "none",
          borderRadius: "5px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          fontSize: "16px",
          outline: "none"}}>
            <option value="" disabled hidden>Select category</option>
            {categories.map((cat) => (
              <option key={cat.Cat_id} value={cat.Cat_id}>
                {cat.Cat_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            step="0.01" // Allows decimal values like 10.25
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock"
            step="0.01" // Allows decimal values like 10.25
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <button type="submit" style={{backgroundColor: "#007bff"}}>Add Item</button>
        </form>
          </div>
        </div>
      </>
    );
}

export default AddItems;