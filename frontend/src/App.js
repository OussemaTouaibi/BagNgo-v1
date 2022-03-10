import { useEffect } from 'react';

import { loadUser } from './actions/userActions';
import store from './store'

import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/components/shared/theme'
import './App.scss';



import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/userPages/Home';
import Test from './components/userPages/test';
import { Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router  } from 'react-router-dom';


function App() {
  useEffect(() => {
 store.dispatch(loadUser())
  }, [])
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
    <Router>
      <Header />

      <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/' component={Test} />

    </Switch>


    <Footer />
    </Router>
    </ThemeProvider>
</div>

  );
}

export default App;
