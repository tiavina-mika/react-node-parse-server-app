import { push } from 'connected-react-router';

import { RootState, AppDispatch } from '../store';
import { toId } from '../utils/parseUtils';
import { showError } from './app';

/* eslint-disable @typescript-eslint/no-use-before-define */

export const showParseObj = (urlPrefix: string, parseObjOrId: string, subPage?: string) => {
  const id = toId(parseObjOrId);
  return push('/' + urlPrefix + '-' + id + (subPage ? '/' + subPage : ''));
};

/**
 * returns a thunk
 * @param thunkOrPromise (signature if thunk: (dispatch : func, getState : func) : Promise)
 * @returns {function(*=, *=): Promise<void>}
 */
export const actionWithLoader = (thunkOrPromise: any): any => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch({
    type: 'LOADING_START',
  });
  try {
    if (typeof thunkOrPromise === 'function') {
      await thunkOrPromise(dispatch, getState);
    } else {
      await thunkOrPromise;
    }
  } catch (error) {
    showError(error)(dispatch);
  } finally {
    dispatch({
      type: 'LOADING_END',
    });
  }
};

export const onEnter = ({ store, actionThunk, getReplacingPath, withLoader = true }: any) => {
  return async (nextState: any, replace: any, callback: any) => {
    try {
      if (getReplacingPath) {
        const replacingPath = await getReplacingPath(store.getState);
        if (replacingPath) {
          replace(replacingPath);
          callback();
          return;
        }
      }

      // ---- actual call ----//
      const dispatchingFunction = actionThunk(nextState.params);
      let result;
      if (withLoader) {
        result = actionWithLoader(dispatchingFunction)(store.dispatch, store.getState);
      } else {
        result = dispatchingFunction(store.dispatch, store.getState);
      }
      if (result && result.then) {
        await result;
      }

      callback();
    } catch (error) {
      console.error(error);
      callback(error);
    }
  };
};


// export function goBack() {
// 	goBackInRouter();
// }


// export function getPrefix() {
// 	// LOCAL : no prefix
// 	// PROD : /photoapp
// 	return '/photoapp';
// 	//return process.env.NODE_ENV === 'production' ? '/photoapp' : '';
// }

// export function push(pathname: string, returnPath: any) {
// 	// pathname might already be a location object
// 	const location = returnPath ? routerLocation(pathname, returnPath) : pathname;
// 	routerPush(getPrefix() + location);
// }

// export function showParseObj(urlPrefix: any, parseObjOrId: any, subPage: any) {
// 	const id = toId(parseObjOrId);
// 	return push('/' + urlPrefix + '-' + id + (subPage ? "/" + subPage : ""));
// }
// export function editParseObj(urlPrefix: any, parseObjOrId: any) {
// 	const id = toId(parseObjOrId);
// 	return push('/' + urlPrefix + 'Edit-' + id);
// }

// export function saveParseObj(parseObject: any, {actionType, goBack = false, callback}: any) {
// 	return actionWithLoader(async (dispatch: AppDispatch) => {
// 		await parseObject.save();
// 		//---- resultActionType ----//
// 		actionType && dispatch({
// 			type: actionType
// 		});
// 		//---- goBackAfterwards ----//
// 		goBack && dispatch(goBackInRouter());
// 		//---- callback ----//
// 		callback && callback();
// 	});
// }


export const getValueParseObj = (parseObject: any) => parseObject.toJSON();