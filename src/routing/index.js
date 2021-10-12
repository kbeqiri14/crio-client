import { Route, Switch } from 'react-router-dom';

import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import CognitoCallback from '@screens/CognitoCallback';
import CreatorProfile from '@screens/Profiles/Creator';

export const AppRoutes = () => {
  return (
    <Switch>
        <Route path='/pricing' component={PricingPlans} />
        <Route path='/cognito/callback' component={CognitoCallback} />
        <Route path='/profile' component={CreatorProfile} />
        <Route exact path='/' component={LandingPage} />
    </Switch>
  );
}

export default AppRoutes;
