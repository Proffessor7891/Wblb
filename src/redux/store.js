import { configureStore } from '@reduxjs/toolkit';
import { filmsReducer } from './index';
import { authReducer } from './index';

const store = configureStore({
  reducer: {
    auth: authReducer,
    films: filmsReducer,
  },
});

export default store;
