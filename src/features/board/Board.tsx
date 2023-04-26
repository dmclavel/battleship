import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { readBoardConfig, updateBoardAndPlayer } from './actions';

import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Square from './Square';

import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { AppDispatch, RootState } from '../../shared/store';
import type { UpdateBoardPayload, Ship } from './boardSlice';
import type boardConfigFromJSONFile from '../../shared/board.json';

const mapStateToProps = (state: RootState) => ({
  board: state.boardReducer.board,
  battleships: state.boardReducer.battleships,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializeBoard: (boardConfig: typeof boardConfigFromJSONFile) =>
    dispatch(readBoardConfig(boardConfig)),
  dispatchUpdateBoard: (payload: UpdateBoardPayload) =>
    dispatch(updateBoardAndPlayer(payload)),
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
  battleships,
}) => {
  useEffect(() => {
    dispatchInitializeBoard(boardConfig);
  }, []);

  const handleSquareClick = (
    rowIndex: number,
    columnIndex: number,
    shipType?: Ship
  ) => {
    dispatchUpdateBoard({
      rowIndex,
      columnIndex,
      shipType,
    });
  };

  return (
    <Box>
      <Grid2 container spacing={1}>
        {board.map((row, rowIndex) => (
          <Grid2
            key={Symbol(row[0].id).toString()}
            display="flex"
            desktop={12}
            tablet={12}
            mobile={12}
          >
            {row.map(({ id, shipType, hitTimestamp }, columnIndex) => (
              <Grid2 key={id} desktop={1} tablet={1} mobile={1}>
                <Square
                  battleshipInfo={battleships[shipType ?? '']}
                  coordinates={`${rowIndex},${columnIndex}`}
                  isHit={Boolean(hitTimestamp)}
                  onClick={() => {
                    handleSquareClick(rowIndex, columnIndex, shipType);
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default connector(Board);
