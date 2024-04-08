import React, { useEffect, useState } from "react";
import Appbar from "./Appbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    Name: "",
  });
  useEffect(() => {
    window.scrollTo({
      left: 350,
      behavior: "smooth",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/tree/add/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setformdata((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Appbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <RememberMeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Admin
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              name="Name"
              onChange={handleChange}
              value={formdata.Name}
              autoComplete="Name"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Admin
            </Button>
          </Box>
        </Box>
      </Container>
    </Appbar>
  );
}
