
import Login from './components/userAuth/Login/Login';
import SignUp from './components/userAuth/Signup/Signup';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import './App.css';


function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
   
  <Router>
    <Routes>
   <Route  path='/login' element={<Login />} />
   <Route  path='/signup' element={<SignUp />} />

   </Routes>
   </Router>
  
  );
}

export default App;
