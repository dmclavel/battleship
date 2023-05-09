import type { Ship as ShipType } from '../types/redux';

import battleship from '../../assets/battleship.png';
import carrier from '../../assets/carrier.png';
import cruiser from '../../assets/cruiser.png';
import destroyer from '../../assets/destroyer.png';
import submarine from '../../assets/submarine.png';

import hit from '../../assets/hit.png';
import miss from '../../assets/miss.png';
import hitSmall from '../../assets/hit-small.png';
import missSmall from '../../assets/miss-small.png';

const HIT_OR_MISS_IMAGES: {
  [key in 'hit' | 'miss' | 'hitSmall' | 'missSmall']: string;
} = {
  hit,
  hitSmall,
  miss,
  missSmall,
};

const SHIP_IMAGES: { [key in ShipType]: string } = {
  battleship,
  carrier,
  cruiser,
  destroyer,
  submarine,
};

export { HIT_OR_MISS_IMAGES, SHIP_IMAGES };
