import React from 'react';
import { render, screen } from 'test-utils';

import Ship from './Ship';

import type { ShipProps } from './Ship';
import type { RenderResult } from 'test-utils';

type RenderShipFn = (props: ShipProps) => RenderResult;

const renderShip: RenderShipFn = ({ positions, shipType, sunkShips }) =>
  render(
    <Ship positions={positions} shipType={shipType} sunkShips={sunkShips} />
  );

const defaultProps: ShipProps = {
  positions: [
    [2, 9],
    [3, 9],
    [4, 9],
    [5, 9],
    [6, 9],
  ],
  shipType: 'carrier',
  sunkShips: {
    carrier: {
      coordinates: {
        '3,9': 1,
      },
    },
  },
};

describe('Ship', () => {
  beforeEach(() => {
    renderShip(defaultProps);
  });

  it('should render carrier image', () => {
    const carrierImg = screen.getByAltText('carrier');
    expect(carrierImg).toBeInTheDocument();
  });

  it('should render 1 HIT image & 4 MISS images', () => {
    const hitImgs = screen.getAllByAltText('hit');
    const missImgs = screen.getAllByAltText('miss');

    expect(hitImgs).toHaveLength(1);
    expect(missImgs).toHaveLength(4);
  });
});
