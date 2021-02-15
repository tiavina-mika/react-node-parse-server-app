import { Route, Switch, useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Dashboard from './containers/Dashboard';
import Projects from './containers/projects/Projects';
import Home from './containers/Home';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';

import { loginSuccess } from './actions/auth';
import Profile from './containers/profile/Profile';

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
        <Route path={`${path}/profile`} exact>
          <Profile />
        </Route>
      </Dashboard>            
    </Switch>
  );
};

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch the parse current user to the store
    dispatch(loginSuccess());
  }, [dispatch]);

  return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>  
        <Route path="/login">
          <Login />
        </Route>        
        <Route path="/signup">
          <Signup />
        </Route>  
        <Route path="/dashboard">
          <DashboardRoutes />
        </Route>
      </Switch>
  );
};

export default Routes;