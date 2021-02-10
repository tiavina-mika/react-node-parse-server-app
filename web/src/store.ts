import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import appReducers from './reducers';

export const history = createBrowserHistory();

const createRootReducer = (history: any) => combineReducers({
  ...appReducers,
  form: formReducer,
  router: connectRouter(history),
});


const persistConfig = {
  blacklist: ['form'],
  key: 'reactreduxform',
  storage,
};

// // ---- reducer ----//
const rootReducer = createRootReducer(history);

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);


const middleware = applyMiddleware(thunk, routerMiddleware(history));
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
export type Dispatch<S> = ThunkDispatch<S, null, Action<string>>;
export type AppDispatch = Dispatch<RootState>;

// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export { store, persistor };