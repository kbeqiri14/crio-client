import { Route } from 'react-router-dom';

// TODO: Refactor once Auth is setup
export const PrivateRoute = ({ render, ...props }) => <Route render={render} {...props} />;
