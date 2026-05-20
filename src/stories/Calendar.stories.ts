import type { Meta, StoryObj, Description  } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import Calendar from '../components/Calendar/calendar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Calendar',
  component: Calendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { toSelectDate: fn() },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

let selectedDate = new Date()
export const Primary: Story = {
  args: {
    selectedDate: selectedDate,
    year: selectedDate.getFullYear(),
  },
};