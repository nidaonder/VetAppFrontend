import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
} from "../../API/doctor";
import "./Doctor.css";

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);

  // new doctor
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

  // delete doctor
  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  // update doctor
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
    const{ id, ...doctor } = updateDoctor;
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
              {doctor.name}
              <span onClick={() => handleDelete(doctor.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(doctor)}>
                <UpdateIcon />
              </span>
            </h3>
            {doctor.phone}
          </div>
        ))}
      </div>
    </>
  );
}

export default Doctor;
