import {React,useState , useEffect} from 'react';
import '../Style/orders.css';

function Orders() {
    const [items,setItems] = useState([]);
    const [customerMob, setCustomerMob] = useState("");
    const [errorMobile, setErrorMobile] = useState("");
    const [payMode, setPayMode] = useState("");
    const [payStatus, setPayStatus] = useState("Completed");
    const [showItems, setShowItems] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showThankyou, setShowThankyou] = useState(false);
    const [item, setItem] = useState("");
    const [orderId, setOrderId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [qty, setQty] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);

    const checkCustomer = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('http://localhost:3001/api/orders/checkCustomer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerMob })
          });
    
          const data = await res.json();
    
          if (data.success) {
            setShowItems(true);
            setOrderId(data.orderId);
            console.log('success , ',data.orderId);
            // console.log('orderId , ',orderId);
          } else {
            setShowItems(false);
            alert(data.message || 'Customer not found.');
          }
        } catch (err) {
          console.error('Error:', err);
          setShowItems(false);
        }
      };
    
    useEffect(() => {
        setShowItems(false);
        setShowPayment(false);
        // Fetch items when the component mounts
        fetch('http://localhost:3001/api/items/')
          .then(res => res.json())
          .then(data => setItems(data))
          .catch(err => console.error('Error fetching items:', err));
      }, []);

    const checkContact = (e)=>
    {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) 
        {
        setCustomerMob(value);
        setErrorMobile("");
        } 
        else 
        {
        setErrorMobile("Only numbers are allowed!");
        }
    }

    const handleSelect = (e) => {
        e.preventDefault();
        if (item && qty>0 && !selectedTags.includes(item)) {
          let itemName = items.find(i => i.I_id === parseInt(item)).I_name;
          setSelectedTags([...selectedTags, { item: item, itemName: itemName , quantity: qty }]);
          setItem('');
          setQty(0);
          fetch('http://localhost:3001/api/includes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId ,itemId:parseInt(item) ,qty }),
          })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to add items');
              return res.json();
            })
            .then((data) => {
              console.log('Items added:', data);
              alert('Items added successfully!');
            })
            .catch((err) => alert(err.message));
        }
        else{
          alert("Please select an item and quantity");
        } // reset select
      }

      const removeTag = (tagToRemove) => {
        fetch('http://localhost:3001/api/includes/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId: parseInt(tagToRemove.item) , orderId}),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to delete item');
                setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
                return res.json();
            })
            .then((data) => {
                console.log('Item deleted:', data);
                alert('Item deleted successfully!');
            })
            .catch((err) => alert(err.message));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        setIsSelectDisabled(true);
        try {
          const res = await fetch('http://localhost:3001/api/orders/getAmount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId })
          });
    
          const data = await res.json();
    
          if (data.success) {
            setShowPayment(true);
            setAmount(data.amount);
            console.log('success , ',data.amount);
            // console.log('orderId , ',orderId);
          } else {
            setShowItems(false);
            alert(data.message || 'Order not found.');
          }
        } catch (err) {
          console.error('Error:', err);
        }
    }

    const handlePayment = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/payments/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, payStatus, payMode , amount }),
        })
          .then((res) => {
            if (!res.ok) throw new Error('Failed to do the payment');
            setShowItems(false);
            setShowPayment(false);
            setShowThankyou(true);
            return res.json();
          })
          .then((data) => {
            console.log('Payment Done:', data);
            alert('Payment done successfully!');
          })
          .catch((err) => alert(err.message));
    }

    return (
        <>
        <div className='orders-page'>
            <h1 className='order-title'>Place an order</h1>
            <div className='customer-content'>
                <form onSubmit={checkCustomer}>
                    <input
                        type="text"
                        name="customerMob"
                        placeholder="Mobile No."
                        value={customerMob}
                        onChange={checkContact}
                        minLength={10}
                        maxLength={10}
                        required
                    />
                    {errorMobile && <p style={{ color: "red" }}>{errorMobile}</p>}
                    <button type="submit" style={{backgroundColor: "#007bff"}}>Check Customer</button>
                </form>
            </div>
            {showItems && (
                <div className='order-content'>
                    <h1>Select Items</h1>
                    <select className="select" onChange={(e) => setItem(e.target.value)} defaultValue="" disabled={isSelectDisabled} style={{width: "21.5vw",
                        padding: "12px",
                        margin: "10px 0",
                        border: "none",
                        borderRadius: "5px",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        fontSize: "16px",
                        outline: "none"}}>
                        <option value="" disabled hidden>Select an item</option>
                        {items.map((item, idx) => (
                        <option key={idx} value={item.I_id}>
                            {item.I_name}
                        </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="qty"
                        placeholder="Quantity"
                        value={qty}
                        onChange={(e)=>setQty(e.target.value)}
                        required
                    />
                    <button type="submit" style={{backgroundColor: "#007bff" , cursor: isSelectDisabled ? 'not-allowed' : 'pointer',}} onClick={handleSelect} disabled={isSelectDisabled}>Select Item</button>
                    <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {selectedTags.map((tag, idx) => (
                        <div
                            key={idx}
                            style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            }}
                        >
                            {tag.itemName}{"->"}{tag.quantity}
                            <span
                            onClick={() => {if (!isSelectDisabled) removeTag(tag);}}
                            style={{
                                marginLeft: '10px',
                                cursor: isSelectDisabled ? 'not-allowed' : 'default',
                                fontWeight: 'bold',
                                pointerEvents: isSelectDisabled ? 'none' : 'auto',
                                opacity: isSelectDisabled ? 0.5 : 1
                            }}
                            >
                            x
                            </span>
                        </div>
                        ))}
                    </div>
                    <button type="submit" style={{backgroundColor: "#007bff" , cursor: selectedTags.length === 0 || isSelectDisabled ? 'not-allowed' : 'pointer',}} onClick={placeOrder} disabled={selectedTags.length === 0 || isSelectDisabled}>Place Order</button>
                    {/* <button type="submit" style={{backgroundColor: "#007bff" , cursor: !isSelectDisabled ? 'not-allowed' : 'pointer',}} onClick={changeOrder} disabled={!isSelectDisabled}>Change Order</button> */}
                </div>
            )}
            {showPayment && (
                <div className='payment-content'>
                    <h1>Payment</h1>
                    <p className="payment-amount">Total Amount: {amount}</p>
                    <select className="select" value={payMode} onChange={(e)=>setPayMode(e.target.value)} style={{width: "375px",
                    padding: "12px",
                    margin: "10px 0",
                    border: "none",
                    borderRadius: "5px",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    fontSize: "16px",
                    outline: "none"}} required>
                      {/* <option value="">-- Select --</option> Placeholder */}
                      <option value="" disabled hidden>Select payment  mode</option> {/* Acts as a placeholder */}
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                    <button type="submit" style={{backgroundColor: "#007bff"}} onClick={handlePayment}>Pay</button>
                </div>
            )}
            {showThankyou && (
                <div className='thankyou-content'>
                    <h1>Thank you for your purchase!</h1>
                    <p>Payment successful</p>
                </div>
            )}
        </div>
        </>
    );
}

export default Orders;