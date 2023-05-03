import React, { useMemo } from 'react';
import { HIT_OR_MISS_IMAGES } from '../../shared/constants/assets';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { FC, SyntheticEvent } from 'react';
import type { BattleshipState } from '../../shared/types/redux';

interface SquareProps {
  battleshipInfo?: BattleshipState;
  coordinates: string;
  isHit: boolean;
  onClick: (event: SyntheticEvent) => void;
}

const Square: FC<SquareProps> = ({
  battleshipInfo,
  coordinates,
  isHit,
  onClick,
}) => {
  const isAMiss = useMemo(
    () => !battleshipInfo?.coordinates?.[coordinates],
    [battleshipInfo]
  );

  return (
    <Button
      disabled={isHit}
      type="button"
      sx={{
        width: 50,
        height: 50,
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
            width: '1rem',
            height: '1rem',
          }}
          alt={isAMiss ? 'miss' : 'hit'}
          src={isAMiss ? HIT_OR_MISS_IMAGES.miss : HIT_OR_MISS_IMAGES.hit}
        />
      )}
    </Button>
  );
};

export default Square;
