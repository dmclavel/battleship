import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '../common/Grid';

const Navbar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'primary.500',
        padding: '1rem',
        marginBottom: ['0.5rem', '1rem', '1.5rem']
      }}
    >
      <Grid container>
        <Grid flexGrow={1} justifyContent="center">
          <Typography
            color="grey.100"
            fontSize={['fontSizes.md', 'fontSizes.xl', 'fontSizes.2xl']}
          >
            Battleship Application
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
