import { minMax } from '../helpers/minMax';

const createMinMaxBot = ({
  depth,
  evaluateFen,
  name,
} : {
  depth: number,
  evaluateFen: (fen: string) => number,
  name: string,
}) => {
  return {
    name,
    move: (fen: string) => {
      const { move } = minMax({ depth, fen, evaluateFen });
      return move;
    }
  }
};

export default createMinMaxBot;
