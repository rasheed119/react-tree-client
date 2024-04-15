import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OptionContext from "../Context/OptionContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

export default function EmployeeOptions() {
  const { data, getTreeData, setOpen } = useContext(OptionContext);

  const [loading, setloading] = useState(false);

  const [peapme_checked, setpeapme_checked] = useState(false);
  const [padpa_checked, setpadpa_checked] = useState(false);
  const [member, setmember] = useState([]);
  const [member_id, setmember_id] = useState("");
  const [employee, setemployee] = useState([]);
  const [selectedEmployees, setselectedEmployees] = useState({});
  const [deletedEmployees, setdeletedEmployees] = useState({});

  useEffect(() => {
    get_members();
    get_employees();
  }, []);

  const promote_emp_to_admin_promote_member_to_employee = () => {
    fetch(`http://localhost:8080/tree/peapme/${data.id}`, {
      method: "PUT",
    })
      .then(() => {
        getTreeData();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const promote_emp_to_admin_depromote_parent_admin = () => {
    fetch(`http://localhost:8080/tree/padpa/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role_id: data.role_id }),
    })
      .then(() => {
        getTreeData();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const depromote_to_member_promote_member_as_employee = () => {
    fetch(`http://localhost:8080/tree/dmpme/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ member_id, role_id: data.role_id }),
    })
      .then(() => {
        getTreeData();
        setOpen(false);
      })
      .catch((err) => console.log(err.message));
  };

  const delete_employee = () => {
    fetch(`http://localhost:8080/tree/deleteemp/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedEmployees),
    })
      .then(() => {
        getTreeData();
        setOpen(false);
      })
      .catch((err) => console.log(err.message));
  };

  const get_members = () => {
    setloading(true);
    fetch(`http://localhost:8080/tree/getmembers/${data.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setmember(data.members))
      .catch((error) => console.log(error.message));
    setloading(false);
  };

  const promote_to_admin_map_members_to_employees = () => {
    fetch(`http://localhost:8080/tree/pamme/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEmployees),
    })
      .then(() => {
        getTreeData();
        setOpen(false);
      })
      .catch((error) => console.log(error.message));
  };

  const get_employees = () => {
    fetch(`http://localhost:8080/tree/getemployee/${data.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setemployee(data.employee))
      .catch((error) => console.log(error));
  };

  const handleChange = (e, member_id, employee_id) => {
    setselectedEmployees((prevState) => ({
      ...prevState,
      [member_id]: employee_id,
    }));
  };

  const handleChangeDelete = (e, member_id, employee_id) => {
    setdeletedEmployees((prevState) => ({
      ...prevState,
      [member_id]: employee_id,
    }));
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Promote to Admin and promote members to employees
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setpeapme_checked(!peapme_checked)}
                  checked={peapme_checked}
                />
              }
              label="Are you Sure What to select this option?"
            />
          </FormGroup>
        </AccordionDetails>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          <Button
            disabled={!peapme_checked}
            variant="contained"
            color="primary"
            onClick={promote_emp_to_admin_promote_member_to_employee}
          >
            Promote to Admin
          </Button>
        </Box>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Promote to admin and depromote parent admin
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setpadpa_checked(!padpa_checked)}
                  checked={padpa_checked}
                />
              }
              label="Are you Sure What to select this option?"
            />
          </FormGroup>
        </AccordionDetails>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          <Button
            disabled={!padpa_checked}
            variant="contained"
            color="primary"
            onClick={promote_emp_to_admin_depromote_parent_admin}
          >
            Promote to Admin
          </Button>
        </Box>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Depromote to member and promote member as employee
        </AccordionSummary>
        <AccordionDetails>
          {!loading && (
            <Box
              sx={{
                my: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <InputLabel required>Select member to Promote</InputLabel>
              <Box sx={{ minWidth: 120, flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select member
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={member_id}
                    label="Select member"
                    name="member_id"
                    onChange={(e) => setmember_id(e.target.value)}
                  >
                    {member?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              my: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={member_id === "" ? true : false}
              variant="contained"
              color="success"
              onClick={depromote_to_member_promote_member_as_employee}
            >
              Promote to Employee
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
          promote to admin and map the members to employees
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ my: 2 }} variant="h6" fontWeight={"bold"}>
            Select members to map
          </Typography>
          {member?.length > 0 &&
            member?.map((item) => (
              <Box sx={{ my: 1 }}>
                <Typography sx={{ my: 1 }}>{item.name}</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Employee
                  </InputLabel>
                  <Select
                    sx={{ flex: 1 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedEmployees[item.id] || ""}
                    label="Select member"
                    name="member_id"
                    onChange={(e) => handleChange(e, item.id, e.target.value)}
                  >
                    {employee?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          {member?.length === 0 && (
            <Typography>This Employee has No Members</Typography>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              my: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={Object.keys(selectedEmployees).length !== member.length}
              variant="contained"
              color="success"
              onClick={promote_to_admin_map_members_to_employees}
            >
              Promote {data.name} to admin
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
          Remove this Employee
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ my: 2 }} variant="h6" fontWeight={"bold"}>
            Select members to map
          </Typography>
          {member?.length > 0 &&
            member?.map((item) => (
              <Box sx={{ my: 1 }}>
                <Typography sx={{ my: 1 }}>{item.name}</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Employee
                  </InputLabel>
                  <Select
                    sx={{ flex: 1 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select member to map"
                    value={deletedEmployees[item.id]}
                    name="delete_employee"
                    onChange={(e) =>
                      handleChangeDelete(e, item.id, e.target.value)
                    }
                  >
                    {employee?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          {member?.length === 0 && (
            <Typography>This Employee has No Members</Typography>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              my: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={Object.keys(deletedEmployees).length !== member.length}
              variant="contained"
              color="error"
              onClick={delete_employee}
            >
              Remove {data.name}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
