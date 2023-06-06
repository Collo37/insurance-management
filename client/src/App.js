import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Scenes/Dashboard/Dashboard";
import Vehicles from "./components/Scenes/Vehicles/Vehicles";
import Owners from "./components/Scenes/Owners/Owners";
import Payments from "./components/Scenes/Payments/Payments";
import ExpiringSoon from "./components/Scenes/ExpiringSoon/ExpiringSoon";
import Manage from "./components/Scenes/Manage/Manage";
import RecordNew from "./components/Scenes/RecordNew/RecordNew";
import Login from "./components/Scenes/Login/Login";

import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-vehicles" element={<Vehicles />} />
            <Route path="/owners" element={<Owners />} />
            <Route path="/all-payments" element={<Payments />} />
            <Route path="/expiring-soon" element={<ExpiringSoon />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/record-new" element={<RecordNew />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
