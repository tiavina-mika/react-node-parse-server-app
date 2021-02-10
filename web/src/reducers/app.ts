import { RootState } from '../store';
import { AppState, AppAction } from '../types/app.d';
import { getData } from './index';

const INITIAL_STATE: AppState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  title: null,
};

const projectsReducer = (state = INITIAL_STATE, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
      };
    case 'LOADING_END':
      return {
        ...state,
        loading: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.message,
      };
    case 'CLOSE_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'MESSAGE':
      return {
        ...state,
        message: action.message,
      };
    case 'CLOSE_MESSAGE':
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

// ------------------------------------------------------------------//
// --------------------------- Selectors ----------------------------//
// ------------------------------------------------------------------//
export const getCurrentUser = (state: RootState, errorIfNotFound = false) => getData(state, 'app.user', errorIfNotFound && 'No current user in app');
export const getError = (state: RootState, errorIfNotFound = false) => getData(state, 'app.error', errorIfNotFound && 'No error in app');
export const getMessage = (state: RootState, errorIfNotFound = false) => getData(state, 'app.message', errorIfNotFound && 'No message in app');
export const getLoading = (state: RootState, errorIfNotFound = false) => getData(state, 'app.loading', errorIfNotFound && 'No action with loader in app');
export const getTitle = (state: RootState, errorIfNotFound = false) => getData(state, 'app.title', errorIfNotFound && 'No title in app');

export default projectsReducer;