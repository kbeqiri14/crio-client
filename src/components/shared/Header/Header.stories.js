import { Header as HeaderComponent } from '@shared/Header';
import { routerDecorator } from '@utils/storybook.utils';
import '../../../styles/main.less';

export default {
  component: HeaderComponent,
  title: 'Header',
  decorators: [routerDecorator],
};

export const Header = () => <HeaderComponent />;
