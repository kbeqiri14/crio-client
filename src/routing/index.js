import { Route, Switch } from 'react-router-dom';
import Layout from '@shared/Layout';
import LandingPage from '@screens/LandingPage';
import CognitoCallback from '@root/src/components/screens/CognitoCallback';

export const AppRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route component={LandingPage} path='/' exact />
        <Route component={CognitoCallback} path='/cognito/callback' exact />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
