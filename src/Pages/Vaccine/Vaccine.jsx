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
import { getReports } from "../../API/report";
import "./Vaccine.css";

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
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
    getReports().then((data) => {
      setReports(data);
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
      name: vac.name,
      code: vac.code,
      protectionStartDate: vac.protectionStartDate,
      protectionFinishDate: vac.protectionFinishDate,
      animal: vac.animal,
      report: vac.report,
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
      <div className="vaccine">
        <div className="vaccine-newvaccine">
          <h2>Yeni Aşı :</h2>
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

          <select
            name="report"
            value={newVaccine?.report?.id || ""}
            onChange={handleNewVaccine}
          >
            <option value="" disabled>
              Rapor Seçiniz
            </option>
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.id} {report.title}
              </option>
            ))}
          </select>

          <button onClick={handleCreate}>Ekle</button>
        </div>
        <div className="vaccine-updatevaccine">
          <h2>Aşı Güncelle :</h2>
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
            value={updateVaccine?.animal?.id || ""}
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

          <select
            name="report"
            value={updateVaccine?.report?.id || ""}
            onChange={handleUpdateChange}
          >
            <option value="" disabled>
              Rapor Seçiniz
            </option>
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.id} {report.title}
              </option>
            ))}
          </select>

          <button onClick={handleUpdate}>Güncelle</button>
        </div>
        <div className="vaccine-list">
          <h2>Aşı Listesi</h2>
          <table>
            <thead>
              <tr>
                <th>Aşı Adı</th>
                <th>Kod</th>
                <th>Sil</th>
                <th>Güncelle</th>
              </tr>
            </thead>
            <tbody>
              {filteredVaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.code}</td>
                  <td onClick={() => handleDelete(vaccine.id)}>
                    <DeleteIcon />
                  </td>
                  <td onClick={() => handleUpdateBtn(vaccine)}>
                    <UpdateIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Vaccine;
