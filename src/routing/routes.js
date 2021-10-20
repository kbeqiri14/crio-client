import { Redirect, Route } from 'react-router-dom';
import { DEFAULT_PRIVATE_ROUTE } from '@configs/constants';

export const PrivateRoute = ({ component, isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Route component={component} {...props} />;
  }

  return null;
};

export const PublicOnlyRoute = ({ component, isAuthenticated, ...props }) => {
  if (!isAuthenticated) {
    return <Route component={component} {...props} />;
  }
  return <Redirect to={DEFAULT_PRIVATE_ROUTE} />;
};
