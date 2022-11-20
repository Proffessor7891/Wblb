import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { movieOperator } from '../../redux';
import s from './MoviesForm.module.scss';

const FORMATS = [
  { id: 1, title: 'DVD' },
  { id: 2, title: 'VHS' },
  { id: 3, title: 'Blu-ray' },
];

const MoviesForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('DVD');
  const [actors, setActors] = useState([]);
  const [actorName, setActorName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    title && title.trim('') !== '' && year && format && actors.length > 0
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [title, year, format, actors.length]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'title':
        return setTitle(value);
      case 'year':
        return setYear(value);
      case 'format':
        return setFormat(value);
      case 'actorName':
        return setActorName(value);
      default:
        return;
    }
  };

  const resetValues = () => {
    setTitle('');
    setFormat('');
    setYear('');
    setActors([]);
    setFormat('DVD');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (year < 1950 || year > 2021) {
      return toast.warn('possible years are between 1950 and 2021');
    }
    dispatch(movieOperator.createFilm({ title, year, format, actors }));
    resetValues();
  };

  const handleActorSubmit = () => {
    if (actorName.trim('') === '') {
      return toast.warn(`Enter actor's name or lastname `);
    }
    setActors([...actors, actorName]);
    setActorName('');
  };

  const handleActorDelete = index => {
    setActors(actors.filter(actor => actors.indexOf(actor) !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" className={s.form}>
        <h2 className={s.title}>You can add film by filling fields below</h2>
        <label className={s.label}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
            className={s.input}
            placeholder="Title"
          />
        </label>
        <label className={s.label}>
          <input
            type="number"
            name="year"
            value={year}
            onChange={handleChange}
            required
            className={s.input}
            placeholder="Year"
          />
        </label>
        <label className={s.label}>
          Format
          <select
            name="format"
            onChange={handleChange}
            required
            className={s.select}
          >
            {FORMATS.map(({ id, title }) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label className={s.label}>
          <input
            type="text"
            name="actorName"
            value={actorName}
            onChange={handleChange}
            className={s.input}
            placeholder="Actor's name"
          />
          <button
            type="button"
            onClick={handleActorSubmit}
            className={s.button}
          >
            Add an actor
          </button>
        </label>
        {actors.length !== 0 ? (
          <h3 className={s.title}>Actors you have added to this film</h3>
        ) : (
          <p className={s.prompt}>
            You need to enter at least one actor to proceed
          </p>
        )}
        <ul className={s.list}>
          {actors.map((actor, index) => (
            <li key={index} className={s.item}>
              <p className={s.text}>{actor}</p>
              <button
                type="button"
                className={s.del_btn}
                onClick={() => {
                  handleActorDelete(index);
                }}
              >
                Delete this actor
              </button>
            </li>
          ))}
        </ul>
        <button type="submit" className={s.button} disabled={isDisabled}>
          Add film
        </button>
      </form>
    </div>
  );
};

export default MoviesForm;
