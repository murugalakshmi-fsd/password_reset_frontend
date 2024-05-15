import { Box, Button, CircularProgress, CssBaseline, IconButton, InputAdornment, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useState } from 'react'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {API_URL} from '../App'
import axios from 'axios';

const lightTheme=createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#1976d2",
        },
        secondary:{
            main:"#f50057",
        },
        error:{
            main:"#f44336",
        },
    },
});
const Signin = () => {
    const navigate=useNavigate();
    const [showPassword, setshowPassword] = useState(false);
    const [loading, setloading]=useState(false);
    
    const initialValues = {
        email:"",
        password:"",
    };

    const validationSchema = Yup.object({
        email:Yup.string()
        .email("Invalid email address")
        .required("Email required"),
        password:Yup.string()
        .required("Password required")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/,"Make Strong password"),
    });

    const handleSignin = async (values)=>{
        try{
          setloading(true);
          const response = await axios.post(`${API_URL}/user/signin`, values);
          console.log(response.data);

          const {message,token,userData}=response.data;

          if(message){
            toast.success(message);
            console.log(sessionStorage);
            sessionStorage.setItem("token",token);
            sessionStorage.setItem("userData",JSON.stringify(userData));
            console.log(sessionStorage);
            console.log("Navigating to /home...");
            navigate("/home");
          }
        }catch(error){
           console.error(error.response.data);
           if(error.response){
            if(error.response.status===401){
                toast.error(error.response.data.message);
            }else if(error.response.status===404){
                toast.error(error.response.data.message);
                navigate("/signup")
            }
           }
        }finally{
            setloading(false);
        }
    };
  return (
   <ThemeProvider theme={lightTheme}>
    <CssBaseline/>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSignin}
    >
     <Form>
        <Box
        component='div'
        sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            height:"100vh",
            "& .MuiTextField-root.MuiFormControl-root":{
                m:1,
                width:"25ch",
                marginBottom:"20px",
            },
            "& .required":{
                color:lightTheme.palette.error.main,
            },
        }}
         noValidate
         autoComplete="off"
         >
            <h2 style={{marginBottom:'20px'}}>Signin</h2>
            <div>
                <Field
                name="email"
                type='text'
                as={TextField}
                label='Email'
                variant='outlined'
               className='required'
               />
               <ErrorMessage name='email' component='div' className='required'/>
            </div>
            <div>
            <Field
                name="password"
                type={showPassword? 'text':'password'}
                as={TextField}
                label='Password'
                variant='outlined'
                InputProps={{
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton
                            onClick={()=>setshowPassword(!showPassword)}
                            edge='end'
                            >
                                {showPassword?<VisibilityOff/>:<Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                className='required'
            />
            <ErrorMessage
              name='password'
              component='div'
              className='required'
            />
            </div>
            <Button
            color='primary'
            variant='contained'
            type='submit'
            style={{marginTop:"20px"}}
            disabled={loading}
            >
                {loading?<CircularProgress size={24} /> : "Signin"}
            </Button>
            <p style={{marginTop:"20px"}}>
                <Link to='/forgot-password'>Forgot Password</Link>
            </p>
         </Box>
         </Form>
    </Formik>
   </ThemeProvider>
  )
}

export default Signin