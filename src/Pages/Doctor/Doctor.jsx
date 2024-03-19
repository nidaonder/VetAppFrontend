import Modal from "react-modal";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
} from "../../API/doctor";
import "./Doctor.css";

function AvailableDatesModal({ isOpen, onClose, availableDates, doctorName }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`${doctorName} - Müsait Günler`}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          overflow: "auto",
        },
      }}
    >
      <h2>{doctorName} - Müsait Günler</h2>
      <div>
        <input type="date" placeholder="Tarih" name="availableDate" />
        <button>Ekle</button>
      </div>
      <div>
        <input type="date" />
        <button>Güncelle</button>
      </div>
      <ul>
        {availableDates.map((date, index) => (
          <li key={index}>
            {date.availableDate}
            <span>
              <UpdateIcon />
            </span>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Kapat</button>
    </Modal>
  );
}

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctorAvailableDates, setCurrentDoctorAvailableDates] =
    useState([]);
  const [currentDoctorName, setCurrentDoctorName] = useState("");

  const handleShowAvailableDates = async (selectedDoctor) => {
    try {
      const allAvailableDates = await getAvailableDates();
      const filteredDates = allAvailableDates.filter(
        (date) => date.doctor.id === selectedDoctor.id
      );

      setCurrentDoctorAvailableDates(filteredDates);
      setCurrentDoctorName(selectedDoctor.name);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Müsait günler getirilirken bir hata oluştu:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createDoctor(newDoctor).then(() => {
      setReload(true);
    });
    setNewDoctor({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const handleUpdateChange = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateBtn = (doc) => {
    setUpdateDoctor({
      name: doc.name,
      phone: doc.phone,
      mail: doc.mail,
      address: doc.address,
      city: doc.city,
      id: doc.id,
    });
  };

  const handleUpdate = () => {
    const { id, ...doctor } = updateDoctor;
    updateDoctorFunc(id, doctor).then(() => {
      setReload(true);
    });
    setUpdateDoctor({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctor(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
      <div className="doctor-newdoctor">
        <h2>Yeni Doktor</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={newDoctor.name}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={newDoctor.phone}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="E-Mail"
          name="mail"
          value={newDoctor.mail}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={newDoctor.address}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="Şehir"
          name="city"
          value={newDoctor.city}
          onChange={handleNewDoctor}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="doctor-updatedoctor">
        <h2>Doktor Güncelle</h2>
        <input
          type="text"
          placeholder="Adı"
          name="name"
          value={updateDoctor.name}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={updateDoctor.phone}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="E-Mail"
          name="mail"
          value={updateDoctor.mail}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Adress"
          name="address"
          value={updateDoctor.address}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Şehir"
          name="city"
          value={updateDoctor.city}
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div className="doctor-list">
        <h2>Doktor Listesi</h2>
        {doctor.map((doctor) => (
          <div key={doctor.id}>
            <h3>
              {doctor.id} {doctor.name}
              <span onClick={() => handleDelete(doctor.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(doctor)}>
                <UpdateIcon />
              </span>
              <span onClick={() => handleShowAvailableDates(doctor)}>
                <EventAvailableIcon />
              </span>
            </h3>
            {doctor.phone}
          </div>
        ))}
      </div>
      <AvailableDatesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        availableDates={currentDoctorAvailableDates}
        doctorName={currentDoctorName}
      />
    </>
  );
}

export default Doctor;
