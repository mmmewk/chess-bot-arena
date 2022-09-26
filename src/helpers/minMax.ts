import { Chess } from "chess.js";
import { Move } from "chess.js";

export type MinMaxParameters = {
  depth: number;
  fen: string;
  evaluateFen: (fen: string) => number;
  max?: boolean;
};

export type MinMaxReturn = {
  value: number;
  move?: string | Move;
};

function minMax({
  depth,
  fen,
  evaluateFen,
  max = true
}: MinMaxParameters): MinMaxReturn {
  const game = new Chess(fen);
  if (depth === 0 || game.isGameOver()) {
    return { value: evaluateFen(fen) };
  }

  const initBestValue = max
    ? Number.NEGATIVE_INFINITY
    : Number.POSITIVE_INFINITY;

  let best : MinMaxReturn = { value: initBestValue };

  const moves = game.moves();
  moves.forEach((move) => {
    const game = new Chess(fen);
    game.move(move);
    const { value } = minMax({
      depth: depth - 1,
      fen: game.fen(),
      evaluateFen: evaluateFen,
      max: !max,
    });

    const isMaxAndBestMax = max && value > best.value;
    const isMinAndBestMin = !max && value < best.value;

    if (isMaxAndBestMax || isMinAndBestMin) {
      best.value = value;
      best.move = move;
    }
  });

  return best;
}

export { minMax };
