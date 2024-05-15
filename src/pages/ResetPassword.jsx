import { Box, Button, CircularProgress, CssBaseline, IconButton, InputAdornment, TextField, ThemeProvider, createTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../App";
import * as Yup from "yup";
import { toast } from "react-toastify";

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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    OTP: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    OTP: Yup.string().required("OTP Required"),
    password: Yup.string()
      .required("Password required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, "Make Strong password"),
    confirmPassword: Yup.string()
      .required("ConfirmPassword required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      if (values.password !== values.confirmPassword) {
        console.error("Passwords do not match");
        toast.error("Passwords do not match");
        return;
      }
      const response = await axios.post(`${API_URL}/user/reset-password`, values);
      console.log(response.data);

      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate("/signin");
     
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {() => (
          <Form>
            <Box
              component="div"
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                "& .MuiTextField-root": {
                  m: 1,
                  width: "25ch",
                  marginBottom: "20px",
                },
                "& .required": {
                  color: "#f44336",
                },
              }}
              novalidate
              autoComplete="off"
            >
              <h2 style={{marginBottom:'20px'}}>
                Reset Password
              </h2>
              <p>Enter the OTP and set a new password</p>
              <div>
                <Field
                name="OTP"
                type="text"
                as={TextField}
                label="OTP"
                variant="outlined"
                className='required'
                />
               <ErrorMessage name="OTP" component='div' className="required"/>
              </div>
              <div>
                <Field
                name='password'
                type={showPassword?'text':'password'}
                as={TextField}
                label='Password'
                variant='outlined'
                className='required'
                InputProps={{
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                      onClick={()=>setshowPassword(!showPassword)}
                      edge='end'
                      >
                        {showPassword?<VisibilityOff/>:<Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                />
                <ErrorMessage
                name="password"
                component='div'
                className="required"
                />
              </div>
              <div>
              <Field
                name='confirmPassword'
                type={showconfirmPassword? 'text' : 'password' }
                as={TextField}
                label='Confirm Password'
                variant='outlined'
                className='required'
                InputProps={{
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                      onClick={()=>setshowconfirmPassword(!showconfirmPassword)}
                      edge='end'
                      >
                        {showconfirmPassword?<VisibilityOff/>:<Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                />
                <ErrorMessage
                name="confirmPassword"
                component='div'
                className="required"
                />
              </div>
              <Button 
              color='primary'
              variant='contained'
              type='submit'
              style={{marginTop:"20px"}}
              disabled={loading}
              >
                {loading?<CircularProgress size={24}/>:"Submit"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default ResetPassword;
