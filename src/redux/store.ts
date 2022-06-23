import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import positionReducer from './reducers/positionReducer';
import levelReducer from './reducers/levelReducer';
import registrationReducer from './reducers/auth/registrationReducer';
import loginReducer from './reducers/auth/loginReducer';
import usersReducer from './reducers/usersReducer';
import conversationReducer from './reducers/conversationReducer';
import postsReducer from './reducers/postsReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer'],
};

const rootReducer = combineReducers({
  positionReducer,
  levelReducer,
  registrationReducer,
  loginReducer,
  usersReducer,
  conversationReducer,
  postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
