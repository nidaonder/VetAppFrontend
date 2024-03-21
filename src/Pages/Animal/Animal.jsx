import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
} from "../../API/animal";
import { getCustomers } from "../../API/customer";
import "./Animal.css";

export default function Animal() {
  const [animal, setAnimal] = useState([]);
  const [reload, setReload] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    // customer: "",
  });
  const [searchQueryAnimal, setSearchQueryAnimal] = useState("");
  const [searchQueryCustomer, setSearchQueryCustomer] = useState("");

  const filteredAnimals = animal.filter(
    (anim) =>
      anim.name.toLowerCase().includes(searchQueryAnimal.toLowerCase()) &&
      (anim.customer
        ? anim.customer.name
            .toLowerCase()
            .includes(searchQueryCustomer.toLowerCase())
        : !searchQueryCustomer)
  );

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      return setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAnimal(newAnimal).then(() => {
      setReload(true);
    });
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
      // customer: "",
    });
  };

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
  });

  const handleUpdateBtn = (animal) => {
    setUpdateAnimal({
      id: animal.id,
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: animal.customer ? animal.customer.id : "",
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateAnimal({
      ...updateAnimal,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    const updatedAnimal = {
      ...updateAnimal,
      customer: updateAnimal.customer ? { id: updateAnimal.customer } : null,
    };
    const { id, ...animal } = updatedAnimal;
    updateAnimalFunc(id, animal).then(() => {
      setReload(true);
    });
    setUpdateAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
      customer: "",
    });
  };

  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimal(data);
    });
    getCustomers().then((data) => {
      setCustomers(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <div className="animal">
      <div className="search-inputs">
        <div className="input-petname">
          <h2>Pet ismine göre filtrele</h2>
          <input
            type="text"
            placeholder="Pet adıyla ara"
            value={searchQueryAnimal}
            onChange={(e) => setSearchQueryAnimal(e.target.value)}
          />
        </div>
        <div className="input-customername">
          <h2>Müşteri ismine göre filtrele</h2>
          <input
            type="text"
            placeholder="Müşteri adıyla ara"
            value={searchQueryCustomer}
            onChange={(e) => setSearchQueryCustomer(e.target.value)}
          />
        </div>
      </div>
      <div className="animal-newanimal">
        <h2>Yeni Pet</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Tür"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Cins"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />

        <select
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        >
          <option value="" disabled>
            Cinsiyet Seçiniz
          </option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>

        <input
          type="text"
          placeholder="Renk"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="Doğum Tarihi"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />
        <select
          name="customer"
          value={newAnimal?.customer?.id || ""}
          onChange={handleNewAnimal}
        >
          <option value="" disabled>
            Müşteri Seçiniz
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Ekle</button>
      </div>
      <div className="animal-updateanimal">
        <h2>Pet Güncelle</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={updateAnimal.name}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Türü"
          name="species"
          value={updateAnimal.species}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Cins"
          name="breed"
          value={updateAnimal.breed}
          onChange={handleUpdateChange}
        />
        <select
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateChange}
        >
          <option value="" disabled>
            Cinsiyet Seçiniz
          </option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <input
          type="text"
          placeholder="Renk"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateChange}
        />
        <input
          type="date"
          placeholder="Doğum Tarihi"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateChange}
        />

        <select
          name="customer"
          value={updateAnimal.customer || ""}
          onChange={handleUpdateChange}
        >
          <option value="" disabled>
            Müşteri Seçiniz
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button onClick={handleUpdate}>Güncelle</button>
      </div>
      <div className="animal-list">
        <h2>Pet Listesi</h2>
        {filteredAnimals.map((animal) => (
          <div key={animal.id}>
            <h3>
              {animal.name} -{" "}
              {animal.customer ? animal.customer.name : "Sahipsiz"}
              <span onClick={() => handleDelete(animal.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(animal)}>
                <UpdateIcon />
              </span>
            </h3>
            {animal.species} - {animal.breed}
          </div>
        ))}
      </div>
    </div>
  );
}