import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import OptionContext from "../Context/OptionContext";
import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-hot-toast";
import Typography from "@mui/material/Typography";

function MemberOption() {
  const { data, getTreeData, setOpen } = useContext(OptionContext);

  const [admin, setadmin] = useState([]);
  const [employee, setemployee] = useState([]);

  const [employee_change, setemployee_change] = useState({
    member_id: data.id,
    employee_id: "",
  });

  const [promote, setpromote] = useState({
    member_id: data.id,
    admin_id: "",
  });

  const get_admin = async () => {
    try {
      const response = await fetch("http://localhost:8080/tree/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setadmin(data.admin);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getemployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/tree/getemployee/${data.role_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setemployee(data.employee);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_admin();
    getemployee();
  }, []);

  const promote_employee = async () => {
    try {
      const response = await fetch("http://localhost:8080/tree/promote_mte", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promote),
      });
      if (response.ok) {
        getTreeData();
        toast.success(`Hurray 🥳, ${data.name} Promoted to Employee`);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const change_employee = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/tree/change_employee",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee_change),
        }
      );
      if (response.ok) {
        getTreeData();
        toast.success(`Employee Changed Successfully`);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const remove_member = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/tree/remove_member/${data.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        getTreeData();
        toast.success(`Member Removed Successfully`);
        setOpen(false);
      } else {
        alert("error");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error Occured While removing member");
    }
  };

  const handleChange = (event) => {
    event.target.name === "admin_id" &&
      setpromote({
        ...promote,
        [event.target.name]: event.target.value,
      });
    event.target.name === "employee_id" &&
      setemployee_change({
        ...employee_change,
        [event.target.name]: event.target.value,
      });
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Promote to Employee
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <InputLabel required>Select Admin to map</InputLabel>
            <Box sx={{ minWidth: 120, flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Admin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={promote.admin_id}
                  label="Select Admin"
                  name="admin_id"
                  onChange={handleChange}
                >
                  {admin?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
            <Button
              disabled={promote.admin_id === "" ? true : false}
              variant="contained"
              color="success"
              onClick={promote_employee}
            >
              Promote {data.name} to Employee
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Change to Other Employee
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="h6">Current Employee Name :</Typography>
            <Typography>{data.reports_to}</Typography>
          </Box>
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <InputLabel required>Select an Employee to Change</InputLabel>
            <Box sx={{ minWidth: 120, flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Employee
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={employee_change.employee_id}
                  label="Select Employee"
                  name="employee_id"
                  onChange={handleChange}
                >
                  {employee?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
            <Button
              disabled={employee_change.employee_id === "" ? true : false}
              variant="contained"
              color="success"
              onClick={change_employee}
            >
              Change Employee
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Remove this Member
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Are You Sure want to remove {data.name} ?
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={remove_member} variant="contained" color="error">
            Remove
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
}

export default MemberOption;
