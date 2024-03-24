import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
  getVaccinesInDateRange,
  getVaccinesByAnimal,
} from "../../API/vaccine";
import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";
import "./Vaccine.css";

function ErrorModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
}

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
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
  const [animalNameQuery, setAnimalNameQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredVaccines = vaccine.filter(
    (vac) =>
      vac.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      vac.animal.name.toLowerCase().includes(animalNameQuery.toLowerCase())
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

  const handleSearchByAnimalId = async () => {
    if (selectedAnimalId) {
      try {
        const fetchedVaccines = await getVaccinesByAnimal(selectedAnimalId);
        setVaccine(fetchedVaccines);
      } catch (error) {
        setVaccine([]);
      }
    } else {
      const fetchedVaccines = await getVaccines();
      setVaccine(fetchedVaccines);
    }
  };

  const handleNewVaccine = (event) => {
    const { name, value } = event.target;
    if (name === "animal") {
      const selectedAnimal = animals.find(
        (animal) => animal.id.toString() === value
      );
      setNewVaccine((prevState) => ({
        ...prevState,
        animal: selectedAnimal,
      }));
    } else if (name === "report") {
      const selectedReport = reports.find(
        (report) => report.id.toString() === value
      );
      setNewVaccine((prevState) => ({
        ...prevState,
        report: selectedReport,
      }));
    } else {
      setNewVaccine((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreate = () => {
    createVaccine(newVaccine)
      .then(() => {
        setReload(true);
        setNewVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: vaccine.animal,
          report: vaccine.report,
        });
      })
      .catch((error) => {
        setIsErrorModalOpen(true);
        setErrorMessage(
          `Aşı eklenirken bir hata oluştu. Lütfen tekrar deneyiniz.
          Koruyuculuk başlangıç tarihi bugün ya da geçmiş tarihli olmalı.
          Aşı kodu XXX-00 formatında olmalı.`
        );
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

  const handleSearchByDateRange = () => {
    if (startDate && endDate) {
      getVaccinesInDateRange(startDate, endDate).then((data) => {
        setVaccine(data);
      });
    } else {
      alert("Lütfen başlangıç ve bitiş tarihlerini giriniz.");
    }
  };

  const handleUpdateChange = (event) => {
    setUpdateVaccine({
      ...updateVaccine,
      [event.target.name]: event.target.value,
    });
  };

  return (
    // Değerlendirme 14-15
    <>
      <div className="vaccine">
        <div className="animalname-search">
          <h2>Pet Seçiniz :</h2>

          <select
            value={selectedAnimalId}
            onChange={(e) => setSelectedAnimalId(e.target.value)}
          >
            <option value="">Tümünü Göster</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
          <button onClick={handleSearchByAnimalId}>Ara</button>

          {/* <input
            type="text"
            placeholder="Pet adı"
            value={animalNameQuery}
            onChange={(e) => setAnimalNameQuery(e.target.value)}
          /> */}
        </div>
        <div className="date-search">
          <h2>Tarih Aralığına Göre Filtrele :</h2>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSearchByDateRange}>
            Tarih Aralığına Göre Ara
          </button>
        </div>
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
            placeholder="Kod (XXX-00)"
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
            placeholder="Kod (XXX-00)"
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
                <th>Pet Adı</th>
                <th>Koruyuculuk Başlangıç</th>
                <th>Koruyuculuk Bitiş</th>
                <th>Sil</th>
                <th>Güncelle</th>
              </tr>
            </thead>
            <tbody>
              {filteredVaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.code}</td>
                  <td>{vaccine.animal ? vaccine.animal.name : "Bilinmiyor"}</td>
                  <td>{vaccine.protectionStartDate}</td>
                  <td>{vaccine.protectionFinishDate}</td>
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
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
    </>
  );
}

export default Vaccine;