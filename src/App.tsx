import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { route } from "./Constants/Routes/routesName";
import routes from "./Constants/Routes/routes";
import "./Sass/App.scss";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
          <Redirect to={route.HOME} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
