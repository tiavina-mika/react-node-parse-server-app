import { push } from 'connected-react-router';
import Parse from 'parse';

import { AppThunk, AppDispatch, RootState } from '../store';
import { getValues, setValues } from '../utils/parseUtils';
import { showParseObj, actionWithLoader  } from './utils';
import { validateSignup } from '../utils/validation';

import { getUser, getUsers } from '../reducers/users';

// --------------------------------------------------------//
// ------------------ Parse <=> Object --------------------//
// --------------------------------------------------------//

const USER_PROPERTIES: any = new Set([
  'lastName', 'firstName', 'email', 'password',
]);

/**
 * get values for current user
 * @param user
 * @returns {Object}
 */
export const getUserValues = (user: any) => getValues(user, USER_PROPERTIES);

/**
 * set user values
 * @param user
 * @param values
 */
export const setUserValues = (user: any, values: any) => {

  setValues(user, values, USER_PROPERTIES);
};

// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//
/**
 * create new user
 * @param values
 * @returns {*}
 */
export const createUser = (values: any): AppThunk => {
  validateSignup(values);

  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const users = getUsers(getState());

	  const user = await Parse.Cloud.run('addAdministrator', { ...values });
		
    dispatch({
      type: 'USER_LOADED',
      user,
    });
    dispatch({
      type: 'USERS_UPDATED',
      users: [user, ...users],
    });
  });
};

/**
 * delete current user
 * @param user
 * @returns {*}
 */
export const deleteUser = (user: any): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const users = getUsers(getState());
    const newUsers = users.filter((m: any) => m !== user);

    user.set('deleted', true);
    await user.save();
    dispatch({
      type: 'USERS_UPDATED', // used in users list
      users: newUsers,
    });
  });
};

/**
 * clear user from store
 * @param {Object} user
 */
export const clearUser = (): any => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: 'REMOVE_USER',
    });
  };
};


/**
 * load all templates
 * @returns {Function}
 */
export const loadUsersThunk = (): any => {
  return async (dispatch: AppDispatch) => {
    const newUsers = [];
    const users = await new Parse.Query(Parse.User)
      .notEqualTo('deleted', true)
      .find();

    for (const user of users) {
          const roles = await new Parse.Query(Parse.Role)
      .equalTo('users', user)
      .find();
    }

    if (users && Array.isArray(users)) {
      dispatch({
        type: 'USERS_LOADED',
        users,
      });
    }
    return users;
  };
};

/**
 * load all templates
 * @returns {Function}
 */
export const loadUsers = (): any => {
  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    await loadUsersThunk()(dispatch, getState);
  });
};

// --------------------------------------------------------//
// ------------------ loading user --------------------//
// --------------------------------------------------------//

/**
 * load user into redux
 * @param userId
 * @returns {function(*, *): Promise<*>}
 */
export const loadUserThunk = (userId: string, bySlug?: boolean): any => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentUser = getUser(getState());
    if (!currentUser || currentUser.id !== userId) {
      // loading user
      const user = await new Parse.Query(Parse.User)
        .equalTo(bySlug ? 'slug' : 'objectId', userId)
        .first();

      dispatch({
        type: 'USER_LOADED',
        user,
      });
      return user;
    }

    return currentUser;
  };
};

/*
* load user
* @param userId
* @returns {*}
*/
export const loadUser = (userId: string, bySlug?: boolean): AppThunk => {
 return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
   await loadUserThunk(userId, bySlug)(dispatch, getState);
 });
};

// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//
/**
 * show user
 * @param userId
 * @param fromNewTab
 */
export const showUser = (userId: string) => showParseObj('user', userId);
export const goToUsers = () => push('/dashboard/utilisateurs');
export const goToUserAdd = () => push('/dashboard/ajouter-utilisateur');
export const goToUserPreview = (slug: string) => push('/dashboard/utilisateurs/' + slug);