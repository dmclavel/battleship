import React from 'react';
import { connect } from 'react-redux';

import Ship from './Ship';
import Grid from '../../common/Grid';

import type { FC, } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../shared/store';

const mapStateToProps = (state: RootState) => ({
  shipsLayout: state.shipsReducer.shipsLayout,
  sunkShips: state.shipsReducer.sunkShips,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ShipsProps = PropsFromRedux;

const Ships: FC<ShipsProps> = ({
  shipsLayout,
  sunkShips,
}) => {
  return (
    <>
      <Grid
        rowGap={2}
        flexDirection="column"
      >
        {shipsLayout.map(({ ship, positions }) => (
          <Ship
            key={`${ship}-${positions.toString()}`}
            shipType={ship}
            positions={positions}
            sunkShips={sunkShips}
          />
        ))}
      </Grid>
    </>
  );
};

export { type ShipsProps };
export default connector(Ships);
