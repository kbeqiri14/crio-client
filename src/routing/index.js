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
import SendEmailModal from '@root/src/components/shared/SendEmailModal';
import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import PrivacyPolicy from '@screens/Terms and Policy/PrivacyPolicy';
import TermsAndConditions from '@screens/Terms and Policy/TermsAndConditions';
import TermsOfUse from '@screens/Terms and Policy/TermsOfUse';
import ExplorePage from '@screens/ExplorePage';
import PricingPlans from '@screens/PricingPlans';
import CognitoCallback from '@screens/CognitoCallback';
import Profile from '@screens/Profile';
import Artwork from '@screens/Artwork';
import Product from '@screens/Product';
import UploadProduct from '@screens/UploadProduct';
import Upload from '@screens/Upload';
import EditArtwork from '@screens/Video';
import EditProduct from '@screens/EditProduct';

export const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { user, loading } = useCurrentUser();
  const { dispatchUser, user: crioUser } = useLoggedInUser();
  const { isVisible } = usePresentation();
  const { visible } = useSendEmail();
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

  useEffect(
    () => document.querySelector('.main')?.scrollIntoView({ behavior: 'auto' }, 500),
    [pathname],
  );

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
      (!crioUser?.isSubscribed ||
        !crioUser?.subscribePeriodIsValid ||
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
        <div className='main'>
          <Switch>
            {/* PUBLIC ROUTES */}
            <Route exact path='/' component={ExplorePage} />
            <Route exact path='/artworks' component={ExplorePage} />
            <Route exact path='/privacy-policy' component={PrivacyPolicy} />
            <Route exact path='/terms-and-conditions' component={TermsAndConditions} />
            <Route exact path='/terms-of-use' component={TermsOfUse} />
            <Route exact path='/pricing/:id?' component={PricingPlans} />
            <Route exact path='/profile/:username' component={Profile} />
            <Route exact path='/profile/artworks/:username' component={Profile} />
            <Route exact path='/artwork/:artworkId' component={Artwork} />
            <Route exact path='/product/:productId' component={Product} />
            <Route exact path='/cognito/callback' component={CognitoCallback} />
            {!loading && !user && <Redirect to='/' />}
            {/* PRIVATE ROUTES */}
            <PrivateRoute
              exact
              isAuthenticated={isAuthenticated}
              path='/upload'
              component={UploadProduct}
            />
            <PrivateRoute
              exact
              isAuthenticated={isAuthenticated}
              path='/upload/artwork'
              component={Upload}
            />
            <PrivateRoute
              exact
              isAuthenticated={isAuthenticated}
              path='/edit-artwork'
              component={EditArtwork}
            />
            <PrivateRoute
              exact
              isAuthenticated={isAuthenticated}
              path='/edit-product'
              component={EditProduct}
            />
          </Switch>
          {isVisible && <PresentationView />}
          {visible && <SendEmailModal />}
        </div>
      </main>
    </div>
  );
};

export default AppRoutes;
