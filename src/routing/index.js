import { Route, Switch } from 'react-router-dom';
import LandingPage from '@screens/LandingPage';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route component={LandingPage} path='/' exact />
    </Switch>
  );
};

export default AppRoutes;
