import { Move } from "chess.js";

export type ShortMove = Partial<Move> & {
  from: string,
  to: string,
};

export type Bot = {
  name: string,
  move: (fen: string) => string | ShortMove | undefined;
};
