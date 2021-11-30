import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { route } from "./Constants/Routes/routesName";
import { finalRoutes } from "./Constants/Routes/routes";
import "./Sass/App.scss";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {finalRoutes().map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
          <>
            {finalRoutes().length === 1 ? (
              <Redirect to={route.LOGIN} />
            ) : (
              <Redirect to={route.HOME} />
            )}
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
