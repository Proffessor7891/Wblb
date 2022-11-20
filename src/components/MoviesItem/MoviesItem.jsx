import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieOperator } from '../../redux';
import closeImg from '../../assets/cancel.svg';
import s from './MoviesItem.module.scss';

const MoviesItem = ({ filmInfo, onClose }) => {
  const dispatch = useDispatch();
  const [isConfirmShown, setIsConfirmShown] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={s.modal}>
        <div>
          <h2>Title: {filmInfo.title}</h2>
          <p>Year: {filmInfo.year}</p>
          <p>Format: {filmInfo.format}</p>
        </div>
        <div className={s.cast}>
          <h3>Cast:</h3>
          <ul>
            {filmInfo.actors &&
              filmInfo.actors.map(({ id, name }) => (
                <li key={id}>
                  <p>{name}</p>
                </li>
              ))}
          </ul>
          <button className={s.btn} onClick={() => setIsConfirmShown(true)}>
            Delete from collection
          </button>
        </div>
        <img
          className={s.close_icon}
          src={closeImg}
          alt="close film's details"
          onClick={onClose}
        />
        {isConfirmShown && (
          <div className={s.confirm}>
            <h2>
              Are you sure you want to delete this movie: '{filmInfo.title}'?
            </h2>
            <button
              className={s.btn}
              onClick={() => {
                dispatch(movieOperator.deleteFilm(filmInfo.id));
                onClose();
              }}
            >
              Yes
            </button>
            <button className={s.btn} onClick={() => setIsConfirmShown(false)}>
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesItem;
