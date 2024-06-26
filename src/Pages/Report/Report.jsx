import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import { getAppointments } from "../../API/appointment";
import "./Report.css";

function Report() {
  const [report, setReport] = useState([]);
  const [reload, setReload] = useState(true);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: report.appointment,
  });
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: report.appointment,
  });
  const [appointments, setAppointments] = useState([]);

  const handleUpdate = () => {
    const { id, ...report } = updateReport;
    updateReportFunc(id, report).then(() => {
      setReload(true);
    });
    setUpdateReport({
      title: "",
      diagnosis: "",
      price: "",
      appointment: report.appointment,
    });
  };

  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  const handleNewReport = (event) => {
    const { name, value } = event.target;
    if (name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: { id: value },
      });
    } else {
      setNewReport({
        ...newReport,
        [name]: value,
      });
    }
  };

  const handleCreate = () => {
    createReport(newReport).then(() => {
      setReload(true);
    });
    setNewReport({
      title: "",
      diagnosis: "",
      price: "",
      appointment: report.appointment,
    });
  };

  const handleUpdateBtn = (rep) => {
    setUpdateReport({
      title: rep.title,
      diagnosis: rep.diagnosis,
      price: rep.price,
      appointment: rep.appointment,
      id: rep.id,
    });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    if (name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: { id: value },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [name]: value,
      });
    }
  };

  const preventNegative = (event) => {
    if (event.key === "-") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    getReports().then((data) => {
      setReport(data);
    });
    getAppointments().then((data) => {
      setAppointments(data);
    });
    setReload(false);
  }, [reload]);

  return (
    // Değerlendirme 18
    <>
      <div className="report">
        <div className="report-newreport">
          <h2>Yeni Rapor Ekle :</h2>
          <input
            type="text"
            placeholder="Başlık"
            name="title"
            value={newReport.title}
            onChange={handleNewReport}
          />
          <input
            type="text"
            placeholder="Tanı"
            name="diagnosis"
            value={newReport.diagnosis}
            onChange={handleNewReport}
          />
          <input
            type="number"
            placeholder="Tutar"
            name="price"
            min={0}
            value={newReport.price}
            onKeyDown={preventNegative}
            onChange={handleNewReport}
          />
          <select
            name="appointment"
            value={newReport?.appointment?.id || ""}
            onChange={handleNewReport}
          >
            <option value="" disabled>
              Randevu Seçiniz
            </option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.appointmentDate} {appointment.doctor.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>
        <div className="report-updatereport">
          <h2>Rapor Güncelle :</h2>
          <input
            type="text"
            placeholder="Başlık"
            name="title"
            value={updateReport.title}
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            placeholder="Tanı"
            name="diagnosis"
            value={updateReport.diagnosis}
            onChange={handleUpdateChange}
          />
          <input
            type="number"
            placeholder="Tutar"
            name="price"
            min={0}
            onKeyDown={preventNegative}
            value={updateReport.price}
            onChange={handleUpdateChange}
          />
          <select
            name="appointment"
            value={updateReport?.appointment?.id || ""}
            onChange={handleUpdateChange}
          >
            <option value="" disabled>
              Randevu Seçiniz
            </option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.appointmentDate} {appointment.doctor.name}
              </option>
            ))}
          </select>
          <button onClick={handleUpdate}>Güncelle</button>
        </div>
        <div className="report-list">
          <h2>Rapor Listesi</h2>
          <table>
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Tanı</th>
                <th>Fiyat</th>
                <th>Randevu Tarihi</th>
                <th>Sil</th>
                <th>Güncelle</th>
              </tr>
            </thead>
            <tbody>
              {report.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.price}</td>
                  <td>{report.appointment.appointmentDate}</td>
                  <td onClick={() => handleDelete(report.id)}>
                    <DeleteIcon />
                  </td>
                  <td onClick={() => handleUpdateBtn(report)}>
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

export default Report;