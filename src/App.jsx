import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import Customer from "./Pages/Customer/Customer";
import Animal from "./Pages/Animal/Animal";
import Doctor from "./Pages/Doctor/Doctor";
import Appointment from "./Pages/Appointment/Appointment";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/customer" element={<Customer />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/vaccine" element={<Vaccine />} />
      </Routes>
    </>
  );
}

export default App;
