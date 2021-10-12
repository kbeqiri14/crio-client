import { Redirect, Route } from 'react-router-dom';
import { useCurrentUser } from '@app/auth/hooks';

export const PrivateRoute = ({ render, ...props }) => {
  const { user } = useCurrentUser();
  if (user) {
    return <Route render={render} {...props} />;
  }
  return <Redirect to='/' />;
};
