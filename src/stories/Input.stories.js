import Input from '@ui-kit/DataEntry/Input';

export default {
  component: Input,
  title: 'Data Entry/Input',
  argTypes: {
    disabled: {
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    status: {
      description: 'Set validation status',
      control: { type: 'check', options: ['error'] },
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'placeholder',
  disabled: false,
};
