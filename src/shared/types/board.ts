import type customBoardConfig from '../board.json';

type BoardConfigType = {
  shipTypes: Partial<typeof customBoardConfig.shipTypes>;
  layout: typeof customBoardConfig.layout;
};

export type { BoardConfigType };
