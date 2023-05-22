import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';

import type { FC } from 'react';
import type { Grid2Props } from '@mui/material/Unstable_Grid2';

const Grid: FC<Grid2Props> = (props) => {
  return (
    <Grid2 display="flex" {...props} />
  );
};

export default Grid;
