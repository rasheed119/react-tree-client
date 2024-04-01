import React, { useState, useEffect } from "react";
import Appbar from "../Components/Appbar";
import "../tree.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RotatingLines } from "react-loader-spinner";
import { treeRendering } from "../Helpers/treerender";
import { style } from "../styles/style";
import { DeleteModal } from "../Modals/Deletemodal";

const Tree = () => {
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({});
  const [employee, setEmployee] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [errmsg, setErrmsg] = useState("");
  const [id, setid] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployees({});
  };

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
  useEffect(() => {
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

  const getMembers = async (empid) => {
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
  };

  const getEmployee = async (empid) => {
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
  };

  const handleItemClick = (itemId, role, e) => {
    e.stopPropagation();
    if (role === "E") {
      setOpen(true);
      setLoading(true);
      setid(itemId);
      setTimeout(() => {
        getMembers(itemId);
      }, 1000);
    }
  };

  const handleEmployeeSelect = (memberId, employeeId) => {
    setSelectedEmployees((prevState) => ({
      ...prevState,
      [memberId]: employeeId,
    }));
  };

  return (
    <Appbar getTreeData={getTreeData}>
      <div className="tree">
        <div>{treeRendering(unflatten(state), handleItemClick)}</div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">Select the members to map</h2>
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
                    wrapperClass=""
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
              <p style={{ color: "red" }}>{errmsg}</p>
            </p>
            <DeleteModal
              closemodal={handleClose}
              loading={loading}
              selectedEmployees={selectedEmployees}
              setSelectedEmployees={setSelectedEmployees}
              setErrmsg={setErrmsg}
              getTreeData={getTreeData}
              id={id}
            />
          </Box>
        </Modal>
      </div>
    </Appbar>
  );
};

export default Tree;
