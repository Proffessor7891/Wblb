import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations } from '../../redux';
import styles from './loginPage.module.scss';

export default function LoginView() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <h2 className={styles.title}>Sign in </h2>
        <label className={styles.label}>
          Mail
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="email"
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <div className={styles.toggle_wrapper}>
          <label htmlFor="toggle-button">Show Password?</label>
          <input
            type="checkbox"
            id="toggle-button"
            className={styles.toggle_btn}
            value={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign in
        </button>
        <NavLink to="/register" className={styles.nav}>
          <p>or</p>
          <button className={styles.nav_btn}>Sign up</button>
        </NavLink>
      </form>
    </div>
  );
}
