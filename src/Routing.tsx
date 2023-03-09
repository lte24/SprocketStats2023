import React from "react";
import { Route, Routes } from "react-router-dom";
//Pages

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DataEntry from "./pages/DataEntry";
import HowToScout from "./pages/HowToScout";
import Datatable from "./pages/Datatable";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TeamData from "./pages/TeamData";

class Routing extends React.Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/viewdata/:templateId/:datasetId"
            element={<Datatable />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/dataentry/:templateId/:datasetId"
            element={<DataEntry />}
          />
          <Route path="/teamdata" element={<TeamData />} />
          <Route path="/howtoscout" element={<HowToScout />} />
        </Routes>
      </div>
    );
  }
}

export default Routing;

//Test comm
