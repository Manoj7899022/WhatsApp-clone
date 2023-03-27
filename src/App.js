import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import {useSelector } from 'react-redux'

function App() {
 
  const user = useSelector(state => state.user)
  
  return (
    <div className="app">
      { !user ? <Login /> :(
              <div className='app__body'>
              <BrowserRouter>
                  <Sidebar/>
                  <Routes>
                    <Route path='/rooms/:roomId' element={<Chat />} />
                    <Route path='/' element={<Chat />} />
                  </Routes>
              </BrowserRouter>
            </div>
      )}
    </div>
  );
}

export default App;
