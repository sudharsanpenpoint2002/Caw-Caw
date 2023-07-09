import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { CreatePost } from './Pages/CreatePost';
import { Navbar } from './Components/navbar';
import './App.css';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/login' element = { <Login/> }/>
        <Route path='/createpost' element = { <CreatePost/> }/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
