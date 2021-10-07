import { Route, Switch } from 'react-router-dom';
import LandingPage from '@screens/LandingPage';
import CognitoCallback from '@screens/CognitoCallback';
import CreatorProfile from '@screens/Profiles/Creator';
import FanProfile from '@screens/Profiles/Fan';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route component={LandingPage} path='/' exact />
      <Route component={CognitoCallback} path='/cognito/callback' exact />
      <Route component={CreatorProfile} path='/profile' exact />
      <Route component={FanProfile} path='/fan-profile' exact />
    </Switch>
  );
};

export default AppRoutes;
