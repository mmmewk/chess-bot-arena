import materialBot from './Bots/material';
import randomBot from './Bots/random';
import ChessGame from './ChessGame';

function App() {
  return (
    <ChessGame black={materialBot} white={randomBot} />
  );
}

export default App;
