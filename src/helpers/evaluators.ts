import { countChar, winner } from "./utils";

export const evaluateCheckmate = (fen: string) => {
  const gameWinner = winner(fen);
  if (gameWinner === 'd') return 0;
  if (gameWinner === 'w') return -999;
  if (gameWinner === 'b') return 999;
}

export const evaluateMaterial = (fen: string) => {
  let value = 0;
  value += countChar(fen, 'p');
  value += 3 * countChar(fen, 'b');
  value += 3 * countChar(fen, 'n');
  value += 5 * countChar(fen, 'r');
  value += 9 * countChar(fen, 'q');

  value -= countChar(fen, 'P');
  value -= 3 * countChar(fen, 'B');
  value -= 3 * countChar(fen, 'N');
  value -= 5 * countChar(fen, 'R');
  value -= 9 * countChar(fen, 'Q');
  return value;
}
