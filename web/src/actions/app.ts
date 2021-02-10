import { Dispatch } from './../store';
import Parse from 'parse';
import { push } from 'connected-react-router';

import { actionWithLoader } from './utils';
import { AppThunk, AppDispatch } from '../store';

import { getCurrentUser } from '../reducers/app';
import { AppState } from '../types/app';
/* eslint-disable @typescript-eslint/no-use-before-define */
const CONNECTION_FAILED = 'Votre connexion semble dégradée, vérifiez-là puis actualisez la page.';
/**
 *
 * @param {object} error
 */
export const handleErrorMessage = (error: any): string => {
  switch (error.code) {
    case 100:
      return CONNECTION_FAILED;
    default:
      return error.message;
  }
};

export const showError = (errorOrMessage: any): AppDispatch => (dispatch: any): void => {
  console.error(errorOrMessage);
  dispatch({
    type: 'ERROR',
    message: typeof errorOrMessage === 'string' ? errorOrMessage : handleErrorMessage(errorOrMessage),
  });
};

interface Close {
  type: 'CLOSE_ERROR' | 'CLOSE_MESSAGE';
}
export const closeError = (): Close => ({ type: 'CLOSE_ERROR' });

/**
 * load coupon feedback
 * @param {string} message
 */
export const showMessage = (message: string): AppThunk => dispatch => {
  dispatch({
    type: 'MESSAGE',
    message,
  });
};

export const loginSuccess = (): AppThunk => actionWithLoader(async (dispatch: AppDispatch, getState: any) => {
  const currentUser = Parse.User.current() || getCurrentUser(getState);
  if (currentUser && currentUser.getSessionToken()) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: currentUser,
    });

    // update user into localStorage
    updateUserIntoLocalStorage(currentUser);

    // we go to home with we were on the login path
    // (not in case of an auto-login from index.js)
    if (window.location.pathname.endsWith('login')) {
      showHomeThunk(dispatch);
    }
  } else {
    // retry login
    // showLogin();
  }
});

export const closeMessage = (): Close => ({ type: 'CLOSE_MESSAGE' });

export const login = (username: string, password: string): AppThunk => actionWithLoader(async (dispatch: AppDispatch, getState: any): Promise<void> => {
  await Parse.User.logIn(username, password);
	const currentUser = Parse.User.current() || getCurrentUser(getState);
  if (currentUser && currentUser.getSessionToken()) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: currentUser,
    });

    // update user into localStorage
    updateUserIntoLocalStorage(currentUser);

    // we go to home with we were on the login path
    // (not in case of an auto-login from index.js)
    if (window.location.pathname.endsWith('login')) {
      showHomeThunk(dispatch);
    }
  } else {
    // retry login
    // showLogin();
  }
  // await loginSuccess()(dispatch, getState);
  showHomeThunk(dispatch);
});

export const logout = () => actionWithLoader(async (dispatch: AppDispatch) => {
  await Parse.User.logOut();
  // showLogin();
  dispatch({
    type: 'LOGOUT_SUCCESS',
  });
});

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

// ---------------------------------------------------------//
// ---------------------- onEnterApp -----------------------//
// ---------------------------------------------------------//
// export const onEnterApp = (store) => {
// 	return async (nextState, replace, callback) => {
// 		try {
// 			const getState = store.getState;
// 			const user = getCurrentUser(getState());
// 			if (user) {
// 				// todo
// 			}
// 			callback();
// 		} catch (error) {
// 			console.error(error);
// 			callback(error);
// 		}
// 	}
// }

// export function onEnterHome(store) {
// 	return onEnter({
// 		store,
// 		actionThunk: () => {
// 			return async (dispatch, getState) => {
// 				const user = getCurrentUser(getState());
// 				if (user) {

// 				}
// 			}
// 		}
// 	});
// }

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

// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//
export const showHomeThunk = (dispatch: any): any => {
  return showHomeThunk(dispatch);
}
