import { ElementType } from 'react';
import { useSelector, useStore } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router';
import { retrieveUserFromLocalStorage } from './actions/auth';
import Dashboard from './containers/Dashboard';
// import { useIsAuth } from './hooks/useIsAuth';
import { getCurrentUser } from './reducers/app';

type Props ={ component: ElementType; [x: string]: any };
const PrivateRoute = ({ component: Component, ...rest }: Props) => {
    const store = useStore();

	// useIsAuth();

  const location = useLocation();
  const currentUser = retrieveUserFromLocalStorage(); // it should be before Parse.User.Current()
  const localCurrentUser = useSelector(getCurrentUser);

  if (!currentUser && !localCurrentUser) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }
  return (
    <Route {...rest}>
      <Dashboard>
        <Component />
      </Dashboard>
    </Route>
  );
};

export default PrivateRoute;