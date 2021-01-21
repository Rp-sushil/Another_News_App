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
              <Link to="/" id="en">
                English
              </Link>
            </li>
            <li>
              <Link to="/hi" id="hi">
                Hindi
              </Link>
            </li>
            <li>
              <Link to="/mr" id="mr">
                Marathi
              </Link>
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
