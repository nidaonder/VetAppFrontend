import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import Customer from "./Pages/Customer/Customer";
import Animal from "./Pages/Animal/Animal";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/customer" element={<Customer />} />
        <Route path="/animal" element={<Animal />} />
      </Routes>
    </>
  );
}

export default App;
