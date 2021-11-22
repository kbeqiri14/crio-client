import { memo } from 'react';

import Header from '@shared/Header';
import './styles.less';

export const Layout = ({ children, isAuthenticated }) => {
  return (
    <div className='crio-app-container'>
      <Header isAuthenticated={isAuthenticated} />
      <main className='crio-app-content'>{children}</main>
    </div>
  );
};

export default memo(Layout);
