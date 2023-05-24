import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWinningCondition, boardImportSelector } from '../../features/board/selectors';

import WinnerModal from './WinnerModal';
import { ErrorModal } from '../../components/common/Modal';
import Board from '../../features/board';
import Players from '../../features/players';
import Ships from '../../features/ships';
import Grid from '../../components/common/Grid';
import { AriaDescriptor } from '../../components/common/Accessibility';

import customBoardConfig from '../../shared/board.json';
import customPlayersConfig from '../../shared/players.json';

import type { FC } from 'react';
import type { BoardConfigType } from '../../shared/types/board';
interface GameProps {
  boardConfig: BoardConfigType;
  playersConfig: typeof customPlayersConfig;
}

const Game: FC<Partial<GameProps>> = ({
  boardConfig = customBoardConfig,
  playersConfig = customPlayersConfig,
}) => {
  const hasWon = useSelector(selectWinningCondition);
  const importInfo = useSelector(boardImportSelector);
  const [openWinningModal, setOpenWinningModal] = useState(true);
  const [openErrorModal, setOpenErrorModal] = useState(true);

  const handleWinningModalClose = () => {
    setOpenWinningModal(false);
  };

  const handleErrorModalClose = () => {
    setOpenErrorModal(false);
  };

  return (
    <Grid
      container
      sx={{
        padding: [
          '0.5rem',
          '0.75rem',
          '1rem',
        ],
      }}
      justifyContent="center"
      columnGap={[0, 0, 1]}
    >
      <Grid
        flexDirection="column"
        order={[2, 2, 1]}
        width={['516px', '516px', '30%']}
        rowGap={3}
      >
        <Players playersConfig={playersConfig} />
        <Ships />
      </Grid>
      <Grid
        order={[1, 1, 2]}
      >
        <Board boardConfig={boardConfig} hasWon={hasWon} />
      </Grid>
      <AriaDescriptor id="error-modal-aria-label">
        Error Dialog
      </AriaDescriptor>
      <AriaDescriptor id="error-modal-aria-description">
        An error occured when importing board configuration.
      </AriaDescriptor>
      <ErrorModal
        isOpen={openErrorModal && importInfo.status === 'error'}
        onClose={handleErrorModalClose}
        errorMessage={importInfo.message ?? ''}
      />
      <AriaDescriptor id="winning-modal-aria-label">
        Winning Dialog
      </AriaDescriptor>
      <AriaDescriptor id="winning-modal-aria-description">
        All ships are hit. Player has won!
      </AriaDescriptor>
      <WinnerModal isOpen={hasWon && openWinningModal && importInfo.status !== 'error'} onClose={handleWinningModalClose} />
    </Grid>
  );
};

export type { GameProps };
export default Game;
