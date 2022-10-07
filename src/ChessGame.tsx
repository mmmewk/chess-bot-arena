import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Chess, PieceSymbol, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ShortMove, Bot } from './types';
import { useDebouncedCallback } from 'use-debounce';
import { copyGame, logGameState } from './helpers/utils';

interface Props {
  white?: Bot,
  black?: Bot,
}

export type Handle = {
  reset: () => void,
  getGame: () => Chess,
  makeMove: (move: string | ShortMove) => void,
}


const ChessGame = forwardRef<Handle, Props>(({ white, black }, ref) => {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());

  useImperativeHandle(ref, () => ({
    getGame: () => copyGame(game),
    makeMove,
    reset: () => {
      game.reset();
      setFen(game.fen());
    }
  }));

  const makeMove = (move?: string | ShortMove) => {
    if (game.isGameOver()) {
      return false;
    }
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
    // If its a bots turn do nothing
    const bot = getBot();
    if (bot) return false;

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
  }, 400, { trailing: true });

  useEffect(makeBotMove, [fen, makeBotMove, white, black]);

  return <Chessboard position={fen} onPieceDrop={onDrop} />;
});

export default ChessGame;
