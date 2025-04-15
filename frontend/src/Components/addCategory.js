import {React,useState} from 'react';
import '../Style/form.css';

function AddCategory() {  
  const [name,setName] = useState("");
  const [details,setDetails] = useState("");

  const handleSubmit = async(e) =>
    {
        e.preventDefault();
        fetch('http://localhost:3001/api/categories/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, details }),
        })
          .then((res) => {
            if (!res.ok) throw new Error('Failed to add category');
            return res.json();
          })
          .then((data) => {
            console.log('Category added:', data);
            alert('Category added successfully!');
          })
          .catch((err) => alert(err.message));
    };

  return (
    <>
      <div className='page'>
        <div className='container'>
        <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          required
        />
        <textarea
          rows="4"
          cols="50"
          name="details"
          placeholder="Details of category"
          value={details}
          onChange={(e)=>setDetails(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>
        </div>
      </div>
    </>
  );
}

export default AddCategory;