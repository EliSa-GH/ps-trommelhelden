import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "../Navbar/Navbar";
import Home from "../pages/Home";
import Auftraege from "../pages/Auftraege/Auftraege";
import Anlegen from "../pages/Auftraege/Submenu/Anlegen";
import Neue from "../pages/Auftraege/Submenu/Neue";
import Offen from "../pages/Auftraege/Submenu/Offen";
import Archiv from "../pages/Auftraege/Submenu/Archiv";
import Kunden from "../pages/Kunden";
import Mitarbeiter from "../pages/Mitarbeiter";
import Bericht from "../pages/Bericht";
import Ersatzteil from "../pages/Ersatzteil";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auftraege" element={<Auftraege />}></Route>
          <Route path="/anlegen" element={<Anlegen />}></Route>
          <Route path="/neue" element={<Neue />}></Route>
          <Route path="/offen" element={<Offen />}></Route>
          <Route path="/archiv" element={<Archiv />}></Route>
          <Route path="/kunden" element={<Kunden />}></Route>
          <Route path="/mitarbeiter" element={<Mitarbeiter />}></Route>
          <Route path="/ersatzteil" element={<Ersatzteil />}></Route>
          <Route path="/bericht" element={<Bericht />}></Route>
          <Route path="/" exact element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
