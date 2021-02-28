import Parse from 'parse';

import { AppDispatch } from '../store';
import { User } from '../types/user';
import { actionWithLoader } from './utils';

// ------------------------------------------------------------------- //
// ------------------------------ THUNK ------------------------------ //
// ------------------------------------------------------------------- //
/**
 * load roles for a user
 * @returns {Function}
 */
export const loadUserRolesThunk = (user: User): any => {
  return async (dispatch: AppDispatch) => {
    const roles = await new Parse.Query(Parse.Role)
      .equalTo('users', user)
      .find();

    if (roles && Array.isArray(roles)) {
      dispatch({
        type: 'ROLES_LOADED',
        roles,
      });
    }
    return roles;
  };
};


/**
 * load all roles
 * @returns {Function}
 */
export const loadRolesThunk = (): any => {
  return async (dispatch: AppDispatch) => {
    const roles = await new Parse.Query(Parse.Role)
      .include('users')
      .find();

    if (roles && Array.isArray(roles)) {
      dispatch({
        type: 'ROLES_LOADED',
        roles,
      });
    }
    return roles;
  };
};


// ------------------------------------------------------------------- //
// -------------------------- WITH LOADER ---------------------------- //
// ------------------------------------------------------------------- //
/**
 * load roles for a user
 * @returns {Function}
 */
export const loadUserRoles = (user: User): any => {
  return actionWithLoader(async (dispatch: AppDispatch) => {
    await loadUserRolesThunk(user)(dispatch);
  });
};

/**
 * load all roles
 * @returns {Function}
 */
export const loadRoles = (): any => {
  return actionWithLoader(async (dispatch: AppDispatch) => {
    await loadRolesThunk()(dispatch);
  });
};