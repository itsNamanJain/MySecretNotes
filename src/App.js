 import React from "react";
 import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import NoteState from "./context/NoteState";
function App() {
  return ( <>
  <NoteState>
  <Router>
  <Navbar/>
  <div className="container">
      <Switch>
        const [alert, setalert] = useState(null)
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
        </Switch>
        </div>
        </Router>
        </NoteState>
        </>
  );
} 

export default App;
