import { Route, Switch, useRouteMatch } from 'react-router';
import { createBrowserHistory } from 'history';

import Dashboard from './containers/Dashboard';
import Projects from './containers/projects/Projects';
import Home from './containers/Home';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';

const history = createBrowserHistory();

const DashboardRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Dashboard>
        <Route path={path} exact>
          <Home />
        </Route>
        <Route path={`${path}/projects`} exact>
          <Projects />
        </Route>
      </Dashboard>            
    </Switch>
  );
};

const AuthRoutes = () => {

  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>        
      <Route path="/signup" exact>
        <Signup />
      </Route>        
    </Switch>
  );
};

const Routes = () => {

  return (
      <Switch>
        <Route path="/">
          <AuthRoutes />
        </Route>
        <Route path="/dashboard">
          <DashboardRoutes />
        </Route>
      </Switch>
  );
};

export default Routes;