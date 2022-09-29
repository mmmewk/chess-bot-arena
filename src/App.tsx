import materialBot from './Bots/material';
import ChessGame from './ChessGame';

function App() {
  return (
    <ChessGame black={materialBot} />
  );
}

export default App;
