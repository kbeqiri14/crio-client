import { Route, Switch } from 'react-router-dom';
import Layout from '@shared/Layout';
import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import CognitoCallback from '@screens/CognitoCallback';

export const AppRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/pricing' component={PricingPlans} />
        <Route path='/cognito/callback' component={CognitoCallback} />
        <Route exact path='/' component={LandingPage} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
