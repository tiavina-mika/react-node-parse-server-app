import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from './reducers';

export const history = createBrowserHistory();

const createRootReducer = (history: any) => combineReducers({
  ...appReducers,
  form: formReducer,
  router: connectRouter(history),
});

// ---- reducer ----//
const rootReducer = createRootReducer(history);

// ---- middleware ----//
const middleware = applyMiddleware(thunk, routerMiddleware(history));

// ---- store ----//
const store = createStore(rootReducer, composeWithDevTools(middleware));

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
export type Dispatch<S> = ThunkDispatch<S, null, Action<string>>;
export type AppDispatch = Dispatch<RootState>;

export type RootState = ReturnType<typeof rootReducer>;

export { store };