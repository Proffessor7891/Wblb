import { NavLink } from 'react-router-dom';
import s from './homePage.module.scss';

const HomeView = () => {
  return (
    <div className={s.section}>
      <h1>Hello!</h1>
      <p>
        you need to sign up or login
      </p>
      <NavLink to="/register" exact className={s.link}>
        Sign up
      </NavLink>
      <NavLink to="/login" exact className={s.link}>
        Sign in
      </NavLink>
    </div>
  );
};

export default HomeView;
