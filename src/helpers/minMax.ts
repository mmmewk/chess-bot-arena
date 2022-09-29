import { Chess } from "chess.js";
import { Move } from "chess.js";

export type MinMaxParameters = {
  depth: number;
  game: Chess;
  evaluatePosition: (game: Chess) => number;
  max?: boolean;
};

export type MinMaxReturn = {
  value: number;
  move?: string | Move;
};

function minMax({
  depth,
  game,
  evaluatePosition,
  max = true
}: MinMaxParameters): MinMaxReturn {
  if (depth === 0 || game.isGameOver()) {
    return { value: evaluatePosition(game) };
  }

  const initBestValue = max
    ? Number.NEGATIVE_INFINITY
    : Number.POSITIVE_INFINITY;

  let best : MinMaxReturn = { value: initBestValue };

  const moves = game.moves();
  moves.forEach((move) => {
    game.move(move);
    const { value } = minMax({
      depth: depth - 1,
      game: game,
      evaluatePosition,
      max: !max,
    });

    const isMaxAndBestMax = max && value > best.value;
    const isMinAndBestMin = !max && value < best.value;

    if (isMaxAndBestMax || isMinAndBestMin) {
      best.value = value;
      best.move = move;
    }
    game.undo();
  });

  return best;
}

export { minMax };
