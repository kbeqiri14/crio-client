import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { useCurrentUser } from '@app/auth/hooks';
import { PrivateRoute } from '@app/routing/routes';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { PresentationView, usePresentation } from '@shared/PresentationView';
import Layout from '@shared/Layout';

import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import { Feed } from '@screens/Feed';
import CognitoCallback from '@screens/CognitoCallback';
import CreatorProfile from '@screens/Profiles/Creator';

export const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { user, loading } = useCurrentUser();
  const { videoInfo, isVisible, hide } = usePresentation();
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
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path='/profile'
          component={CreatorProfile}
        />
        <Route exact path='/cognito/callback' component={CognitoCallback} />
      </Switch>
      <PresentationView onCancel={hide} videoInfo={videoInfo} visible={isVisible} />
    </Layout>
  );
};

export default AppRoutes;
