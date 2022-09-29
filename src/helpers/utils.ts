import { Chess } from "chess.js";

export const countChar = (str: string, char: string) => {
  return str.split(char).length - 1;
};

export const winner = (game: Chess) => {
  if (game.isDraw()) return 'd';
  if (game.isCheckmate()) {
    const loser = game.turn();

    return loser === 'w' ? 'b' : 'w';
  }
}

export const logGameState = (game: Chess) => {
  if (game.isStalemate()) console.log('stalemate');
  if (game.isInsufficientMaterial()) console.log('insufficient material');
  if (game.isThreefoldRepetition()) console.log('three fold repetition');
  if (game.isDraw()) console.log('draw');
  if (game.isCheck()) console.log('check');
  if (game.isCheckmate()) {
    const gameWinner = winner(game);
    console.log('checkmate');
    if (gameWinner === 'w') console.log('White Wins!');
    if (gameWinner === 'b') console.log('Black Wins!');
  }
}

export const copyGame = (game: Chess) => {
  const newGame = new Chess();
  newGame.loadPgn(game.pgn());
  return newGame;
}
