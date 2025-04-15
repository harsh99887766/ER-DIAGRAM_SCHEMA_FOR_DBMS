import {React , useState} from 'react';
import '../Style/form.css';

function Supplier() {

  const [errorName,setErrorName] = useState("");  
  const [name,setName] = useState("");

  const checkName = (e) =>
    {
      if (/^[A-Za-z]*$/.test(e.target.value)) 
      {
        setName(e.target.value);
        setErrorName(""); // Clear error if input is valid
      } 
      else 
      {
        setErrorName("Only alphabets are allowed!");
      }
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      fetch(`http://localhost:3001/api/suppliers/${name}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message); // show actual message from backend
          alert(data.message);
        })
        .catch((err) => alert(err.message));
    };


  return (
    <>
      <div className='page'>
        <div className='container'>
        <h2>Remove supplier</h2>
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
        <button type="submit" style={{backgroundColor: "#FF0000"}}>Remove Supplier</button>
      </form>
        </div>
      </div>
    </>
  );
}

export default Supplier;
