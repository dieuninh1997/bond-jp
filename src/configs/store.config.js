import 'rxjs';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import DeviceInfo from 'react-native-device-info';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers.config';
import rootEpics from '../epics';

const encryptor = createEncryptor({
  secretKey: DeviceInfo.getUniqueID(),
  onError(error) {
    console.log('createEncryptor', error);
  },
});
const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
};
const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const epicMiddlewareSetup = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initStore = (initState) => {
  const store = createStore(persistedReducer, initState, composeEnhancers(applyMiddleware(epicMiddlewareSetup)));
  epicMiddlewareSetup.run(rootEpics);
  const persistor = persistStore(store);
  return { store, persistor };
};

const { store } = initStore();

export default store;
