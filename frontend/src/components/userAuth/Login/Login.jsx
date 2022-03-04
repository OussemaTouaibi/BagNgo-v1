import React, { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import MetaData from '../../shared/metaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from "../../../actions/userActions";





function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        BAGNGO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



const Login = ({ history }) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  

  useEffect(() => {

      if(isAuthenticated) {

          history.push('/home')
        
      }

      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }
  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password))
     
  }


  return (
    <ThemeProvider theme={theme}>
      <MetaData title={'BANGO | Sign Up'} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/7625373/pexels-photo-7625373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '10rem'
            }}
          >
           
            <Typography style={{marginBottom:'2rem'}} component="h1" variant="h5">
              BAGNGO
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de Passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Rester connecté"
              />
              <Button
                type="submit"
                id='login_button'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se Connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  Mot de passe oublié ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Créer un compte"}
                  </Link>
                </Grid>
                
              </Grid>
              <Grid item xs style={{marginTop: '2rem'}}>
                <Typography>
                S’inscrire avec :
            </Typography>
               
            </Grid>
            <Grid item xs style={{marginLeft: '8rem'}}>
            <Button>
                <FacebookIcon sx={{ fontSize: 40 }} />
            </Button>
            <Button
            
            >
                <GoogleIcon sx={{ fontSize: 40 }} />
            </Button>
            </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
       
    </ThemeProvider>
  );
}
export default Login;
