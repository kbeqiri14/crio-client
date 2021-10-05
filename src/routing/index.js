import { Route, Switch } from 'react-router-dom';
import Layout from '@shared/Layout';
import LandingPage from '@screens/LandingPage';

export const AppRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route component={LandingPage} path='/' exact />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
