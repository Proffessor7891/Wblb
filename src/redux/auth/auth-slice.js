import { createSlice } from '@reduxjs/toolkit';
import { authOperations } from '../index';
import { toast } from 'react-toastify';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      if (action.payload.status === 0) {
        toast.error(
          `Occured error while registering: ${action.payload.error.code}`,
        );
        return;
      }
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.fulfilled](state, { payload }) {
      if (payload.status === 0) {
        toast.error(`Occured error while login: ${payload.error.code}`);
        return;
      }
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
  },
});

export default authSlice.reducer;
