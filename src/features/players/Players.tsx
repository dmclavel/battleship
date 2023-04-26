import React, { useEffect } from 'react';
import { connect, type ConnectedProps } from 'react-redux';
import { initializePlayersList } from './actions';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import type { FC } from 'react';
import type { AppDispatch, RootState } from '../../shared/store';
import type playersConfigFromJSONFile from '../../shared/players.json';

const mapStateToProps = (state: RootState) => ({
  players: state.playersReducer.players,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializePlayers: (players: typeof playersConfigFromJSONFile.players) =>
    dispatch(initializePlayersList(players)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type BoardProps = PropsFromRedux & {
  playersConfig: typeof playersConfigFromJSONFile;
};

const Players: FC<BoardProps> = ({
  dispatchInitializePlayers,
  players,
  playersConfig,
}) => {
  useEffect(() => {
    dispatchInitializePlayers(playersConfig.players);
  }, []);

  const mappedPlayersBox = Object.values(players).map(player => (
    <Grid2
      display="flex"
      key={player.id}
      flexDirection="column"
    >
      <Typography>
        Player {player.order}
      </Typography>
      <Typography data-testid={`${player.id}-score`}>
        {player.points}
      </Typography>
    </Grid2>
  ));

  return (
    <Box>
      <Grid2 container spacing={2}>
        {mappedPlayersBox}
      </Grid2>
    </Box>
  );
};

export default connector(Players);
