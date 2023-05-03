import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializePlayersList } from './actions';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '../../common/Grid';

import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { AppDispatch, RootState } from '../../shared/store';
import type playersConfigFromJSONFile from '../../shared/players.json';

const mapStateToProps = (state: RootState) => ({
  players: state.playersReducer.players,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializePlayers: (
    players: typeof playersConfigFromJSONFile.players
  ) => dispatch(initializePlayersList(players)),
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

  const mappedPlayersBox = Object.values(players).map((player) => (
    <Grid key={player.id} flexDirection="column">
      <Typography>Player {player.order}</Typography>
      <Typography data-testid={`${player.id}-score`}>
        {player.points}
      </Typography>
    </Grid>
  ));

  return (
    <Box>
      <Grid container spacing={2}>
        {mappedPlayersBox}
      </Grid>
    </Box>
  );
};

export default connector(Players);
