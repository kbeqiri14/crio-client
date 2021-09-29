import { Route, Switch } from 'react-router-dom';
import LandingPage from '../components/screens/LandingPage';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route component={LandingPage} path='/' exact />
    </Switch>
  );
};
