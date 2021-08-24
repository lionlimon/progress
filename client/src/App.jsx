import { BrowserRouter } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <BrowserRouter>
      {router(false)}
    </BrowserRouter>
  );
}

export default App;

