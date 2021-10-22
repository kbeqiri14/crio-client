import { useCurrentUser } from '@app/auth/hooks';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute } from '@app/routing/routes';

import Layout from '@shared/Layout';
import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import { Feed } from '@screens/Feed';
import CognitoCallback from '@screens/CognitoCallback';
import MyAccount from '@screens/Account';

export const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { user, loading } = useCurrentUser();
  const pathName = useLocation();

  useEffect(() => {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathName]);

  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(!!user);
    }
  }, [user, loading]);

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <Layout>
      <Switch>
        {/* PUBLIC ROUTES */}
        <Route exact path='/'>
          {isAuthenticated ? <Feed /> : <LandingPage />}
        </Route>
        <Route exact path='/pricing' component={PricingPlans} />
        {!loading && !user && <Redirect to='/' />}
        {/* PRIVATE ROUTES */}
        <PrivateRoute isAuthenticated={isAuthenticated} path='/account' component={MyAccount} />
        <PrivateRoute isAuthenticated={isAuthenticated} path='/profile' component={null} />
        <Route exact path='/cognito/callback' component={CognitoCallback} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
