import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializePlayersList } from './actions';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '../../components/common/Grid';

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
  const colorScheme = ['primary.500', 'secondary.500'];

  useEffect(() => {
    dispatchInitializePlayers(playersConfig.players);
  }, []);

  const mappedPlayersBox = Object.values(players).map((player, index) => (
    <Grid
      key={player.id}
      flexDirection="column"
      flex={1}
      alignItems="center"
      sx={{
        padding: '0.5rem',
        color: 'grey.100',
        backgroundColor: colorScheme[index] ?? 'primary.500',
      }}
    >
      <Typography>Player {player.order}</Typography>
      <Divider 
        sx={{
          backgroundColor: 'grey.100',
          width: '100%',
          margin: '0.5rem 0',
        }}
      />
      <Typography data-testid={`${player.id}-score`}>
        {player.points}
      </Typography>
    </Grid>
  ));

  return (
    <Box>
      <Grid
        container
      >
        {mappedPlayersBox}
      </Grid>
    </Box>
  );
};

export default connector(Players);
