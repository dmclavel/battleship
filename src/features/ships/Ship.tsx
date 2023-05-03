import React from 'react';

import Box from '@mui/material/Box';
import Grid from '../../common/Grid';

import type { FC } from 'react';
import type { Ship as ShipType, BattleshipState } from '../../shared/types/redux';

import battleship from '../../assets/battleship.png';
import carrier from '../../assets/carrier.png';
import cruiser from '../../assets/cruiser.png';
import destroyer from '../../assets/destroyer.png';
import submarine from '../../assets/submarine.png';
import hitSmall from '../../assets/hit-small.png';
import missSmall from '../../assets/miss-small.png';

const SHIP_IMAGES: { [key in ShipType]: string } = {
  battleship,
  carrier,
  cruiser,
  destroyer,
  submarine,
};

const HIT_OR_MISS_IMAGES: { [key in 'hit' | 'miss']: string } = {
  hit: hitSmall,
  miss: missSmall,
};

interface ShipProps {
  positions: Array<Array<number>>;
  shipType: ShipType;
  sunkShips: { [key in ShipType]?: BattleshipState };
}

const Ship: FC<ShipProps> = ({
  positions,
  shipType,
  sunkShips,
}) => {
  return (
    <Grid alignItems="center" columnGap={1}>
      <Box
        component="img"
        sx={{
          width: '5rem',
          height: 'auto',
        }}
        alt={shipType}
        src={SHIP_IMAGES[shipType] ?? SHIP_IMAGES.battleship}
      />
      <Grid>
        {positions.map((position) => {
          const coordinates = position.join(',');
          const shipCoordinates = sunkShips[shipType]?.coordinates ?? {};
          const isAHit = Boolean(shipCoordinates[coordinates]);

          return (
            <Box
              component="img"
              sx={{
                width: '1rem',
                height: 'auto',
              }}
              alt={isAHit ? 'hit' : 'miss'}
              src={HIT_OR_MISS_IMAGES[isAHit ? 'hit' : 'miss']}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Ship;
