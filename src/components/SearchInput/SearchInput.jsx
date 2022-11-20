import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { movieOperator } from '../../redux';
import s from './SearchInput.module.scss';

const SearchInput = () => {
  const [searchWord, setSearchWord] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = e => {
    if (e.code === 'Enter') {
      if (searchWord.trim('') === '') return toast.warn('Enter something');
      if (searchWord.length === 1)
        return toast.warn('Search must contain more then 1 symbol');
      dispatch(movieOperator.fetchFilmsList(`search=${searchWord.trim('')}`));
      setSearchWord('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchWord.trim('') === '') return toast.warn('Enter something');
    if (searchWord.length === 1)
      return toast.warn('Search must contain more then 1 symbol');
    dispatch(movieOperator.fetchFilmsList(`search=${searchWord.trim('')}`));
    setSearchWord('');
  };

  return (
    <label>
      <input
        type="text"
        value={searchWord}
        onChange={e => setSearchWord(e.target.value)}
        className={s.input}
        placeholder="Type here film's title or actor's full name"
      />
      <button type="submit" className={s.btn} onClick={handleSubmit}>
        Search
      </button>
      <button
        className={s.back}
        type="button"
        onClick={() => {
          dispatch(movieOperator.fetchFilmsList(`sort=year`));
        }}
      >
        <p>Main page</p>
      </button>
    </label>
  );
};

export default SearchInput;
