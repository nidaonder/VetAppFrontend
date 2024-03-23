import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
  getCustomersByName,
} from "../../API/customer";
import "./Customer.css";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(false);
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

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomer(data);
    });
  }, [reload]);

  const handleSearch = () => {
    if (searchQuery) {
      getCustomersByName(searchQuery).then((data) => {
        setCustomer(data);
      });
    } else {
      getCustomers().then((data) => {
        setCustomer(data);
      });
    }
  };

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
    // Değerlendirme 8-9
    <div className="customer">
      <div className="customer-search">
        <h2>İsme göre filtrele :</h2>
        <input
          type="text"
          placeholder="Tam Adını Yazınız"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Ara</button>
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
          placeholder="Telefon (555-555-5555)"
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
          placeholder="Telefon (555-555-5555)"
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
            {customer.map((cus) => (
              <tr key={cus.id}>
                <td>{cus.name}</td>
                <td>{cus.phone}</td>
                <td>{cus.mail}</td>
                <td>{cus.address}</td>
                <td>{cus.city}</td>
                <td onClick={() => handleDelete(cus.id)}>
                  <DeleteIcon />
                </td>
                <td onClick={() => handleUpdateBtn(cus)}>
                  <UpdateIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;