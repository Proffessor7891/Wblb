import { createSlice } from '@reduxjs/toolkit';
import { movieOperator } from '../index';
import { toast } from 'react-toastify';

const initialState = {
  filmsArray: [],
  film: {},
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  extraReducers: {
    [movieOperator.fetchFilmsList.fulfilled](state, { payload }) {
      payload?.data.data.length === 0 &&
        toast.error('Sorry, I have not found any film');
      state.filmsArray = payload.data.data;
    },
    [movieOperator.importFilms.fulfilled](state, { payload }) {
      if (payload.status === 0) {
        toast.error(
          `Occured an error while importing film: ${payload.error.code}`,
        );
        return;
      }
      toast.success('YEY, file successfully imported');
      state.filmsArray = [...state.filmsArray, ...payload.data];
    },
    [movieOperator.deleteFilm.fulfilled](state, { payload }) {
      toast.success('You have deleted choosen film from your collection');
      state.filmsArray = payload.data;
    },
    [movieOperator.createFilm.fulfilled](state, { payload }) {
      if (payload.status === 0) {
        toast.error(
          `Occured an error while adding film: ${payload.error.code}`,
        );
        return;
      }
      toast.success('YEY, you added a new film!');
      state.filmsArray.pop();
      state.filmsArray = [payload.data, ...state.filmsArray];
    },
    [movieOperator.showFilm.fulfilled](state, { payload }) {
      state.film = payload.data;
    },
  },
});

export default filmsSlice.reducer;
