import { Router, Route, Switch, useRouteMatch } from 'react-router';
// import { useStore } from 'react-redux';
import { createBrowserHistory } from 'history';

import App from './containers/App';
import Projects from './containers/Projects';
import Home from './containers/Home';

const history = createBrowserHistory();

const DashboardRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <App>
        <Route path={path} exact>
          <Home />
        </Route>
        <Route path={`${path}/projects`} exact>
          <Projects />
        </Route>
      </App>            
    </Switch>
  );
};

const Routes = () => {
  // const store = useStore();

  return (
    <Router history={history}>
      <Switch>
        <Route path="/dashboard">
          <DashboardRoutes />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;