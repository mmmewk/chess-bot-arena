import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Chess, PieceSymbol, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ShortMove, Bot } from './types';
import { useDebouncedCallback } from 'use-debounce';
import { copyGame, logGameState } from './helpers/utils';

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
      return false;
    }

    const result = game.move(move);

    // Illegal Move
    if (result === null) {
      console.error('Illegal Move', move);
      return false;
    }

    setFen(game.fen());
    logGameState(game);

    return true;
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    const fromPiece = game.get(sourceSquare);

    let promotion : PieceSymbol | undefined = undefined;

    if (fromPiece.type === 'p' && targetSquare.match(/[a-g][1|8]/)) {
      while (!promotion) {
        const input = window.prompt('Which peice do you want? (queen, rook, bishop or knight)');
        if (!input) continue;

        const firstLetter = input[0]?.toLowerCase();
        if (['k', 'n'].includes(firstLetter)) promotion = 'n';
        if (['q', 'r', 'b'].includes(firstLetter)) promotion = firstLetter as 'q' | 'r' | 'b';
      }
    }

    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion,
    })
  };

  const getBot = useCallback(() => {
    const turn = game.turn();

    if (turn === 'w') return white;
    if (turn === 'b') return black;
  }, [game, white, black]);

  const makeBotMove = useDebouncedCallback(() => {
    if (game.isGameOver()) return;

    const bot = getBot();
    if (!bot) return;

    console.log(`${bot.name} is thinking!`);
    console.time(`${bot.name} moved`);

    const move = bot.move(copyGame(game));

    console.timeEnd(`${bot.name} moved`);
    console.log(move);

    makeMove(move);
  }, 200);

  useEffect(makeBotMove, [fen, makeBotMove]);

  return <Chessboard position={fen} onPieceDrop={onDrop} />;
};

export default ChessGame;
