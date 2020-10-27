import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import HomePage from './Containers/Home';
import LoginPage from './Containers/Login';
import SignUpPage from './Containers/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
      </Router>
    </div>
  );
}

export default App;
