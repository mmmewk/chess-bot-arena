import React, { useEffect, useState } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ShortMove, Bot } from './types';
import { useDebouncedCallback } from 'use-debounce';
import { winner } from './helpers/utils';

interface Props {
  white?: Bot,
  black?: Bot,
}

const ChessGame : React.FC<Props> = ({ white, black }) => {
  const [fen, setFen] = useState(new Chess().fen());

  const makeMove = (move?: string | ShortMove) => {
    if (!move) {
      console.error('No Move Supplied');
      return null;
    }

    const game = new Chess(fen);
    const result = game.move(move);
    const newFen = game.fen();
    setFen(newFen);
    return result;
  }

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

  const makeBotMove = useDebouncedCallback(() => {
    const game = new Chess(fen);

    if (game.isGameOver()) return;

    const turn = game.turn();
    let bot : Bot | null = null;

    if (turn === 'w' && white) bot = white;
    if (turn === 'b' && black) bot = black;

    if (!bot) return;

    console.log(`${bot.name} is thinking!`)
    console.time(`${bot.name} moved`);
    const move = bot.move(fen);
    console.timeEnd(`${bot.name} moved`);
    console.log(move);

    makeMove(move);
  }, 200);

  useEffect(() => {
    const game = new Chess(fen);
    if (game.isStalemate()) console.log('stalemate');
    if (game.isInsufficientMaterial()) console.log('insufficient material');
    if (game.isThreefoldRepetition()) console.log('three fold repetition');
    if (game.isDraw()) console.log('draw');
    if (game.isCheck()) console.log('check');
    if (game.isCheckmate()) {
      const gameWinner = winner(fen);
      console.log('checkmate');
      if (gameWinner === 'w') console.log('White Wins!');
      if (gameWinner === 'b') console.log('Black Wins!');
    }
    makeBotMove();
  }, [fen, makeBotMove]);

  return <Chessboard position={fen} onPieceDrop={onDrop} />;
};

export default ChessGame;
