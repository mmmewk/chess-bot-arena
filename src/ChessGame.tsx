import React, { useCallback, useMemo, useState } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ShortMove, Bot } from './types';
import { useDebouncedCallback } from 'use-debounce';
import { logGameState } from './helpers/utils';

interface Props {
  white?: Bot,
  black?: Bot,
}

const ChessGame : React.FC<Props> = ({ white, black }) => {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());

  const makeMove = (move?: string | ShortMove) => {
    if (!move) {
      console.error('No Move Supplied');
      return null;
    }
    const result = game.move(move);
    onMove();
    return result;
  };

  const makeBotMove = useDebouncedCallback(() => {
    if (game.isGameOver()) return;

    const turn = game.turn();
    let bot : Bot | null = null;

    if (turn === 'w' && white) bot = white;
    if (turn === 'b' && black) bot = black;

    if (!bot) return;

    console.log(`${bot.name} is thinking!`)
    console.time(`${bot.name} moved`);
    const move = bot.move(game.fen());
    console.timeEnd(`${bot.name} moved`);
    console.log(move);

    makeMove(move);
  }, 200);

  const onMove = useCallback(() => {
    setFen(game.fen());
    logGameState(game);
    makeBotMove();
  }, [game, makeBotMove]);

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
    });

    // illegal move
    if (move === null) {
      console.error('Illegal Move', sourceSquare, targetSquare);
      return false;
    }
    
    return true;
  }

  return <Chessboard position={fen} onPieceDrop={onDrop} />;
};

export default ChessGame;
