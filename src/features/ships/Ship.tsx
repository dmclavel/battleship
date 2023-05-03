import React from 'react';
import { HIT_OR_MISS_IMAGES } from '../../shared/constants/assets';

import Box from '@mui/material/Box';
import Grid from '../../common/Grid';

import type { FC } from 'react';
import type { Ship as ShipType, BattleshipState } from '../../shared/types/redux';

import battleship from '../../assets/battleship.png';
import carrier from '../../assets/carrier.png';
import cruiser from '../../assets/cruiser.png';
import destroyer from '../../assets/destroyer.png';
import submarine from '../../assets/submarine.png';

const SHIP_IMAGES: { [key in ShipType]: string } = {
  battleship,
  carrier,
  cruiser,
  destroyer,
  submarine,
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
  const sortValue = {
    hitSmall: 1,
    missSmall: -1,
  };
  const hitOrMissCircles = (() => (
    positions.map((position) => {
      const coordinates = position.join(',');
      const shipCoordinates = sunkShips[shipType]?.coordinates ?? {};
      const isAHit = Boolean(shipCoordinates[coordinates]);

      return isAHit ? 'hitSmall' : 'missSmall';
    })
  ))().sort((a, b) => sortValue[b] - sortValue[a]);

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
        {hitOrMissCircles.map((imgKey) => {
          return (
            <Box
              component="img"
              sx={{
                width: '1rem',
                height: 'auto',
              }}
              alt={imgKey === 'hitSmall' ? 'hit' : 'miss'}
              src={HIT_OR_MISS_IMAGES[imgKey]}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Ship;
