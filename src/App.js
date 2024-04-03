import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tree from "./Tree/Tree";
import HTF from "./Tree/HTF";
import AddMember from "./Components/AddMember";
import AddEmployee from "./Components/AddEmployee";
import AddAdmin from "./Components/AddAdmin";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tree />} />
        <Route path="/htf" element={<HTF />} />
        <Route path="/add_member" element={<AddMember/>}/>
        <Route path="/add_employee" element={<AddEmployee/>}/>
        <Route path="/add_admin" element={<AddAdmin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
