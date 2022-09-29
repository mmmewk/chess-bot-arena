import sample from 'lodash/sample';
import { Chess } from "chess.js";
import { ShortMove } from '../types';

const randomBot = {
  name: 'Randotron 3000',
  move: (game: Chess) => {
    const possibleMoves = game.moves() as (string | ShortMove)[];

    const move = sample(possibleMoves);

    return move; 
  }
};

export default randomBot;
