import randomBot from './Bots/random';
import ChessGame from './ChessGame';

function App() {
  return (
    <ChessGame black={randomBot} />
  );
}

export default App;
