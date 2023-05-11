import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import Square from './Square';

import type { RenderResult } from 'test-utils';
import type { SquareProps } from './Square';

type RenderSquareFn = (props: SquareProps) => RenderResult;

const renderSquare: RenderSquareFn = ({
  battleshipInfo,
  coordinates,
  hasWon,
  isHit,
  onClick,
}) => render(
  <Square
    battleshipInfo={battleshipInfo}
    coordinates={coordinates}
    hasWon={hasWon}
    isHit={isHit}
    onClick={onClick}
  />,
);

const defaultProps = {
  battleshipInfo: {},
  coordinates: '0,0',
  hasWon: false,
  isHit: false,
  onClick: jest.fn(),
};

describe('Square', () => {
  it('should be clickable', () => {
    const localMockFn = jest.fn();
    renderSquare({
      ...defaultProps,
      onClick: localMockFn,
    });

    const square = screen.getByRole('button');
    expect(square).toBeInTheDocument();
    fireEvent.click(square);

    expect(localMockFn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled after a click', () => {
    renderSquare({
      ...defaultProps,
      isHit: true,
    });

    const square = screen.getByRole('button');
    expect(square).toBeInTheDocument();
    expect(square).toBeDisabled();
  });

  it('should be disabled if player has won', () => {
    renderSquare({
      ...defaultProps,
      hasWon: true,
    });

    const square = screen.getByRole('button');
    expect(square).toBeInTheDocument();
    expect(square).toBeDisabled();
  });

  it('should render a MISS image if there is no ship hit', () => {
    renderSquare({
      ...defaultProps,
      isHit: true,
    });

    const square = screen.getByRole('button');
    expect(square).toBeInTheDocument();
    fireEvent.click(square);

    const missImg = screen.getByAltText('miss');
    expect(missImg).toBeInTheDocument();
  });

  it('should render a HIT image if there is a ship hit', () => {
    renderSquare({
      ...defaultProps,
      battleshipInfo: {
        coordinates: {
          '0,0': 1,
        },
      },
      isHit: true,
    });

    const square = screen.getByRole('button');
    expect(square).toBeInTheDocument();
    fireEvent.click(square);

    const hitImg = screen.getByAltText('hit');
    expect(hitImg).toBeInTheDocument();
  });
});