import React,{ useState } from "react";
import ModelContext from "./ModelContext";

const ModelContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [memberlength, setmemberlength] = React.useState(0);
  return (
    <ModelContext.Provider
      value={{ open, setOpen, memberlength, setmemberlength }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
