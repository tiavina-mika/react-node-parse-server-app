import { push } from 'connected-react-router';
import Parse from 'parse';

import { SignupFormValues } from '../types/auth.d';
import { actionWithLoader } from './utils';
import { goToDashboard, showError } from './app';

import { getCurrentUser } from '../reducers/app';
import {  AppThunk, AppDispatch } from '../store';

// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//

export const goToLogin = () => push('/login');

export const goToSignup = () => push('/signup');

// ---------------------------------------------------------//
// ---------- fixing bug for Parse.User.Current() ----------//
// ---------------------------------------------------------//
/**
 * Parse.User.Current() save an user as bad ParseUser into localStorage
 * see https://github.com/parse-community/Parse-SDK-JS/issues/992
 */
const currentUserPath = 'Parse/mika/currentUser';

/**
 * get currentUser from LocalStorage
 * @returns {Parse.Object}
 */
export function retrieveUserFromLocalStorage() {
  const userIntoLocalStorage = localStorage.getItem(currentUserPath);
  if (userIntoLocalStorage) {
    const userData = JSON.parse(userIntoLocalStorage);
    // see https://github.com/parse-community/Parse-SDK-JS/issues/992
    userData.className = '_User';
    return Parse.Object.fromJSON(userData);
  }
  return null;
}

/**
 * clear user into localStorage
 */
export function clearUserIntoLocalStorage() {
  localStorage.removeItem(currentUserPath);
}

/**
 * update currentUser into localStorage
 * @param user
 */
export function updateUserIntoLocalStorage(user: any) {
  if (!user) return null;

  // see updateUserOnDisk(user) .../node_modules/parse/lib/node/ParseUser.js
  const json = user.toJSON();
  delete json.password;
  json.className = '_User';
  const userData = JSON.stringify(json);
  localStorage.setItem(currentUserPath, userData);
}

export const loginSuccess = (): any => actionWithLoader(async (dispatch: AppDispatch, getState: any) => {
  const currentUser = Parse.User.current() || getCurrentUser(getState);
  
  if (currentUser && currentUser.getSessionToken()) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: currentUser,
    });

    // update user into localStorage
    updateUserIntoLocalStorage(currentUser);
  } else {
    // retry login
    dispatch(goToLogin());
  }
});

export const login = (username: string, password: string): AppThunk => 
  actionWithLoader(async (dispatch: AppDispatch, getState: any): Promise<void> => {
		await Parse.User.logIn(username, password);
		await loginSuccess()(dispatch, getState);
    dispatch(goToDashboard());
	});

export const signup = (values: SignupFormValues): AppThunk => actionWithLoader(async (dispatch: AppDispatch) => {
	const isAlreadySavedUsername = await Parse.Cloud.run('isAlreadySavedUsername', { username: values.email });

  if (isAlreadySavedUsername) {
    showError('Email already exists')(dispatch);
    return;
  }
	await Parse.Cloud.run('signUp', { ...values });
  dispatch({
    type: 'LOGOUT_SUCCESS',
  });
  dispatch(goToDashboard());
});


export const logout = () => actionWithLoader(async (dispatch: AppDispatch) => {
  await Parse.User.logOut();
  // showLogin();
  dispatch({
    type: 'LOGOUT_SUCCESS',
  });
  clearUserIntoLocalStorage();
  dispatch(push('/login'));
});

// export function onEnterUnknownRoute(store) {
// 	return async (nextState, replace, callback) => {
// 		try {
// 			const getState = store.getState;
// 			const user = getCurrentUser(getState());
// 			if (user) {
// 				showHome();
// 			} else {
// 				showLogin();
// 			}
// 			callback();
// 		} catch (error) {
// 			console.error(error);
// 			callback(error);
// 		}
// 	}
// }