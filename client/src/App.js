import{BrowserRouter} from 'react-router-dom'
import {PublicRoutes} from './routes/Routes'

function App() {
  return (
    <BrowserRouter className="App">
      <PublicRoutes/>
    </BrowserRouter>
  );
}

export default App;
