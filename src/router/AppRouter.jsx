import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useEffect } from 'react';
import { AcortarRoutes } from '../Acortar/routes/AcortarRoutes';
import { useAuthStore } from '../hooks';
import { Box, CircularProgress } from '@mui/material';
import { HomePage } from '../Acortar/pages/HomePage'; 

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

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

      <Route path="/home" element={<HomePage />} />

      {status === 'authenticated' ? (
        <Route path="/*" element={<AcortarRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/home" />} />

    </Routes>
  );
}
