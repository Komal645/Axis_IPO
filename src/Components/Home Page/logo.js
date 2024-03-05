import React from "react";
import { Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Box sx={{ paddingLeft: '1rem', margin: '1rem' }}>
      <Typography
        color={'#ae275f'}
        sx={{
          fontSize: `calc(1.375rem + 1.5rem)`,
          textDecoration: 'none',
          cursor: 'pointer',
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Axis IPO
      </Typography>
    </Box>
  );
};

export default Logo;
