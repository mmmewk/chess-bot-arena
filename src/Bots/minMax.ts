import { Chess } from 'chess.js';
import sample from 'lodash/sample';
import { minMax } from '../helpers/minMax';

const createMinMaxBot = ({
  depth,
  evaluatePosition,
  pruneBranch = () => false,
  name,
} : {
  depth: number,
  evaluatePosition: (game: Chess) => number,
  pruneBranch?: (game: Chess) => boolean,
  name: string,
}) => {
  return {
    name,
    move: (game: Chess) => {
      const { moves } = minMax({ depth, game, evaluatePosition, pruneBranch });
      return sample(moves);
    }
  }
};

export default createMinMaxBot;
