import Modal from "react-modal";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { getAnimals } from "../../API/animal";
import { getDoctors } from "../../API/doctor";
import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAnimalAppointmentDateInRange,
  getDoctorAppointmentDateInRange,
} from "../../API/appointment";
import "./Appointment.css";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  Modal.setAppElement("#root");

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    animal: "",
    doctor: "",
    report: "",
  });

  const handleNewAppointment = (event) => {
    if (event.target.name === "animal" || event.target.name === "doctor") {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: { id: event.target.value },
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    const appointmentToCreate = {
      ...newAppointment,
      report: null,
    };

    createAppointment(appointmentToCreate)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          animal: "",
          doctor: "",
          report: "",
        });
      })
      .catch((error) => {
        console.error("Creation failed:", error);
        setErrorMessage(
          "Doktor bugün çalışmıyor! / Bu saatteki randevusu dolu!"
        );
        setIsErrorModalOpen(true);
      });
  };

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    animal: "",
    doctor: "",
    report: "",
  });

  const handleUpdateBtn = (appointment) => {
    setUpdateAppointment({
      id: appointment.id,
      appointmentDate: appointment.appointmentDate,
      animal: appointment.animal.id,
      doctor: appointment.doctor.id,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateAppointment({
      ...updateAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    if (updateAppointment.id) {
      const { id, animal, doctor, ...appointmentDetails } = updateAppointment;
      const updatedAppointment = {
        ...appointmentDetails,
        animal: { id: animal },
        doctor: { id: doctor },
      };
      updateAppointmentFunc(id, updatedAppointment)
        .then(() => {
          setReload(true);
          setUpdateAppointment({
            appointmentDate: "",
            animal: "",
            doctor: "",
            report: "",
          });
        })
        .catch((error) => {
          console.error("Update failed:", error);
          setErrorMessage("Güncelleme işlemi başarısız oldu!");
          setIsErrorModalOpen(true);
        });
    } else {
      console.error("Appointment ID is undefined.");
    }
  };

  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointment(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
    });
    setReload(false);
  }, [reload]);

  const handleSearchByDoctorAndDateRange = async () => {
    if (selectedDoctorId && startDate && endDate) {
      try {
        const appointments = await getDoctorAppointmentDateInRange(
          selectedDoctorId,
          startDate,
          endDate
        );
        setAppointment(appointments);
      } catch (error) {
        console.error("Arama sırasında bir hata oluştu", error);
      }
    }
  };

  const handleSearchByAnimalAndDateRange = async () => {
    if (selectedAnimalId && startDate && endDate) {
      try {
        const appointments = await getAnimalAppointmentDateInRange(
          selectedAnimalId,
          startDate,
          endDate
        );
        setAppointment(appointments);
      } catch (error) {
        console.error("Arama sırasında bir hata oluştu", error);
      }
    }
  };

  const handleResetAppointments = async () => {
    try {
      const fetchedAppointments = await getAppointments();
      setAppointment(fetchedAppointments);
      setSelectedDoctorId("");
      setSelectedAnimalId("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error(
        "Randevuları yeniden yükleme sırasında bir hata oluştu",
        error
      );
    }
  };

  return (
    // Değerlendirme 16-17
    <>
      <div className="appointment">
        <div className="appointment-search">
          <div className="doctor-daterange">
            <h2>Doktora Göre Arama Yap :</h2>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              <option value="">Doktor Seçiniz</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
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
            <button onClick={handleSearchByDoctorAndDateRange}>Ara</button>
          </div>
          <div className="animal-daterange">
            <h2>Pet'e Göre Arama Yap :</h2>
            <select
              value={selectedAnimalId}
              onChange={(e) => setSelectedAnimalId(e.target.value)}
            >
              <option value="">Pet Seçiniz</option>
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
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
            <button onClick={handleSearchByAnimalAndDateRange}>Ara</button>
            <button onClick={handleResetAppointments}>Arama Verilerini Sıfırla</button>
          </div>
        </div>
        <div className="appointment-newappointment">
          <h2>Yeni Randevu Ekle :</h2>
          <input
            type="datetime-local"
            placeholder="Tarih"
            name="appointmentDate"
            value={newAppointment.appointmentDate}
            onChange={handleNewAppointment}
          />
          <select
            name="animal"
            value={newAppointment?.animal?.id || ""}
            onChange={handleNewAppointment}
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
            name="doctor"
            value={newAppointment?.doctor?.id || ""}
            onChange={handleNewAppointment}
          >
            <option value="" disabled>
              Doktor Seçiniz
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>
        <div className="appointment-updateappointment">
          <h2>Randevu Güncelle :</h2>
          <input
            type="datetime-local"
            placeholder="Tarih"
            name="appointmentDate"
            value={updateAppointment.appointmentDate}
            onChange={handleUpdateChange}
          />
          <select
            name="animal"
            value={updateAppointment.animal || ""}
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
            name="doctor"
            value={updateAppointment.doctor || ""}
            onChange={handleUpdateChange}
          >
            <option value="" disabled>
              Doktor Seçiniz
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <button onClick={handleUpdate}>Güncelle</button>
        </div>

        <div className="appointment-list">
          <h2>Randevu Listesi</h2>
          <table>
            <thead>
              <tr>
                <th>Randevu Tarihi</th>
                <th>Hayvan</th>
                <th>Doktor</th>
                <th>Sil</th>
                <th>Güncelle</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.animal.name}</td>
                  <td>{appointment.doctor.name}</td>
                  <td onClick={() => handleDelete(appointment.id)}>
                    <DeleteIcon />
                  </td>
                  <td onClick={() => handleUpdateBtn(appointment)}>
                    <UpdateIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setIsErrorModalOpen(false)}
        contentLabel="Error Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "200px",
            overflow: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2>Hata</h2>
        <div>{errorMessage}</div>
        <button onClick={() => setIsErrorModalOpen(false)}>Kapat</button>
      </Modal>
    </>
  );
}

export default Appointment;