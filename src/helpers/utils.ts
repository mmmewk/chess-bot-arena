import { Chess } from "chess.js";

export const countChar = (str: string, char: string) => {
  return str.split(char).length - 1;
};

export const winner = (fen: string) => {
  const game = new Chess(fen);
  if (game.isDraw()) return 'd';
  if (game.isCheckmate()) {
    const loser = game.turn();

    return loser === 'w' ? 'b' : 'w';
  }
}
