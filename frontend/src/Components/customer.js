import {React , useState} from 'react';
import '../Style/form.css';

function Customer() {
    const [errorName,setErrorName] = useState("");  
    const [errorMobile,setErrorMobile] = useState("");  
    const [name,setName] = useState("");
    const [mobile,setMobile] = useState("");
    const [address,setAddress] = useState("");
  
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
  
      const checkContact = (e)=>
        {
          const value = e.target.value;
          if (/^[0-9]*$/.test(value)) 
          {
            setMobile(value);
            setErrorMobile("");
          } 
          else 
          {
            setErrorMobile("Only numbers are allowed!");
          }
        }

    // const handleSubmit = async(e) =>
    //   {
    //       e.preventDefault();
    //       try
    //       {
    //           // const res = await axios.post("http://localhost:5000/signUp", {name, email , age , gender , emergencyContact});
    //           // alert(res.data.message);
    //           // navigate("/home");
    //       }
    //       catch(err)
    //       {
    //           // alert("Registration failed : " + err.response.data.error);
    //           // navigate("/login");
    //       }
    //       console.log("submiitted");
    //   };

    const handleSubmit = async(e) =>
      {
          e.preventDefault();
          // fetch('http://localhost:3001/api/customers/', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ name, mobile, address }),
          // })
          //   .then((res) => {
          //     if (!res.ok) throw new Error('Failed to add customer');
          //     return res.json();
          //   })
          //   .then((data) => {
          //     console.log('Customer added:', data);
          //     alert('Customer added successfully!');
          //   })
          //   .catch((err) => alert(err.message));
          fetch('http://localhost:3001/api/customers/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, mobile, address }),
          })
            .then(async (res) => {
              const data = await res.json();
              if (!res.ok) throw new Error(data.message); // Use server message
              alert(data.message);
            })
            .catch((err) => alert(err.message));
      };
  
    return (
      <>
        <div className='page'>
          <div className='container'>
          <h2>Add Customer</h2>
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
          <input
            type="text"
            name="mobile"
            placeholder="Mobile No."
            value={mobile}
            onChange={checkContact}
            minLength={10}
            maxLength={10}
            required
          />
          {errorMobile && <p style={{ color: "red" }}>{errorMobile}</p>}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
            required
          />
          <button type="submit" style={{backgroundColor: "#007bff"}}>Add Customer</button>
        </form>
          </div>
        </div>
      </>
    );
}

export default Customer;