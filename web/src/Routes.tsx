import { Route, Switch } from 'react-router';
// import { useStore } from 'react-redux';

import App from './containers/App';
import Projects from './containers/Projects';

const Routes = () => {
  // const store = useStore();

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <App />} />
        <Route path="/projects">
          <Projects />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;