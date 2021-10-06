import { memo } from 'react';

import Header from '@shared/Header';
import './styles.less';

export const Layout = ({ children }) => {
  return (
    <div className='crio-app-container'>
      <Header />
      <main className='crio-app-content'>{children}</main>
    </div>
  );
};

export default memo(Layout);
