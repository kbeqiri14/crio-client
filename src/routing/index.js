import { Route, Switch } from 'react-router-dom';
import LandingPage from '@screens/LandingPage';
import CognitoCallback from '@root/src/components/screens/CognitoCallback';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route component={LandingPage} path='/' exact />
      <Route component={CognitoCallback} path='/cognito/callback' exact />
    </Switch>
  );
};

export default AppRoutes;
