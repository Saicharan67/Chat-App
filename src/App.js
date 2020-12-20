import  React , {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {HashRouter as Router,Route} from 'react-router-dom'
import './App.css';
import PrivateRoute from './Components/PrivateRoute';
import HomePage from './Containers/Home';
import LoginPage from './Containers/Login';
import SignUpPage from './Containers/Register';
import {isLoggedInUser} from  './actions'
function App() {



  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
        if(!auth.authenticated){
            dispatch(isLoggedInUser())
        }
    }, []);
  
  return (
    <div className="App">
      <Router>
        <PrivateRoute path='/' exact component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
      </Router>
    </div>
  );
}

export default App;
