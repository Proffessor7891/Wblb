import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations } from '../../redux';
import s from './registrationPage.module.scss';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState();
  const [validationError, setValidationError] = useState(false);

  const arePasswordsMatch = () => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
      setValidationError(false);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'confirmPassword':
        setValidationError(true);
        return setConfirmPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      authOperations.register({ name, email, password, confirmPassword }),
    );
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" className={s.form}>
        <h2 className={s.title}>Sign up</h2>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="name"
            required
          />
        </label>

        <label className={s.label}>
          Mail
          <input
            className={s.input}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="email"
            required
          />
        </label>
        <label className={s.label}>
          Password
          <input
            className={s.input}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <label className={s.label}>
          Confirm password
          <input
            className={s.input}
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            onKeyUp={arePasswordsMatch}
            required
          />
        </label>
        {!passwordsMatch && validationError && (
          <p className={s.error}>passwords don't match</p>
        )}
        <div className={s.toggle_wrapper}>
          <label htmlFor="toggle-button">Show Passwords?</label>
          <input
            type="checkbox"
            id="toggle-button"
            className={s.toggle_btn}
            value={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </div>
        <button type="submit" className={s.button}>
          Sign up
        </button>
        <NavLink to="/login" className={s.nav}>
          <p>or</p>
          <button className={s.nav_btn}>Sign in</button>
        </NavLink>
      </form>
    </div>
  );
}
