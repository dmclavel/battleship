import { FONTSIZES } from '../constants/typography';

import type { FontSizes } from '../constants/typography';

type FontSizeKey = keyof FontSizes;

const generateFontSize = (input: FontSizeKey | Array<FontSizeKey>) => {
  let inputList = input;
  if (typeof input === 'string' && input.trim().length) inputList = [input];

  return (inputList as Array<FontSizeKey>).map(
    (inputKey: FontSizeKey) => FONTSIZES[inputKey] ?? FONTSIZES.sm
  );
};

export { generateFontSize };
