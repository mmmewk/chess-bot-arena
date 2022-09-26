import { evaluateCheckmate, evaluateMaterial } from "../helpers/evaluators";
import createMinMaxBot from "./minMax";

const materialBot = createMinMaxBot({
  name: 'Material Bot',
  evaluateFen: (fen: string) => {
    const checkmateValue = evaluateCheckmate(fen);
    if (checkmateValue) return checkmateValue;
  
    return evaluateMaterial(fen);
  },
  depth: 2,
});

export default materialBot;
