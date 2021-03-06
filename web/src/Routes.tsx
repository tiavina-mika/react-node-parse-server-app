import { Route, Switch } from 'react-router';
import { useStore } from 'react-redux';
import { useEffect } from 'react';

import Projects from './containers/projects/Projects';
import Home from './containers/Home';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';

import { loginSuccess } from './actions/auth';
import Profile from './containers/profile/Profile';
import PrivateRoutes from './PrivateRoutes';
import Logout from './containers/Logout';
import ChangePassword from './containers/profile/ChangePassword';
import ProjectInsert from './containers/projects/ProjectInsert';
import ProjectPreview from './containers/projects/ProjectPreview';
import UserInsert from './containers/users/UserInsert';
import UserPreview from './containers/users/UserPreview';
import Users from './containers/users/Users';


const Routes = () => {
  const store = useStore();

  useEffect(() => {
    // dispatch the parse current user to the store
    loginSuccess()(store.dispatch, store.getState);
  }, [store]);

  return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>  
        <Route path="/login" exact>
          <Login />
        </Route>        
        <Route path="/signup" exact>
          <Signup />
        </Route>  
        <PrivateRoutes path="/dashboard" component={Home} exact />
        <PrivateRoutes path="/dashboard/profile" component={Profile} exact />
        <PrivateRoutes path="/dashboard/changer-mot-de-passe" component={ChangePassword} exact />

        <PrivateRoutes path="/dashboard/projects" component={Projects} exact />
        <PrivateRoutes path="/dashboard/ajouter-projet" component={ProjectInsert} exact />
        <PrivateRoutes path="/dashboard/modifier-projet/:slug" component={ProjectInsert} exact />
        <PrivateRoutes path="/dashboard/projet/:slug" component={ProjectPreview} exact />

        <PrivateRoutes path="/dashboard/utilisateurs" component={Users} exact />
        <PrivateRoutes path="/dashboard/ajouter-utilisateur" component={UserInsert} exact />
        <PrivateRoutes path="/dashboard/utilisateur/:slug" component={UserPreview} exact />

        <Route path="/logout" component={Logout} />
      </Switch>
  );
};

export default Routes;