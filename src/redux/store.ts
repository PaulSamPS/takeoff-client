import { combineReducers, configureStore } from '@reduxjs/toolkit';
import positionReducer from './reducers/positionReducer';
import levelReducer from './reducers/levelReducer';
import registrationReducer from './reducers/auth/registrationReducer';
import loginReducer from './reducers/auth/loginReducer';

const rootReducer = combineReducers({
  positionReducer,
  levelReducer,
  registrationReducer,
  loginReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
