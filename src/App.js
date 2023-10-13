import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './components/Landingpage';
import Home from './components/Home';
import Profile from './components/Profile Components/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landingpage></Landingpage>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
      </Routes>
    </div>
  );
}

export default App;
