import { Chess } from "chess.js";
import { evaluateCheckmate, evaluateMaterial } from "../helpers/evaluators";
import createMinMaxBot from "./minMax";

const materialBot = createMinMaxBot({
  name: 'Material Bot',
  evaluateFen: (fen: string) => {
    const game = new Chess(fen);
    const checkmateValue = evaluateCheckmate(game);
    if (checkmateValue) return checkmateValue;
  
    return evaluateMaterial(game);
  },
  depth: 2,
});

export default materialBot;
