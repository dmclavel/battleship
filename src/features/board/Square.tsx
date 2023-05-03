import React, { useMemo } from 'react';

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
      {isHit && (isAMiss ? 'Miss' : 'Hit')}
    </Button>
  );
};

export default Square;
