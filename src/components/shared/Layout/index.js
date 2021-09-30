import Header from '../Header';
import './styles.less';

export const Layout = ({ children }) => {
  return (
    <div className='crio-app-container'>
      <Header />
      <main className='crio-app-content'>{children}</main>
    </div>
  );
};

export default Layout;
