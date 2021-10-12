import { SecondaryButton } from '@ui-kit/Button';

export default {
  component: SecondaryButton,
  title: 'Button',
};

const Template = (args) => <SecondaryButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Sign Up',
  disabled: false,
  filled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  filled: false,
  fillColor: 'secondary',
};
