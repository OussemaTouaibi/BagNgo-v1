import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { login, clearErrors } from "../../../actions/userActions";
import Loader from '../../shared/Loader/loader'

const Login = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // Validation

const { register, handleSubmit, formState: {errors} } = useForm();


  // Login

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

      if(isAuthenticated) {

        handleClose();
			alert.success('Connecté Avec Succès.');


      }

      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }
  }, [dispatch, alert, isAuthenticated, error])

  const submitHandler = (e) => {
   
      dispatch(login(email, password));      
  }

  return (
    <React.Fragment>
      
      <Button onClick={handleClickOpen}>
        Connexion
      </Button>
      <Dialog open={open} onClose={handleClose}>
      
      <DialogTitle>Connexion</DialogTitle>
      {loading ? <Loader /> :(
        <DialogContent>
        <Grid>         
            <Box component="form" onSubmit={handleSubmit(submitHandler)}  sx={{ mt: 1 }}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Information invalide' 
                }})}
                {...register("email", {required: 'Champ requis',
                 
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                value={email}          
                onChange={(e) => setEmail(e.target.value)} 
              />
              
   
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Mot de Passe"
                type="password"
                id="password"
                autoComplete="current-password"
              {...register("password", {required: "Champ requis"})}
              
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                value={password}          
                onChange={(e) => setPassword(e.target.value)} 
              />
         
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Rester connecté"
              />
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

          
          <Button color="secondary" onClick={handleClose}>Annuler</Button>
          <Button  color="secondary" type='submit'> Se Connecter</Button>
          </Box>
   
   </Grid>

   </DialogContent>
      )}
   <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default Login;
