import React, { useState } from "react";
import OptionContext from "./OptionContext";

function OptionsContextProvider({ children }) {
  const [data, setdata] = useState({
    id: "",
    Name: "",
    role: "",
    role_id: "",
    reports_to: "",
  });
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(false);

  const getTreeData = async () => {
    try {
      const response = await fetch("http://localhost:8080/tree", {
        method: "GET",
      });
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OptionContext.Provider
      value={{ data, setdata, state, setState, getTreeData, open, setOpen }}
    >
      {children}
    </OptionContext.Provider>
  );
}

export default OptionsContextProvider;
