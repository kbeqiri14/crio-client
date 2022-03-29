import Text from '@ui-kit/General/Typography/Text';

const args = {
  code: 'Code style',
  copyable: 'Whether to be copyable',
  delete: 'Deleted line style',
  disabled: 'Disabled content',
  editable: 'If editable. Can control edit state when is object',
  ellipsis:
    "Display ellipsis when text overflows，can't configure expandable、rows and onExpand by using object",
  keyboard: 'Keyboard style',
  mark: 'Marked style',
  strong: 'Bold style',
  italic: 'Italic style',
  underline: 'Underlined style',
};

export default {
  component: Text,
  title: 'General/Typography/Text',
  argTypes: {
    level: {
      description: 'Set content importance',
      control: { type: 'radio', options: [1, 2, 3, 4] },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 2 },
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

const Template = (args) => <Text {...args} />;
const EllipsisTemplate = (args) => (
  <div style={{ width: 40 }}>
    <Text {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  level: 2,
  code: false,
  copyable: false,
  delete: false,
  disabled: false,
  editable: false,
  ellipsis: false,
  keyboard: false,
  mark: false,
  strong: false,
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

export const Level3 = Template.bind({});
Level3.args = {
  children: 'Level 3',
  level: 3,
};

export const Level4 = Template.bind({});
Level4.args = {
  children: 'Level 4',
  level: 4,
};

export const Code = Template.bind({});
Code.args = {
  level: 2,
  children: 'Code',
  code: true,
};

export const Copyable = Template.bind({});
Copyable.args = {
  level: 2,
  children: 'Copyable',
  copyable: true,
};

export const Delete = Template.bind({});
Delete.args = {
  level: 2,
  children: 'Delete',
  delete: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  level: 2,
  children: 'Disabled',
  disabled: true,
};

export const Editable = Template.bind({});
Editable.args = {
  level: 2,
  children: 'Editable',
  editable: true,
};

export const Ellipsis = EllipsisTemplate.bind({});
Ellipsis.args = {
  level: 2,
  children: 'Ellipsis',
  ellipsis: true,
};

export const Keyboard = Template.bind({});
Keyboard.args = {
  level: 2,
  children: 'Keyboard',
  keyboard: true,
};

export const Mark = Template.bind({});
Mark.args = {
  level: 2,
  children: 'Mark',
  mark: true,
};

export const Strong = Template.bind({});
Strong.args = {
  level: 2,
  children: 'Strong',
  strong: true,
};

export const Italic = Template.bind({});
Italic.args = {
  level: 2,
  children: 'Italic',
  italic: true,
};

export const Underline = Template.bind({});
Underline.args = {
  level: 2,
  children: 'Underline',
  underline: true,
};
