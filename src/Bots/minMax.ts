import { Chess } from 'chess.js';
import { minMax } from '../helpers/minMax';

const createMinMaxBot = ({
  depth,
  evaluatePosition,
  name,
} : {
  depth: number,
  evaluatePosition: (game: Chess) => number,
  name: string,
}) => {
  return {
    name,
    move: (game: Chess) => {
      const { move } = minMax({ depth, game, evaluatePosition });
      return move;
    }
  }
};

export default createMinMaxBot;
