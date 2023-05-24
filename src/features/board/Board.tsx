import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { readBoardConfig, updateGameState } from './actions';

import Box from '@mui/material/Box';
import Grid from '../../components/common/Grid';
import Square from './Square';

import type { FC, KeyboardEvent } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { AppDispatch, RootState } from '../../shared/store';
import type { UpdateGamePayload } from '../../shared/types/redux';
import type { BoardConfigType } from '../../shared/types/board';

const mapStateToProps = (state: RootState) => ({
  board: state.boardReducer.board,
  loadedShips: state.shipsReducer.loadedShips,
  sunkShips: state.shipsReducer.sunkShips,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializeBoard: (boardConfig: BoardConfigType) =>
    dispatch(readBoardConfig(boardConfig)),
  dispatchUpdateBoard: (payload: UpdateGamePayload) =>
    dispatch(updateGameState(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type BoardProps = PropsFromRedux & {
  boardConfig: BoardConfigType;
  hasWon: boolean;
};

const Board: FC<BoardProps> = ({
  dispatchInitializeBoard,
  dispatchUpdateBoard,
  board,
  boardConfig,
  hasWon,
  loadedShips,
  sunkShips,
}) => {
  useEffect(() => {
    dispatchInitializeBoard(boardConfig);
  }, []);

  const handleSquareClick = (rowIndex: number, columnIndex: number) => {
    dispatchUpdateBoard({
      rowIndex,
      columnIndex,
    });
  };

  const getNearestFocusableButton = (keyPressCode: string, row: number, col: number) => {
    let correctRow = row;
    let correctCol = col;
    switch (keyPressCode) {
      case 'ArrowUp': {
        if (correctRow === 0) {
          correctRow = board.length - 1;
        } else {
          correctRow = row - 1;
        }
        break;
      }
      case 'ArrowDown': {
        if (correctRow === board.length - 1) {
          correctRow = 0;
        } else {
          correctRow = row + 1;
        }
        break;
      }
      case 'ArrowLeft': {
        if (correctCol === 0) {
          correctCol = board.length - 1;
        } else {
          correctCol = correctCol - 1;
        }
        break;
      }
      case 'ArrowRight': {
        if (correctCol === board.length - 1) {
          correctCol = 0;
        } else {
          correctCol = correctCol + 1;
        }
        break;
      }
      default: break;
    }

    const buttonId = `board-square-${correctRow},${correctCol}`;
    let buttonEl = document.getElementById(buttonId) as HTMLButtonElement;
    if (buttonEl instanceof HTMLButtonElement) {
      while (buttonEl.disabled) {
        buttonEl = getNearestFocusableButton(keyPressCode, correctRow, correctCol) as HTMLButtonElement;
      }

      return buttonEl;
    }
    
    return null;
  };

  const handleSquareKeyDown = (event: KeyboardEvent<HTMLButtonElement>, coordinates: string) => {
    const [row, column] = coordinates.split(',');
    const parsedRow = parseInt(row, 10);
    const parsedCol = parseInt(column, 10);
    const buttonEl = getNearestFocusableButton(event.code, parsedRow, parsedCol);
    if (buttonEl instanceof HTMLButtonElement) {
      buttonEl.focus();
    }
  };

  return (
    <Box
      data-testid="battleships-board"
      sx={{
        width: ['500px', '500px', '500px'],
        overflowX: ['auto', 'hidden', 'hidden'],
        padding: '0.5rem',
        backgroundColor: 'primary.500',
      }}
    >
      <Grid
        container
        sx={{
          width: 'inherit',
          backgroundColor: 'primary.400',
        }}
      >
        {board.map((row, rowIndex) => (
          <Grid
            key={Symbol(row[0].id).toString()}
            desktop={12}
            tablet={12}
            mobile={12}
          >
            {row.map(({ id, hitTimestamp }, columnIndex) => {
              const coordinates = `${rowIndex},${columnIndex}`;
              const shipType = loadedShips[coordinates];
              return (
                <Grid
                  key={id}
                >
                  <Square
                    battleshipInfo={sunkShips[shipType]}
                    coordinates={`${rowIndex},${columnIndex}`}
                    hasWon={hasWon}
                    isHit={Boolean(hitTimestamp)}
                    onClick={() => {
                      handleSquareClick(rowIndex, columnIndex);
                    }}
                    onKeyDown={handleSquareKeyDown}
                  />
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default connector(Board);
