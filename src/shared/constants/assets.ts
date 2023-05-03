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

export { HIT_OR_MISS_IMAGES };
