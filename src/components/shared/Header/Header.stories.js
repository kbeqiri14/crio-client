import Header from '@shared/Header';
import { routerDecorator } from '@utils/storybook.utils';
import '../../../styles/main.less';

export default {
  component: Header,
  title: 'Crio Header',
  decorators: [routerDecorator],
};

export const Default = () => <Header />;
