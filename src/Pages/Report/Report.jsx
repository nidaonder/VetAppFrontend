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
    if(name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: { id: value },
      });
    } else {
      setNewReport({
        ...newReport,
        [name]: value,
      });
    };
  }

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

  useEffect(() => {
    getReports().then((data) => {
      setReport(data);
    });
    getAppointments().then((data) => {
      setAppointments(data);
    })
    setReload(false);
  }, [reload]);

  return (
    <>
    <div className="report-newreport">
        <h2>Yeni Rapor</h2>
        <input
          type="text"
          placeholder="Başlık"
          name="title"
          value={newReport.title}
          onChange={handleNewReport}
        />
        <input
          type="text"
          placeholder="Açıklama"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReport}
        />
        <input
          type="number"
          placeholder="Tutar"
          name="price"
          value={newReport.price}
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
      <div className="report-list">
        <h2>Rapor Listesi</h2>
        {report.map((report) => (
          <div key={report.id}>
            <h3>
              {report.id} {report.title}
              <span onClick={() => handleDelete(report.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(report)}>
                <UpdateIcon />
              </span>
            </h3>
            {report.diagnosis}
          </div>
        ))}
      </div>
    </>
  );
}

export default Report;