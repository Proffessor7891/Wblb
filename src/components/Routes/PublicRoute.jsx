import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectors } from '../../redux';

export default function PublicRoute({
  restricted = false,
  children,
  redirectTo = '/',
  ...routeProps
}) {
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
