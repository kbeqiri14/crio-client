import { useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { isFuture } from 'date-fns';
import { useLazyQuery, useReactiveVar } from '@apollo/client';

import { signupErrorVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { useCurrentUser } from '@app/auth/hooks';
import { PrivateRoute } from '@app/routing/routes';
import { me } from '@app/graphql/queries/users.query';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import Header from '@shared/Header';
import { PresentationView } from '@shared/PresentationView';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import PrivacyPolicy from '@screens/Terms and Policy/PrivacyPolicy';
import TermsAndConditions from '@screens/Terms and Policy/TermsAndConditions';
import TermsOfUse from '@screens/Terms and Policy/TermsOfUse';
import LandingPage from '@screens/LandingPage';
import { PricingPlans } from '@screens/PricingPlans';
import { Feed } from '@screens/Feed';
import CognitoCallback from '@screens/CognitoCallback';
import Account from '@screens/Account';
import Profile from '@screens/Profile';
import Artwork from '@screens/Artwork';
import Upload from '@screens/Upload';
import Video from '@screens/Video';

export const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { user, loading } = useCurrentUser();
  const { dispatchUser, user: crioUser } = useLoggedInUser();
  const { isVisible } = usePresentation();
  const { pathname } = useLocation();
  const signupError = useReactiveVar(signupErrorVar);
  const authenticated = useMemo(
    () => !!user?.attributes?.email && (!signupError || localStorage.getItem('user')),
    [signupError, user?.attributes?.email],
  );

  const [getLoggedInUser] = useLazyQuery(me, {
    onCompleted: (data) => {
      if (data?.me) {
        localStorage.setItem('user', true);
        const periodEnd = data.me.payment?.periodEnd;
        dispatchUser({
          ...data.me,
          isFan: !data.me.isCreator,
          isSubscribed: data.me.payment?.subscriptionStatus === 'active',
          subscribePeriodIsValid: periodEnd ? isFuture(new Date(periodEnd)) : false,
        });
      }
    },
    onError: (data) => console.log(data, 'error'),
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    document.body.scrollTop = 0;
    document.querySelector('.crio-container')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(authenticated);
    }
  }, [authenticated, loading]);

  useEffect(() => {
    if (authenticated) {
      getLoggedInUser();
    }
  }, [authenticated, getLoggedInUser]);

  useEffect(() => {
    let timeout;
    if (
      crioUser &&
      crioUser.isFan &&
      (!crioUser.isSubscribed ||
        !crioUser.subscribePeriodIsValid ||
        crioUser?.payment?.subscriptionCancel)
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
  }, [crioUser, getLoggedInUser, user?.payment?.subscriptionCancel]);

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <div className='crio-container'>
      <header>
        <Header isAuthenticated={isAuthenticated} />
      </header>
      <main>
        <Switch>
          {/* PUBLIC ROUTES */}
          <Route exact path='/'>
            {isAuthenticated ? <Feed /> : <LandingPage />}
          </Route>
          <Route exact path='/privacy-policy'>
            <PrivacyPolicy />
          </Route>
          <Route exact path='/terms-and-conditions'>
            <TermsAndConditions />
          </Route>
          <Route exact path='/terms-of-use'>
            <TermsOfUse />
          </Route>
          <Route exact path='/pricing/:id?' component={PricingPlans} />
          <Route exact path='/profile/:username' component={Profile} />
          <Route exact path='/artwork/:artworkId' component={Artwork} />
          {!loading && !user && <Redirect to='/' />}
          {/* PRIVATE ROUTES */}
          <PrivateRoute isAuthenticated={isAuthenticated} path='/account' component={Account} />
          <PrivateRoute isAuthenticated={isAuthenticated} path='/upload' component={Upload} />
          <PrivateRoute isAuthenticated={isAuthenticated} path='/video' component={Video} />
          <Route exact path='/cognito/callback' component={CognitoCallback} />
        </Switch>
        {isVisible && <PresentationView />}
      </main>
    </div>
  );
};

export default AppRoutes;
