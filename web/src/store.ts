import { Reducer } from 'react';
import { combineReducers, createStore, applyMiddleware, Action, StoreEnhancer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { connectRouter, LocationChangeAction, routerMiddleware, RouterState } from 'connected-react-router';
import { createBrowserHistory, History, LocationState } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from './reducers';

export const history = createBrowserHistory();


const createRootReducer = (history: History) => combineReducers({
  ...appReducers,
  form: formReducer,
  // router: connectRouter(history),
  router: (connectRouter(history) as any) as Reducer<
    RouterState<LocationState>,
    LocationChangeAction<LocationState>
  >,
});

// ---- reducer ----//
const rootReducer = createRootReducer(history);

// ---- middleware ----//
const middlewares = [routerMiddleware(history), thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
// const middleware = applyMiddleware(thunk, routerMiddleware(history));

const enhancers = [middlewareEnhancer];
const composedEnhancers: StoreEnhancer<unknown, {}> = composeWithDevTools(...enhancers);
// rehydrate state on app start
const initialState = {};
// ---- store ----//
const store = createStore(rootReducer, initialState, composedEnhancers);

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

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