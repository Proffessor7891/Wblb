import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectors } from '../../redux';

export default function PrivateRoute({
  children,
  redirectTo = '/login',
  ...routeProps
}) {
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
