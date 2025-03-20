
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm,useAuthStore } from '../../hooks';
import { useEffect, useState } from 'react';


const loginFormFields = {
  loginEmail:    '',
  loginPassword: '',
}

import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {
  const navigate = useNavigate();

  
  const { startLogin, errorMessage } = useAuthStore();
  
  const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );

  const loginSubmit = ( event ) => {
      event.preventDefault();
      startLogin({ email: loginEmail, password: loginPassword });
  }

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', 'Correo y/o contraseña incorrectas', 'error');
    }    
  }, [errorMessage])



  return (
    <AuthLayout title="Inicio de Sesión" >
      <form onSubmit={ loginSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="loginEmail"
                value={ loginEmail }
                onChange={ onLoginInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="loginPassword"
                value={ loginPassword }
                onChange={ onLoginInputChange }
              />
            </Grid>


            <Grid 
              container
              display={ !!errorMessage ? '': 'none' }
              sx={{ mt: 1 }}>
              <Grid 
                  item 
                  xs={ 12 }
                >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 } }>
              <Grid item xs={ 12 } sm={ 12 }>
                <Button
                  type="submit" 
                  variant='contained' 
                  style={{backgroundColor: '#036298'}}
                  fullWidth>
                  <Typography sx={{ ml: 1 ,color: 'white' }}>Iniciar Sesión</Typography>
                </Button>
              </Grid>
            </Grid>


          </Grid>


        </form>

    </AuthLayout>
  )
}