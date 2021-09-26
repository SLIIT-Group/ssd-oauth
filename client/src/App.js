import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import "./App.css";
import ButtonRow from "./components/HomePage/buttonRow";
import Footer from  "./components/Footer/footer";
import Login from "./components/Login/login";
import AddFiles from "./components/AddFiles/addFile"
import ViewFiles from "./components/ViewFiles/viewFiles"
import Gallery from "./components/Gallery/gallery"

function App() {
  return (
      <Router>
          <div className="ssd-main-class">
          {/*<div className="container">*/}
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark ssd-navbar">
                  <Link to={'/'} className="navbar-brand"> SSD Assignment</Link>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <div style={{width:"350px", display:"inline-block"}} />
                      <ul className="navbar-nav mr-auto">
                          <li className="nav-item">
                              <Link to={'/'} className="nav-link">Home</Link>
                          </li>
                          <li className="nav-item">
                              <Link to={'/login'} className="nav-link">Login</Link>
                          </li>
                      </ul>
                  </div>
              </nav>
              <br/>
              <Switch>
                  <Route exact path = '/' component = {ButtonRow} />
                  <Route exact path = '/upload' component={AddFiles} />
                  <Route exact path = '/login' component = {Login} />
                  <Route exact path = '/view' component={ViewFiles} />
                  <Route exact path = '/gallery' component={Gallery} />
              </Switch>
              <div className="ssd-footer-class">
                  <Footer></Footer>
              </div>
          {/*</div>*/}
          </div>
      </Router>
  );
}

export default App;
