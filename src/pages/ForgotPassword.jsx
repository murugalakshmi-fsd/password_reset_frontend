import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  AxiosService  from "../utils/ApiService";
import { toast } from "react-toastify";
import { API_URL } from "../App";
import axios from "axios";
import * as Yup from "yup";


const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#f44336",
    },
  },
});
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/user/forgot-password`, {
        email,
      });
      console.log(response.data);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate("/reset-password");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send password reset email. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          "& .MultiTextField-root": {
            m: 1,
            width: "25ch",
            marginBottom: "20px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <h2 style={{ marginBottom: "20px" }}>Forgot Password</h2>
        <p style={{ textAlign: "center" }}>
          Enter your email address to receive a passwordreset link.
        </p>
        <div>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleEmailChange}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleForgotPassword}
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>
        <p style={{ marginTop: "20px" }}>
          Remember you password?<Link to="/signin">Sign in</Link>
        </p>
        <p>
          Don't have an account?<Link to="/signup">Signup</Link>
        </p>
      </Box>
    </ThemeProvider>
  );
};
export default ForgotPassword;
