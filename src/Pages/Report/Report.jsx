import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
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

  useEffect(() => {
    getReports().then((data) => {
      setReport(data);
    });
    setReload(false);
  }, [reload]);


  return (
    <>
    <div className="report-list">
        <h2>Rapor Listesi</h2>
        {report.map((report) => (
          <div key={report.id}>
            <h3>
              {report.id} {report.title}
              {/* <span onClick={() => handleDelete(report.id)}>
                <DeleteIcon />
              </span>
              <span onClick={() => handleUpdateBtn(report)}>
                <UpdateIcon />
              </span> */}
            </h3>
            {report.diagnosis}
          </div>
        ))}
      </div>
    </>
  )
}

export default Report