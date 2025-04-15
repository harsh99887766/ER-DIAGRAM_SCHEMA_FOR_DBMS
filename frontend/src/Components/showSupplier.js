import {React,useState , useEffect} from 'react';
import '../Style/showSupplier.css';

function ShowSupplier()
{
    const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/api/suppliers/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers frontend');
        }
        return response.json(); // Only call once
      })
      .then(data => {
        console.log("Fetched suppliers:", data); // Log here
        setSuppliers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading suppliers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="suppliers-page">
      <div className="table-wrapper">
      <h2>Suppliers</h2>
      <table>
        <thead>
          <tr>
            <th style={{  padding: '8px' }}>Supplier Name</th>
            <th style={{ padding: '8px' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.S_id}>
              <td style={{padding: '8px' }}>{supplier.S_name}</td>
              <td style={{padding: '8px' }}>{supplier.S_det}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ShowSupplier;