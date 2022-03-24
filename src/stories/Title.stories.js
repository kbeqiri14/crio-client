import Title from '@ui-kit/General/Typography/Title';

const args = {
  code: 'Code style',
  copyable: 'Whether to be copyable',
  delete: 'Deleted line style',
  disabled: 'Disabled content',
  editable: 'If editable. Can control edit state when is object',
  ellipsis:
    "Display ellipsis when text overflows，can't configure expandable、rows and onExpand by using object",
  mark: 'Marked style',
  italic: 'Italic style',
  underline: 'Underlined style',
};

export default {
  component: Title,
  title: 'General/Typography/Title',
  argTypes: {
    level: {
      description: 'Set content importance',
      control: { type: 'radio', options: [1, 2] },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    ...Object.entries(args).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          description: value,
          table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
          },
        },
      }),
      {},
    ),
  },
};

const Template = (args) => <Title {...args} />;
const EllipsisTemplate = (args) => (
  <div style={{ width: 60 }}>
    <Title {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  level: 1,
  code: false,
  copyable: false,
  delete: false,
  disabled: false,
  editable: false,
  ellipsis: false,
  mark: false,
  italic: false,
  underline: false,
};

export const Level1 = Template.bind({});
Level1.args = {
  children: 'Level 1',
  level: 1,
};

export const Level2 = Template.bind({});
Level2.args = {
  children: 'Level 2',
  level: 2,
};

export const Code = Template.bind({});
Code.args = {
  level: 1,
  children: 'Code',
  code: true,
};

export const Copyable = Template.bind({});
Copyable.args = {
  level: 1,
  children: 'Copyable',
  copyable: true,
};

export const Delete = Template.bind({});
Delete.args = {
  level: 1,
  children: 'Delete',
  delete: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  level: 1,
  children: 'Disabled',
  disabled: true,
};

export const Editable = Template.bind({});
Editable.args = {
  level: 1,
  children: 'Editable',
  editable: true,
};

export const Ellipsis = EllipsisTemplate.bind({});
Ellipsis.args = {
  level: 1,
  children: 'Ellipsis',
  ellipsis: true,
};

export const Mark = Template.bind({});
Mark.args = {
  level: 1,
  children: 'Mark',
  mark: true,
};

export const Italic = Template.bind({});
Italic.args = {
  level: 1,
  children: 'Italic',
  italic: true,
};

export const Underline = Template.bind({});
Underline.args = {
  level: 1,
  children: 'Underline',
  underline: true,
};
