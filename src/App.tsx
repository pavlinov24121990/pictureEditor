import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/main' element={<Main />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
