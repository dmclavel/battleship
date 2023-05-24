import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '../common/Grid';

const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        padding: '1rem',
        marginBottom: ['0.5rem', '1rem', '1.5rem'],
      }}
    >
      <Grid container>
        <Grid flexGrow={1} justifyContent="center">
          <Typography
            color="grey.100"
            fontSize={window.generateFontSize(['lg', '2xl', '3xl'])}
          >
            Battleship Application
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
