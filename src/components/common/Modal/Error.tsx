import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CENTER_MODAL_STYLE } from '../../../shared/constants/styles';

import type { FC, MouseEventHandler } from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: MouseEventHandler;
  errorMessage: string;
}

const Error: FC<ErrorModalProps> = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal
      data-testid="error-modal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="error-modal-aria-label"
      aria-describedby="error-modal-aria-description"
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
        <Typography textAlign="center" color="feedback.error">
          {errorMessage}
        </Typography>
      </Box>
    </Modal>
  );
};

export default Error;
