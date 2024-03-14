import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
} from "../../API/animal";
import "./Animal.css";

export default function Animal() {
  const [animal, setAnimal] = useState([]);
  const [reload, setReload] = useState(true);

  // new animal
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
  });

  const handleNewAnimal = (event) => {
    setNewAnimal({
      ...newAnimal,
      [event.target.name]: event.target.value,
    });
    console.log(newAnimal);
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
      customer: "",
    });
  };

  // update animal
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
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: animal.customer,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateAnimal({
      ...updateAnimal,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    const { id, ...animal } = updateAnimal;
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

  // delete animal
  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimal(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
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
        <input
          type="text"
          placeholder="Adres"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />
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
        <input
          type="text"
          placeholder="Aile Üyesi"
          name="customer"
          value={newAnimal.customer}
          onChange={handleNewAnimal}
        />
        <button onClick={handleCreate}>Create</button>
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
        <input
          type="text"
          placeholder="Cinsiyet"
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateChange}
        />
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
        <input
          type="text"
          placeholder="Aile Üyesi"
          name="customer"
          value={updateAnimal.customer}
          onChange={handleUpdateChange}
        />

        <button onClick={handleUpdate}>Update</button>
      </div>
      <div className="animal-list">
        <h2>Pet Listesi</h2>
        {animal.map((animal) => (
          <div key={animal.id}>
            <h3>
              {animal.name} {animal.id}
              <span onClick={() => handleDelete(animal.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(animal)}>
                <UpdateIcon />
              </span>
            </h3>
            {animal.species}
          </div>
        ))}
      </div>
    </>
  );
}
