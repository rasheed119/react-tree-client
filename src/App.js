import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FolderTreeView from "./Components/FolderTreeView";
const HTF = lazy(() => import("./Tree/HTF"));
const Tree = lazy(() => import("./Tree/Tree"));
const AddMember = lazy(() => import("./Components/AddMember"));
const AddEmployee = lazy(() => import("./Components/AddEmployee"));
const AddAdmin = lazy(() => import("./Components/AddAdmin"));

const App = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Router>
        <Routes>
          <Route path="/" element={<Tree />} />
          <Route path="/htf" element={<HTF />} />
          <Route path="/add_member" element={<AddMember />} />
          <Route path="/add_employee" element={<AddEmployee />} />
          <Route path="/add_admin" element={<AddAdmin />} />
          <Route path="/folder_tree_view" element={<FolderTreeView />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </Suspense>
  );
};

export default App;
