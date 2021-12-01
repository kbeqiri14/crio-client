import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { isFuture } from 'date-fns';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { useCurrentUser } from '@app/auth/hooks';
import { PrivateRoute } from '@app/routing/routes';
import { me } from '@app/graphql/queries/users.query';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import Header from '@shared/Header';
import { PresentationView, usePresentation } from '@shared/PresentationView';
import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import { Feed } from '@screens/Feed';
import CognitoCallback from '@screens/CognitoCallback';
import Account from '@screens/Account';
import Profile from '@screens/Profile';
import Upload from '@screens/Upload';

export const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { user, loading } = useCurrentUser();
  const { dispatchUser, user: crioUser } = useLoggedInUser();
  const { videoInfo, isVisible } = usePresentation();
  const { pathname } = useLocation();

  const [getLoggedInUser] = useLazyQuery(me, {
    onCompleted: (data) => {
      let userInfo;
      if (data?.me) {
        userInfo = { ...data.me };
        userInfo.isFan = !userInfo.isCreator;
        userInfo.isSubscribed = userInfo.payment?.subscriptionStatus === 'active';
        const periodEnd = userInfo.payment?.periodEnd;
        userInfo.subscribePeriodIsValid = periodEnd ? isFuture(new Date(periodEnd)) : false;
      }
      dispatchUser(userInfo);
    },
    onError: (data) => console.log(data, 'error'),
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(!!user);
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      getLoggedInUser();
    }
  }, [getLoggedInUser, loading, user]);

  useEffect(() => {
    let timeout;
    if (
      crioUser &&
      crioUser.isFan &&
      (!crioUser.isSubscribed || !crioUser.subscribePeriodIsValid)
    ) {
      if (timeout) {
        clearInterval(timeout);
      }
      timeout = setInterval(() => getLoggedInUser(), 30000); // once in 30 seconds
    }
    return () => {
      if (timeout) {
        clearInterval(timeout);
      }
    };
  }, [crioUser, getLoggedInUser]);

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <div className='crio-app-container'>
      <Header isAuthenticated={isAuthenticated} />
      <main className='crio-app-content'>
        <Switch>
          {/* PUBLIC ROUTES */}
          <Route exact path='/'>
            {isAuthenticated ? <Feed /> : <LandingPage />}
          </Route>
          <Route path='/pricing/:id?' component={PricingPlans} />
          {!loading && !user && <Redirect to='/' />}
          {/* PRIVATE ROUTES */}
          <PrivateRoute isAuthenticated={isAuthenticated} path='/account' component={Account} />
          <PrivateRoute isAuthenticated={isAuthenticated} path='/profile' component={Profile} />
          <PrivateRoute isAuthenticated={isAuthenticated} path='/upload' component={Upload} />
          <Route exact path='/cognito/callback' component={CognitoCallback} />
        </Switch>
        {isVisible && (
          <PresentationView
            visible={isVisible}
            videoInfo={videoInfo}
            isAuthenticated={isAuthenticated}
          />
        )}
      </main>
    </div>
  );
};

export default AppRoutes;
