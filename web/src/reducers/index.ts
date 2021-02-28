import { RootState } from '../store';
import appReducer from './app';
import projectReducer from './projects';
import userReducer from './users';
import roleReducer from './roles';

const appReducers = {
  app: appReducer, 
  projects: projectReducer,
  users: userReducer,
  roles: roleReducer,
};

export default appReducers;

/**
 * used by selectors
 * @param state
 * @param path
 * @param [errorMessageIfNotFound]
 * @returns {*}
 */
export const getData = (
  state: RootState, 
  path: string, 
  errorMessageIfNotFound?: any,
) => {
  let data;
  try {
    if (typeof state === 'function') {
      throw new Error('The state parameter must not be a function. The error is usually the usage of getState instead of getState(). Path is');
    }
    data = path.split('.').reduce((res: any, prop) => res[prop], state);
    if (errorMessageIfNotFound && data == null) {
      throw new Error(errorMessageIfNotFound);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return data;
};