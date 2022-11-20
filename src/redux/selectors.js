const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserName = state => state.auth.user.name;
const getFilms = state => state.films.filmsArray;
const getFilmDetails = state => state.films.film;

const selectors = {
  getIsLoggedIn,
  getUserName,
  getFilms,
  getFilmDetails,
};

export default selectors;
