import { useCurrentUser } from '@app/auth/hooks';
import history from '@configs/history';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PublicOnlyRoute } from '@app/routing/routes';
import { DEFAULT_PRIVATE_ROUTE, DEFAULT_PUBLIC_ROUTE } from '@configs/constants';
import Layout from '@shared/Layout';
import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import { Feed } from '@screens/Feed';
import CognitoCallback from '@screens/CognitoCallback';

export const AppRoutes = () => {
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!user) {
      history.push(DEFAULT_PUBLIC_ROUTE);
    }
  }, [user]);

  return (
    <Layout>
      <Switch>
        <Route path={DEFAULT_PRIVATE_ROUTE} component={Feed} />
        <PublicOnlyRoute path='/pricing' component={PricingPlans} />
        <PublicOnlyRoute path='/cognito/callback' component={CognitoCallback} />
        <PublicOnlyRoute exact path='/' component={LandingPage} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
