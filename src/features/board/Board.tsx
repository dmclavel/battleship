import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../shared/store';
import { readBoardConfig } from '../../features/board/actions';
import boardConfigFromJSONFile from '../../shared/board.json';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Square from './Square';

import { updateBoard, UpdateBoardPayload, type Ship } from './boardSlice';

const mapStateToProps = (state: RootState) => ({
  board: state.boardReducer.board,
  battleships: state.boardReducer.battleships,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializeBoard: (boardConfig: typeof boardConfigFromJSONFile) => dispatch(
    readBoardConfig(boardConfig)
  ),
  dispatchUpdateBoard: (payload: UpdateBoardPayload) => dispatch(
    updateBoard(payload),
  ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type BoardProps = PropsFromRedux & {

};

const Board: FC<BoardProps> = ({ dispatchInitializeBoard, dispatchUpdateBoard, board, battleships }) => {
  useEffect(() => {
    dispatchInitializeBoard(boardConfigFromJSONFile);
  }, []);

  const handleSquareClick = (rowIndex: number, columnIndex: number, shipType?: Ship) => {
    dispatchUpdateBoard({
      rowIndex,
      columnIndex,
      shipType,
    });
  };

  return (
    <Box sx={{ flexGrow: 1, width: 'max-content' }}>
      <Grid2
        container
        spacing={1}
      >
        {board.map((row, rowIndex) => (
          <Grid2
            key={Symbol(row[0].id).toString()}
            desktop={12}
            tablet={12}
            mobile={12}
          >
            {row.map(({ id, shipType, hitTimestamp }, columnIndex) => (
              <Grid2
                key={id}
                desktop={1}
                tablet={1}
                mobile={1}
              >
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
