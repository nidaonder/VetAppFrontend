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
} from "../../API/appointment";
import "./Appointment.css";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      // report: appointment.report,
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
          setErrorMessage("Güncelleme işlemi başarısız oldu!"); // Hata mesajını ayarla
          setIsErrorModalOpen(true); // Modalı aç
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

  return (
    <>
      <div className="appointment-newappointment">
        <h2>Yeni Randevu</h2>
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
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="appointment-updateappointment">
        <h2>Randevu Güncelle</h2>
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
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div className="appointment-list">
        <h2>Randevu Listesi</h2>
        {appointment.map((appointment) => (
          <div key={appointment.id}>
            <h3>
              {appointment.appointmentDate} {appointment.doctor.name}
              <span onClick={() => handleDelete(appointment.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(appointment)}>
                <UpdateIcon />
              </span>
            </h3>
            {appointment.id} {appointment.animal.name}
          </div>
        ))}
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
