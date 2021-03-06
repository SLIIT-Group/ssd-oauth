import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/home";
import Footer from "./components/Footer/footer";
import Login from "./components/Login/login";
import Gallery from "./components/Gallery/gallery";
import Navbar from "./components/Navbar/navbar";
import Upload from "./components/Upload/upload";

function App() {
  return (
    <Router>
      <div className="ssd-main-class">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/gallery" component={Gallery} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
