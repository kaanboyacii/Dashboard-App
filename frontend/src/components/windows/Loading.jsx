import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <CircularProgress color="primary" size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Yükleniyor...
      </Typography>
    </Box>
  );
};

export default Loading;
