import { Box, Button, Modal } from "@mui/material";
import React, { useContext } from "react";
import { style } from "../styles/style";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ForwardSharpIcon from "@mui/icons-material/ForwardSharp";
import ModelContext from "../Context/ModelContext";
import toast from "react-hot-toast";

export const DeleteModal = ({
  closemodal,
  loading,
  selectedEmployees,
  setSelectedEmployees,
  id,
  getTreeData,
}) => {
  const { open, setOpen, memberlength } = useContext(ModelContext);

  const handleOpen = () => {
    if (Object.keys(selectedEmployees).length === memberlength) {
      setOpen(true);
    } else {
      toast.error("Please set employee to all Members");
    }
  };

  const handleDelete = async () => {
    setOpen(false);
    try {
      await fetch("http://localhost:8080/tree/deleteemp/" + id, {
        method: "DELETE",
        body: JSON.stringify(selectedEmployees),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getTreeData();
      setSelectedEmployees({});
      closemodal();
    } catch (error) {
      console.log(error.meessage);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!loading && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            color="error"
            onClick={closemodal}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="success"
            endIcon={<ForwardSharpIcon />}
            onClick={handleOpen}
          >
            Confrim
          </Button>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">Delete Employee</h2>
          <p id="child-modal-description">
            Are you sure you want to delete this employee?
          </p>
          <Box
            sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Button
              startIcon={<CloseIcon />}
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
