import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
} from "../../API/vaccine";
import { getAnimals } from "../../API/animal";
import "./Vaccine.css";

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: vaccine.animal,
    report: vaccine.report,
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: vaccine.animal,
    report: vaccine.report,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredVaccines = vaccine.filter((vac) =>
    vac.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getVaccines().then((data) => {
      setVaccine(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteVaccine(id).then(() => {
      setReload(true);
    });
  };

  const handleNewVaccine = (event) => {
    setNewVaccine({
      ...newVaccine,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createVaccine(newVaccine).then(() => {
      setReload(true);
    });
    setNewVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animal: vaccine.animal,
      report: vaccine.report,
    });
  };

  const handleUpdate = () => {
    const { id, ...vaccine } = updateVaccine;
    updateVaccineFunc(id, vaccine).then(() => {
      setReload(true);
    });
    setUpdateVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animal: vaccine.animal,
      report: vaccine.report,
    });
  };

  const handleUpdateBtn = (vac) => {
    setUpdateVaccine({
      name: vaccine.name,
      code: vaccine.code,
      protectionStartDate: vaccine.protectionStartDate,
      protectionFinishDate: vaccine.protectionFinishDate,
      animal: vaccine.animal,
      report: vaccine.report,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateVaccine({
      ...updateVaccine,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="vaccine-newvaccine">
        <h2>Yeni Aşı</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={newVaccine.name}
          onChange={handleNewVaccine}
        />
        <input
          type="text"
          placeholder="Kod"
          name="code"
          value={newVaccine.code}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Koruyuculuk başlangıç"
          name="protectionStartDate"
          value={newVaccine.protectionStartDate}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Koruyuculuk bitiş"
          name="protectionFinishDate"
          value={newVaccine.protectionFinishDate}
          onChange={handleNewVaccine}
        />

        <select
          name="animal"
          value={newVaccine?.animal?.id || ""}
          onChange={handleNewVaccine}
        >
          <option value="" disabled>
            Pet Seçiniz
          </option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Ekle</button>
      </div>

      <div className="vaccine-updatevaccine">
        <h2>Aşı Güncelle</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={updateVaccine.name}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Kod"
          name="code"
          value={updateVaccine.code}
          onChange={handleUpdateChange}
        />
        <input
          type="date"
          placeholder="Koruyuculuk Başlangıç"
          name="protectionStartDate"
          value={updateVaccine.protectionStartDate}
          onChange={handleUpdateChange}
        />
        <input
          type="date"
          placeholder="Koruyuculuk Bitiş"
          name="protectionFinishDate"
          value={updateVaccine.protectionFinishDate}
          onChange={handleUpdateChange}
        />

        <select
          name="animal"
          value={newVaccine?.animal?.id || ""}
          onChange={handleUpdateChange}
        >
          <option value="" disabled>
            Pet Seçiniz
          </option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>

        <button onClick={handleUpdate}>Güncelle</button>
      </div>

      <div className="vaccine-list">
        <h2>Aşı Listesi</h2>
        {filteredVaccines.map((vaccine) => (
          <div key={vaccine.id}>
            <h3>
              {vaccine.name}
              <span onClick={() => handleDelete(vaccine.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(vaccine)}>
                <UpdateIcon />
              </span>
            </h3>
            {vaccine.code}
          </div>
        ))}
      </div>
    </>
  );
}

export default Vaccine;
