import React, { useState, useEffect, useContext } from "react";
import Appbar from "../Components/Appbar";
import "../tree.css";
import Box from "@mui/material/Box";
import { treeRendering } from "../Helpers/treerender.js";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RotatingLines } from "react-loader-spinner";
import { Divider } from "@mui/material";
import SuperAdminOptions from "../Options/SuperAdminOptions.js";
import AdminOptions from "../Options/AdminOptions.js";
import EmployeeOptions from "../Options/EmployeeOptions.js";
import MemberOption from "../Options/MemberOption.js";
import OptionContext from "../Context/OptionContext.js";

export default function Tree() {
  const [loading, setLoading] = useState(true);

  const { data, setdata, state, getTreeData, open, setOpen } =
    useContext(OptionContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  /*   const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedEmployees({});
  }; */

  useEffect(() => {
    window.scrollTo({
      left: 150,
      behavior: "smooth",
    });
    getTreeData();
  }, []);

  function unflatten(items) {
    var tree = [],
      mappedArr = {};

    items.forEach(function (item) {
      var id = item.id;
      if (!mappedArr.hasOwnProperty(id)) {
        mappedArr[id] = item;
        mappedArr[id].children = [];
      }
    });

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        var mappedElem = mappedArr[id];

        if (mappedElem.role_id) {
          var parentId = mappedElem.role_id;
          mappedArr[parentId].children.push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  /*   const getMembers = async (empid) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/tree/getmembers/${empid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMember(data);
      getEmployee(empid);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      alert("Something Went Wrong..");
    }
  }; */

  /*   const getEmployee = async (empid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/tree/getemployee/${empid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something Went Wrong..");
    }
  }; */

  /*   const handleItemClick = (itemId, itemName, role, e) => {
    e.stopPropagation();
    setOpen(true);
    setShowDeleteModal(true);
    setLoading(true);
    setid(itemId);
    setTimeout(() => {
      getMembers(itemId);
    }, 1000);
  }; */

  const reports_to = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/tree/reports_to/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const report = await response.json();
        setdata((prevState) => {
          return {
            ...prevState,
            reports_to: report.result[0].Name,
          };
        });
      }
    } catch (error) {
      console.log(error, "Error Reports to");
    }
  };

  const handleItemClick = (e, id, Name, role, role_id) => {
    e.stopPropagation();
    setLoading(true);
    setdata({
      id,
      Name,
      role,
      role_id,
    });
    role !== "SA" && reports_to(role_id);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setOpen(true);
  };

  /*   const handleEmployeeSelect = (memberId, employeeId) => {
    setSelectedEmployees((prevState) => ({
      ...prevState,
      [memberId]: employeeId,
    }));
  }; */

  function designation(role) {
    switch (role) {
      case "A":
        return "Admin";
      case "M":
        return "Member";
      case "E":
        return "Employee";
      case "SA":
        return "Super Admin";
      default:
        return "role";
    }
  }

  return (
    <Appbar>
      <div className="tree">
        <div>{treeRendering(unflatten(state), handleItemClick)}</div>
      </div>
      <div>
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
          <Box sx={{ width: 600, height: "100%" }} role="presentation">
            {loading && (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RotatingLines
                  visible={true}
                  height="50"
                  width="50"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </Box>
            )}
            {!loading && (
              <Box sx={{ px: 2, py: 3 }}>
                <Box>
                  {/*                 <Typography variant="h6" fontStyle="bold" gutterBottom>
                  Name
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontStyle="bold"
                  gutterBottom
                ></Typography> */}
                  <Typography sx={{ my: 2 }} fontWeight="bold" variant="h6">
                    Details :
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "550" }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {designation(data.role) + "_id"}
                          </TableCell>
                          <TableCell>{data.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Name
                          </TableCell>
                          <TableCell>{data.Name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Designation
                          </TableCell>
                          <TableCell>{designation(data.role)}</TableCell>
                        </TableRow>
                        {data.role !== "SA" && (
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Reports to
                            </TableCell>
                            <TableCell>{data.reports_to}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {data.role !== "A" && data.role !== "SA" && (
                    <>
                      <Divider sx={{ my: 3, opacity: 2 }} />
                      <Typography sx={{ my: 1 }} fontWeight="bold" variant="h6">
                        Options
                      </Typography>
                    </>
                  )}
                  <div>
                    {/*                     {data.role === "SA" && <SuperAdminOptions />}
                    {data.role === "A" && <AdminOptions />} */}
                    {data.role === "E" && <EmployeeOptions />}
                    {data.role === "M" && <MemberOption />}
                  </div>
                </Box>
              </Box>
            )}
          </Box>
        </Drawer>
        {/*         <Modal
          open={showDeleteModal}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            {!loading && memberlength > 0 && (
              <h2 id="parent-modal-title">Select the members to map</h2>
            )}
            <p id="parent-modal-description">
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RotatingLines
                    visible={true}
                    height="50"
                    width="50"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </Box>
              )}
              {!loading &&
                member.members?.map((memberItem, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                    key={index}
                  >
                    <p>{memberItem.Name}</p>
                    <select
                      value={selectedEmployees[memberItem.id] || ""}
                      onChange={(e) =>
                        handleEmployeeSelect(memberItem.id, e.target.value)
                      }
                    >
                      <option value="">Select Employee</option>
                      {employee.employee?.map((employeeItem) => (
                        <option key={employeeItem.id} value={employeeItem.id}>
                          {employeeItem.Name}
                        </option>
                      ))}
                    </select>
                  </Box>
                ))}
            </p>
            <DeleteModal
              closemodal={handleClose}
              loading={loading}
              selectedEmployees={selectedEmployees}
              setSelectedEmployees={setSelectedEmployees}
              getTreeData={getTreeData}
              id={id}
            />
          </Box>
        </Modal> */}
      </div>
    </Appbar>
  );
}
