import history from '@configs/history';
import { Router } from 'react-router-dom';

export const routerDecorator = (Story) => (
  <Router history={history}>
    <Story />
  </Router>
);
