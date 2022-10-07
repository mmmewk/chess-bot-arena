import { Chess } from "chess.js";
import { Move } from "chess.js";

export type MinMaxParameters = {
  depth: number;
  game: Chess;
  evaluatePosition: (game: Chess) => number;
  pruneBranch?: (game: Chess) => boolean;
};

export type MinMaxReturn = {
  value: number;
  moves: (string | Move)[];
};

function minMax({
  depth,
  game,
  evaluatePosition,
  pruneBranch = () => false,
}: MinMaxParameters): MinMaxReturn {
  if (depth === 0 || game.isGameOver() || pruneBranch(game)) {
    return { value: evaluatePosition(game), moves: [] };
  }

  const max = game.turn() === 'w';

  const initBestValue = max
    ? Number.NEGATIVE_INFINITY
    : Number.POSITIVE_INFINITY;

  let best : MinMaxReturn = { value: initBestValue, moves: [] };

  const moves = game.moves();
  moves.forEach((move) => {
    game.move(move);
    const { value } = minMax({
      depth: depth - 1,
      game: game,
      evaluatePosition,
    });

    const isMaxAndBestMax = max && value > best.value;
    const isMinAndBestMin = !max && value < best.value;

    if (isMaxAndBestMax || isMinAndBestMin) {
      best.value = value;
      best.moves = [move];
    }

    if (value === best.value) best.moves.push(move);
    game.undo();
  });

  return best;
}

export { minMax };
