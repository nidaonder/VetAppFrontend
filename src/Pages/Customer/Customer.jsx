import { useState, useEffect } from "react";
import "./Customer.css";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomer(data);
      });
      setReload(false);
  }, [reload]);

  const handleDelete = (event) => {
    const id = event.target.id;
    fetch(`http://localhost:8080/api/v1/customers/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setReload(true);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <>
      <h1>Customer</h1>
      <div className="customer-list">
        {customer.map((customer) => (
          <div 
          id={customer.id}
          onClick={(e) => handleDelete(e)} 
          key={customer.id}>{customer.name}
          </div>
        ))}
        </div>
    </>
  );
}

export default Customer;
