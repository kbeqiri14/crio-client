import Button from '@ui-kit/General/Button';
import { DownloadOutlined } from '@ant-design/icons';

export default {
  component: Button,
  title: 'General/Button',
  argTypes: {
    type: {
      description:
        'Can be set to <code>primary</code>&nbsp;&nbsp;&nbsp;<code>link</code>&nbsp;&nbsp;&nbsp;<code>default</code>',
      control: { type: 'radio', options: ['default', 'primary', 'link'] },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    fillColor: {
      description:
        'Can be set to <code>green</code>&nbsp;&nbsp;&nbsp;<code>blue</code>&nbsp;&nbsp;&nbsp;<code>pink</code> only for <code>primary</code> type',
      control: { type: 'radio', options: ['green', 'blue', 'pink'] },
      table: {
        type: { summary: 'string' },
      },
    },
    white: {
      description: 'Set the color of button for <code>link</code> and <code>default</code> types',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      description: 'Set the loading status of button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Disabled state of button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  white: false,
  loading: false,
  disabled: false,
};

export const PrimaryGreen = Template.bind({});
PrimaryGreen.args = {
  children: 'Green',
  type: 'primary',
  fillColor: 'green',
};

export const PrimaryBlue = Template.bind({});
PrimaryBlue.args = {
  children: 'Blue',
  type: 'primary',
  fillColor: 'blue',
};

export const PrimaryPink = Template.bind({});
PrimaryPink.args = {
  children: 'Pink',
  type: 'primary',
  fillColor: 'pink',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Download',
  icon: <DownloadOutlined />,
};

export const WhiteButton = Template.bind({});
WhiteButton.args = {
  children: 'White',
  white: true,
};
WhiteButton.parameters = {
  backgroundsColor: 'red',
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Loading',
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true,
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  children: 'Link',
  type: 'link',
};

export const WhiteLinkButton = Template.bind({});
WhiteLinkButton.args = {
  children: 'White',
  type: 'link',
  white: true,
};
