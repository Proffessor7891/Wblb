import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { movieOperator } from '../../redux';
import { selectors } from '../../redux';
import SearchInput from '../SearchInput/SearchInput';
import MoviesItem from '../MoviesItem/MoviesItem';
import s from './MoviesMain.module.scss';

const MoviesMain = () => {
  const [sortBy, setSortBy] = useState('year');
  const [isModalShown, setIsModalShown] = useState(false);
  const dispatch = useDispatch();
  const films = useSelector(selectors.getFilms);
  const filmDetails = useSelector(selectors.getFilmDetails);

  useEffect(() => {
    dispatch(movieOperator.fetchFilmsList(`sort=${sortBy}`));
  }, [dispatch, sortBy]);

  const handleClick = id => {
    setIsModalShown(true);
    dispatch(movieOperator.showFilm(id));
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>Films collection</h2>
      <SearchInput />
      {!films && (
        <p>
          You don`t have any movies
        </p>
      )}
      <div className={s.sort}>
        <p className={s.text}>Sort by</p>
        <select
          name="sortBy"
          onChange={e => setSortBy(e.target.value)}
          className={s.select}
        >
          <option value="year">Name</option>
          <option value="title">Title</option>
        </select>
      </div>
      <ul className={s.list}>
        {films &&
          films.map((film, index) => (
            <li
              key={index}
              className={s.item}
              onClick={() => handleClick(film.id)}
            >
              
              <h2 className={s.film_title}>{film.title}</h2>
              <p>Year: {film.year}</p>
              <p>Format: {film.format}</p>
            </li>
          ))}
      </ul>
      {isModalShown && filmDetails && (
        <MoviesItem
          filmInfo={filmDetails}
          onClose={() => setIsModalShown(false)}
        />
      )}
    </section>
  );
};

export default MoviesMain;
