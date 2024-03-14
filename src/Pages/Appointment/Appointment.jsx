import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
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

  // new appointment
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    animal: "",
    doctor: "",
    report: "",
  });

  const handleNewAppointment = (event) => {
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createAppointment(newAppointment).then(() => {
      setReload(true);
    });
    setNewAppointment({
      appointmentDate: "",
      animal: "",
      doctor: "",
      report: "",
    });
  };

  // update appointment
  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    animal: "",
    doctor: "",
    report: "",
  });

  const handleUpdateBtn = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      animal: appointment.animal,
      doctor: appointment.doctor,
      report: appointment.report,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateAppointment({
      ...updateAppointment,
      [event.target.name]: event.target.value, // burda
    });
  };

  const handleUpdate = () => {
    const { id, ...appointment } = updateAppointment;
    updateAppointmentFunc(id, appointment).then(() => {
      setReload(true);
    });
    setUpdateAppointment({
      appointmentDate: "",
      animal: "",
      doctor: "",
      report: "",
    });
  };

  // delete appointment
  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointment(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
     <div className="appointment-newappointment">
        <h2>Yeni Randevu</h2>
        <input
          type="date"
          placeholder="Tarih"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />
        <input
          type="text"
          placeholder="Tür"
          name="species"
          value={newAppointment.animal}
          onChange={handleNewAppointment}
        />
        <input
          type="text"
          placeholder="Cins"
          name="breed"
          value={newAppointment.doctor}
          onChange={handleNewAppointment}
        />
        <input
          type="text"
          placeholder="Adres"
          name="gender"
          value={newAppointment.report}
          onChange={handleNewAppointment}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="appointment-updateappointment">
        <h2>Randevu Güncelle</h2>
        <input
          type="date"
          placeholder="Tarih"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Pet"
          name="animal"
          value={updateAppointment.animal}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Doktor"
          name="doctor"
          value={updateAppointment.doctor}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="Rapor"
          name="report"
          value={updateAppointment.report}
          onChange={handleUpdateChange}
        />

        <button onClick={handleUpdate}>Update</button>
      </div>
    <div className="appointment-list">
        <h2>Randevu Listesi</h2>
        {appointment.map((appointment) => (
          <div key={appointment.id}>
            <h3>
              {appointment.appointmentDate} {appointment.id}
              <span onClick={() => handleDelete(appointment.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(appointment)}>
                <UpdateIcon />
              </span>
            </h3>
            {appointment.appointmentDate}
          </div>
        ))}
      </div>
    </>
  );
}

export default Appointment;
