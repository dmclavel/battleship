import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CENTER_MODAL_STYLE } from '../../shared/constants/styles';

import type { FC, MouseEventHandler } from 'react';

interface WinnerModalProps {
  isOpen: boolean;
  onClose: MouseEventHandler;
}

const WinnerModal: FC<WinnerModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      data-testid="winning-modal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="winning-modal-aria-label"
      aria-describedby="winning-modal-aria-description"
    >
      <Box
        sx={{
          ...CENTER_MODAL_STYLE,
          width: ['80%', 'inherit'],
          padding: ['0.5rem', '2rem'],
          backgroundColor: 'grey.100',
          borderRadius: '4px',
        }}
      >
        <Typography textAlign="center">
          You have won. Congratulations! 🎉🎉
        </Typography>
      </Box>
    </Modal>
  );
};

export default WinnerModal;
