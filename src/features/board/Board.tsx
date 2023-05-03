import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { readBoardConfig, updateGameState } from './actions';
import { selectWinningCondition } from './selectors';

import Box from '@mui/material/Box';
import Grid from '../../common/Grid';
import Square from './Square';

import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { AppDispatch, RootState } from '../../shared/store';
import type { UpdateGamePayload } from '../../shared/types/redux';
import type boardConfigFromJSONFile from '../../shared/board.json';

const mapStateToProps = (state: RootState) => ({
  board: state.boardReducer.board,
  loadedShips: state.shipsReducer.loadedShips,
  sunkShips: state.shipsReducer.sunkShips,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializeBoard: (boardConfig: typeof boardConfigFromJSONFile) =>
    dispatch(readBoardConfig(boardConfig)),
  dispatchUpdateBoard: (payload: UpdateGamePayload) =>
    dispatch(updateGameState(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type BoardProps = PropsFromRedux & {
  boardConfig: typeof boardConfigFromJSONFile;
};

const Board: FC<BoardProps> = ({
  dispatchInitializeBoard,
  dispatchUpdateBoard,
  board,
  boardConfig,
  loadedShips,
  sunkShips,
}) => {
  useSelector(selectWinningCondition);

  useEffect(() => {
    dispatchInitializeBoard(boardConfig);
  }, []);

  const handleSquareClick = (rowIndex: number, columnIndex: number) => {
    dispatchUpdateBoard({
      rowIndex,
      columnIndex,
    });
  };

  return (
    <Box>
      <Grid container gap={1}>
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
                <Grid key={id} desktop={1} tablet={1} mobile={1}>
                  <Square
                    battleshipInfo={sunkShips[shipType]}
                    coordinates={`${rowIndex},${columnIndex}`}
                    isHit={Boolean(hitTimestamp)}
                    onClick={() => {
                      handleSquareClick(rowIndex, columnIndex);
                    }}
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
