import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieOperator } from '../../redux';
import s from './ImportMovies.module.scss';

const ImportMovies = () => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileTypeError, setFileTypeError] = useState();
  const [file, setFile] = useState();
  const formData = new FormData();

  const handleChange = e => {
    if (e.target.files[0] !== undefined) {
      setFile(e.target.files[0]);
      const fileType = e.target.files[0].name.split('.').pop();
      if (fileType !== 'txt') {
        setFileTypeError(fileType);
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
        setFileTypeError('');
      }
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    formData.append('movies', file, 'movies.txt');
    dispatch(movieOperator.importFilms(formData));
    setFile('');
    setIsDisabled(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <h2 className={s.title}>Or you can dowload .txt file</h2>
        <input
          className={s.file_input}
          type="file"
          id="file"
          onChange={e => handleChange(e)}
        />
        <label htmlFor="file" className={s.file_label}>
          Download your file
        </label>
        {file && <p className={s.file_name}>{file.name}</p>}
        {fileTypeError && (
          <p className={s.file_error}>
            Your file format is .{fileTypeError}, you can dowload only .txt
            files
          </p>
        )}
        <button type="submit" disabled={isDisabled} className={s.button}>
          Add films
        </button>
      </form>
    </>
  );
};

export default ImportMovies;
