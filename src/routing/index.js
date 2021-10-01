import { Route, Switch } from 'react-router-dom';
import LandingPage from '@screens/LandingPage';
import CognitoCallbak from '@screens/CognitoCallbak';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route component={LandingPage} path='/' exact />
      <Route component={CognitoCallbak} path='/cognito/callback' exact />
    </Switch>
  );
};

export default AppRoutes;
