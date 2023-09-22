import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {

  // const url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=804c2a8dd514de4512e2e0af79ef81f6';


  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route element = {<Home />} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
