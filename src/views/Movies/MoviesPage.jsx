import ImportMovies from '../../components/ImportMovies/ImportMovies';
import MoviesMain from '../../components/MoviesMain/MoviesMain';
import MoviesForm from '../../components/MoviesForm/MoviesForm';
import styles from './moviesPage.module.scss';

const FilmsView = () => {
  return (
    <>
    <MoviesMain />
      <section className={styles.add_section}>
        <MoviesForm />
        <ImportMovies />
      </section>
    </>
  );
};
export default FilmsView;
