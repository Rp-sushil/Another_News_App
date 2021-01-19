import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import News from "./components/News";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">English</Link>
            </li>
            <li>
              <Link to="/hi">Hindi</Link>
            </li>
            <li>
              <Link to="/mr">Marathi</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={"/"}>
            <News />
          </Route>
          <Route path={`/:lan`}>
            <News />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
