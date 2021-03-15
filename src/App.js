import logo from './logo.svg';
import './App.css';
import Home from './component/home'
import Detail from './component/detail'
import Login from './component/login'
import Register from './component/register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Component } from 'react';
class App extends Component {

  render(){
  return (


    <Router>
      <Switch>
      {/* <Route path="/detail">
          <Detail />
        </Route> */}
        <Route path="/detail" component={Detail} />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
}

export default App;
