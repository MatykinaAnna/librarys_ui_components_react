import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import {SimpleChoice} from '../components/SimpleChoice/simpleChoice';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/SimpleChoice',
  component: SimpleChoice,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
} satisfies Meta<typeof SimpleChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    array: [
        { label: 'Выбор_1' }, 
        { label: 'Выбор_2' }, 
        { label: 'Выбор_3' }, 
        { label: 'Выбор_4' }, 
        { label: 'Выбор_5' }, 
        { label: 'Выбор_6' }, 
        { label: 'Выбор_7' }, 
        { label: 'Выбор_8' }, 
        { label: 'Выбор_9' }, 
        { label: 'Выбор_10' }, 
        { label: 'Выбор_11' }, 
        { label: 'Выбор_12' }, 
        { label: 'Выбор_13' }, 
        { label: 'Выбор_14' }, 
        { label: 'Выбор_15' }, 
        { label: 'Выбор_16' }, 
    ]
  },
};