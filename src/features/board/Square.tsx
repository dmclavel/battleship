import React, { useMemo } from 'react';
import { HIT_OR_MISS_IMAGES } from '../../shared/constants/assets';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { FC, SyntheticEvent } from 'react';
import type { BattleshipState } from '../../shared/types/redux';

interface SquareProps {
  battleshipInfo?: BattleshipState;
  coordinates: string;
  hasWon: boolean;
  isHit: boolean;
  onClick: (event: SyntheticEvent) => void;
}

const Square: FC<SquareProps> = ({
  battleshipInfo,
  coordinates,
  hasWon,
  isHit,
  onClick,
}) => {
  const isAMiss = useMemo(
    () => !battleshipInfo?.coordinates?.[coordinates],
    [battleshipInfo]
  );

  return (
    <Button
      disabled={isHit || hasWon}
      type="button"
      sx={{
        width: [50, 50, 50],
        height: [50, 50, 50],
        padding: 0,
        minWidth: 'unset',
        borderRadius: 0,
        border: '1px solid',
        borderColor: 'grey.300',
        backgroundColor: 'grey.100',
        '&:hover': {
          backgroundColor: 'primary.500',
        },
      }}
      onClick={onClick}
    >
      {isHit && (
        <Box
          component="img"
          sx={{
            width: 'inherit',
            height: 'inherit',
          }}
          alt={isAMiss ? 'miss' : 'hit'}
          src={isAMiss ? HIT_OR_MISS_IMAGES.miss : HIT_OR_MISS_IMAGES.hit}
        />
      )}
    </Button>
  );
};

export { type SquareProps };
export default Square;
