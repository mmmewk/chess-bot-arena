import { Chess } from "chess.js";
import { evaluateCheckmate, evaluateMaterial } from "../helpers/evaluators";
import createMinMaxBot from "./minMax";

const materialBot = createMinMaxBot({
  name: 'Material Bot',
  evaluatePosition: (game: Chess) => {
    const checkmateValue = evaluateCheckmate(game);
    if (checkmateValue) return checkmateValue;
  
    return evaluateMaterial(game);
  },
  depth: 3,
});

export default materialBot;
