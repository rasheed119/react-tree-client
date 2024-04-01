import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { style } from "../styles/style";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ForwardSharpIcon from "@mui/icons-material/ForwardSharp";

export const DeleteModal = ({
  closemodal,
  loading,
  selectedEmployees,
  setSelectedEmployees,
  setErrmsg,
  id,
  getTreeData,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = async () => {
    if (Object.keys(selectedEmployees).length < 4) {
      setErrmsg("Please set employees to all members");
    } else {
      setOpen(true);
      console.log(selectedEmployees);
      setErrmsg("");
    }
  };

  const handleClose = async () => {
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
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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
              onClick={handleClose}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
