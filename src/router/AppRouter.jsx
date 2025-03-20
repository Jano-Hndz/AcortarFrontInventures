import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useEffect } from 'react';
import { AcortarRoutes } from '../Acortar/routes/AcortarRoutes';
import { useAuthStore } from '../hooks';
import { Box, CircularProgress } from '@mui/material';
import { HomePage } from '../Acortar/pages/HomePage'; 
import { RedirectPage } from '../Acortar/pages/RedirectPage'; 


export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated';

  useEffect(() => {
      checkAuthToken();
  }, [])

  if ( status === 'checking' ) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <Routes>
        
        
        <Route path="/" element={<HomePage />} />

        <Route path="/short/:id" element={<RedirectPage />} />


        <Route path="/auth/*" element={<AuthRoutes />} />


    
    </Routes>
  );
}
