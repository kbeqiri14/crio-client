import { Redirect, Route } from 'react-router-dom';
import { useCurrentUser } from '@app/auth/hooks';
import { DEFAULT_PRIVATE_ROUTE, DEFAULT_PUBLIC_ROUTE } from '@configs/constants';

export const PrivateRoute = ({ component, ...props }) => {
  const { user, loading } = useCurrentUser();
  if (user) {
    return <Route component={component} {...props} />;
  }
  if (!loading && !user) {
    return <Redirect to={DEFAULT_PUBLIC_ROUTE} />;
  }
};

export const PublicOnlyRoute = ({ component, ...props }) => {
  const { user } = useCurrentUser();
  if (!user) {
    return <Route component={component} {...props} />;
  }
  return <Redirect to={DEFAULT_PRIVATE_ROUTE} />;
};
