import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
} from "../../API/customer";
import "./Customer.css";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customer.filter((cus) =>
    cus.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomer(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdate = () => {
    const { id, ...customer } = updateCustomer;
    updateCustomerFunc(id, customer).then(() => {
      setReload(true);
    });
    setUpdateCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createCustomer(newCustomer).then(() => {
      setReload(true);
    });
    setNewCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUpdateBtn = (cus) => {
    setUpdateCustomer({
      name: cus.name,
      phone: cus.phone,
      mail: cus.mail,
      address: cus.address,
      city: cus.city,
      id: cus.id,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="customer">
      <div className="customer-search">
        <h2>İsme göre filtrele :</h2>
        <input
          type="text"
          placeholder="Müşteri ara"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="customer-newcustomer">
        <h2>Yeni Müşteri Ekle :</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="E-Mail"
          name="mail"
          value={newCustomer.mail}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Şehir"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />
        <button onClick={handleCreate}>Ekle</button>
      </div>
      <div className="customer-updatecustomer">
        <h2>Müşteri Güncelle :</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="E-Mail"
          name="mail"
          value={updateCustomer.mail}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Adress"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Şehir"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdate}>Güncelle</button>
      </div>



      <div className="customer-list">
  <h2>Müşteri Listesi</h2>
  <table>
    <thead>
      <tr>
        <th>İsim</th>
        <th>Telefon</th>
        <th>E-posta</th>
        <th>Adres</th>
        <th>Şehir</th>
        <th>Sil</th>
        <th>Güncelle</th>
      </tr>
    </thead>
    <tbody>
      {filteredCustomers.map((customer) => (
        <tr key={customer.id}>
          <td>{customer.name}</td>
          <td>{customer.phone}</td>
          <td>{customer.mail}</td>
          <td>{customer.address}</td>
          <td>{customer.city}</td>
          <td onClick={() => handleDelete(customer.id)}><DeleteIcon /></td>
          <td onClick={() => handleUpdateBtn(customer)}><UpdateIcon /></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>






      {/* <div className="customer-list">
        <h2>Müşteri Listesi</h2>
        {filteredCustomers.map((customer) => (
          <div className="customers" key={customer.id}>
            <p>{customer.name}</p>
            <p>{customer.phone}</p>
            <p>{customer.mail}</p>
            <p>{customer.address}</p>
            <p>{customer.city}</p>
            <p onClick={() => handleDelete(customer.id)}>
            <DeleteIcon />
            </p>
            <p onClick={() => handleUpdateBtn(customer)}>
            <UpdateIcon />
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Customer;