import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tree from "./Tree/Tree";
import HTF from "./Tree/HTF";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tree />} />
        <Route path="/htf" element={<HTF />} />
      </Routes>
    </Router>
  );
};

export default App;
