import React, { useState, useEffect, useContext } from "react";
import Appbar from "../Components/Appbar";
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
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import EmployeeOptions from "../Options/EmployeeOptions.js";
import MemberOption from "../Options/MemberOption.js";
import OptionContext from "../Context/OptionContext.js";
import "../tree.css";
import toast from "react-hot-toast";

const Tree = () => {
  //Code to Check all the checed ids
  const [checkedIds, setCheckedIds] = useState([]);

  // Function to recursively find checked ids
  const findCheckedIds = (node) => {
    const ids = [];
    if (node.checked === 1) {
      ids.push(node.id);
    }
    if (node.children) {
      node.children.forEach((child) => {
        ids.push(...findCheckedIds(child)); // Concatenate arrays
      });
    }
    return ids;
  };

  const onTreeStateChange = (state, event) => {
    setshow(state);
    const ids = findCheckedIds(state);
    setCheckedIds(ids); // Update state with checked ids
  };

  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [show, setshow] = useState({});
  const [conform_delete, setConform_delete] = useState(false);

  const { data, setdata, state, getTreeData, open, setOpen } =
    useContext(OptionContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  /*   const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedEmployees({});
  }; */

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

  useEffect(() => {
    window.scrollTo({
      left: 150,
      behavior: "smooth",
    });
    getTreeData();
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      const unflattenedData = unflatten(state);
      setTreeData(unflattenedData);
    }
  }, [state]);

  function removeChildrenKey(node) {
    if (
      !node.children ||
      !Array.isArray(node.children) ||
      node.children.length === 0
    ) {
      delete node.children;
    } else {
      node.children.forEach((child) => removeChildrenKey(child));
    }
  }

  const objdata = treeData[0];
  //console.log(objdata.length > 0 && objdata[0]);

  objdata && removeChildrenKey(objdata);

  /*   function addCheckedAndIsOpen(obj) {
    console.log(obj);
    // Base case: if the object is empty or not an object, return
    if (typeof obj !== "object" || Object.keys(obj).length === 0) {
      return;
    }

    // Add the 'checked' key with a value of 0 and 'isOpen' key with a value of false to the current object
    obj.checked = 0;
    obj.isOpen = false;

    // Recursively traverse through each child object
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        addCheckedAndIsOpen(obj[key]);
      }
    }
  } */

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

  const handleItemClick = (e, id, name, role, role_id) => {
    e.stopPropagation();
    setLoading(true);
    setdata({
      id,
      name,
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

  const Delete_Selected = async () => {
    const response = await fetch(
      "http://localhost:8080/folderview/delete_selected",
      {
        method: "DELETE",
        body: JSON.stringify({ checkedIds }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setConform_delete(false);
      setCheckedIds([]);
      getTreeData();
      toast.success("Successfully deleted");
    } else {
      toast.error("Something Went Wrong..");
    }
  };

  return (
    <Appbar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div className="tree">
          <div>{treeRendering(treeData, handleItemClick)}</div>
        </div>
        <Typography sx={{ marginLeft: "170px", my: 2 }} variant="h5">
          Folder View
        </Typography>
        <Box
          sx={{
            marginLeft: "170px",
            display: "flex",
            gap: "20rem",
          }}
        >
          <Box sx={{ overflow: "scroll", height: "200px", width: "250px" }}>
            {treeData.length > 0 && treeData ? (
              <FolderTree data={treeData[0]} onChange={onTreeStateChange} />
            ) : (
              <p>Loading...</p>
            )}
          </Box>
          {show.checked > 0 && (
            <>
              <Box sx={{ marginLeft: 0 }}>
                <Typography variant="h6">Delete Selected </Typography>
                <FormGroup sx={{ my: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => setConform_delete(!conform_delete)}
                        checked={conform_delete}
                      />
                    }
                    label="Are you Sure What to Delete Selected?"
                  />
                </FormGroup>
                <Box
                  sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    disabled={!conform_delete}
                    variant="contained"
                    color="error"
                    onClick={Delete_Selected}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
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
                          <TableCell>{data.name}</TableCell>
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
};
export default Tree;
