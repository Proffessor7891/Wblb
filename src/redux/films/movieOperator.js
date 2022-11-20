import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const fetchFilmsList = createAsyncThunk(
  'fetchFilms',
  async (arg, { rejectWithValue }) => {
    try {
      let order;
      arg === 'sort=year' ? (order = 'DESC') : (order = 'ASC');
      const { data } = await axios.get(`movies?${arg}&order=${order}&offset=0`);
      return { data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const importFilms = createAsyncThunk(
  'importFilms',
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('movies/import', args);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const deleteFilm = createAsyncThunk(
  'deleteFilm',
  async (filmId, { rejectWithValue }) => {
    try {
      await axios.delete(`movies/${filmId}`);
      const { data } = await axios.get(
        `movies?sort=year&order=DESC&limit=20&offset=0`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createFilm = createAsyncThunk(
  'createFilm',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('movies', arg);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const showFilm = createAsyncThunk(
  'showFilm',
  async (filmId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`movies/${filmId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const operations = {
  fetchFilmsList,
  importFilms,
  createFilm,
  deleteFilm,
  showFilm,
};

export default operations;
