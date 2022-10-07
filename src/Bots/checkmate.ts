import { Chess } from "chess.js";
import { evaluateCheckmate } from "../helpers/evaluators";
import createMinMaxBot from "./minMax";

export const mateInOneBot = createMinMaxBot({
  name: 'Mate in one Bot',
  evaluatePosition: (game: Chess) => {
    return evaluateCheckmate(game) || 0;
  },
  depth: 1,
});

export const mateInTwoBot = createMinMaxBot({
  name: 'Mate in two Bot',
  evaluatePosition: (game: Chess) => {
    return evaluateCheckmate(game) || 0;
  },
  depth: 3,
});
