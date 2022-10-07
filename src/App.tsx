import React, { useMemo, useRef, useState } from 'react';
import bots from './Bots';
import ChessGame, { Handle } from './ChessGame';
import Editor from "@monaco-editor/react";
import lodash from 'lodash';
import template from './Bots/template.txt';
import { Chess } from 'chess.js';

function App() {
  const gameRef = useRef<Handle>(null);
  const [code, setCode] = useState<string>(template);
  const [errorMarkers, setErrorMarkers] = useState<any[]>([]);
  const [whiteBotName, setWhiteBotName] = useState<string>();
  const [blackBotName, setBlackBotName] = useState<string>();

  const prototypeBot = useMemo(() => ({
    name: 'Prototype Bot',
    move: (game: Chess) => {
      if (errorMarkers.length > 0) {
        alert('Fix code errors to make a move');
        return null;
      }
      const move = eval(code);
      return move(game, lodash);
    },
  }), [code, errorMarkers]);

  const white = useMemo(() => {
    if (whiteBotName === 'custom') return prototypeBot;

    return bots.find((bot) => bot.name === whiteBotName);
  }, [prototypeBot, whiteBotName]);

  const black = useMemo(() => {
    if (blackBotName === 'custom') return prototypeBot;

    return bots.find((bot) => bot.name === blackBotName);
  }, [prototypeBot, blackBotName]);

  const resetGame = () => {
    if (gameRef.current) gameRef.current.reset();
  };

  const makeMove = () => {
    if (gameRef.current && code) {
      const game = gameRef.current.getGame();

      const move = eval(code);

      gameRef.current.makeMove(move(game, lodash));
    }
  };

  const renderBotOptions = () => (
    <>
      <option value={undefined}>Player</option>
      {bots.map((bot) => <option value={bot.name} key={bot.name}>{bot.name}</option>)}
      <option value={'custom'}>Prototype Bot</option>
    </>
  );

  return (
    <div style={{ display: 'flex' }}>
      <ChessGame white={white} black={black} ref={gameRef} />
      <Editor
        language='javascript'
        value={code}
        onChange={(value) => setCode(value || '')}
        height='100vh'
        onValidate={setErrorMarkers}
      />
      <div>
        <div>
          <label>White</label>
          <select onChange={(event) => setWhiteBotName(event.target.value)}>
            {renderBotOptions()}
          </select>
        </div>
        <div>
          <label>Black</label>
          <select onChange={(event) => setBlackBotName(event.target.value)}>
            {renderBotOptions()}
          </select>
        </div>
        <button onClick={makeMove}>Make Move</button>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}

export default App;
