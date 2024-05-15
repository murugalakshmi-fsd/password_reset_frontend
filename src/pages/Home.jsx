import { Box, Button, Container, Typography, createTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const lightTheme = createTheme({
 palette:{
    mode:"light",
 },
});

const Home = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const navigate = useNavigate();

    const handleLogout=()=>{
        sessionStorage.removeItem("useData");
        navigate("/signin");
        toast.success("Logout Successful");
    };

    const handleSignIn =()=>{
        navigate("/signin");
    };


  return (
   <Container maxWidth='sm'>
    <Box sx={{
        my:4,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        heigth:"10vh",
        backgroundColor:lightTheme.palette.background.default,
        color:lightTheme.palette.text.primary,
        padding:"20px",
        textAlign:"center",
        overflow:"hidden",
    }}
    >
        <Typography variant='h4' component='h1' gutterBottom>
            Welcome to Our Website
        </Typography>
        {userData? (
            <>
            <Typography variant='h5' component='h2' gutterBottom>
                Welcome, {userData?.firstName}!
            </Typography>
            <Typography variant='body1' gutterBottom>
                We are glad to see you again. Feel free to expplore our services.
            </Typography>
            <Button variant='contained' color='primary' onClick={handleLogout}>
                Logout
            </Button>
            </>
        ):(
            <>
            <Typography variant='body1' gutterBottom>
                To access our services, please sign in.
            </Typography>
            <Button variant='contained' color='primary' onClick={handleSignIn}>
                Sign In
            </Button>
            </>
        )}
    </Box>
   </Container>
  )
}

export default Home