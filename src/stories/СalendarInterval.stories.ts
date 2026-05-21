import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import СalendarInterval from '../components/СalendarInterval/calendarInterval';

const meta = {
  title: 'Example/СalendarInterval',
  component: СalendarInterval,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { 
    toSelectDateStart: fn(),
    toSelectDateEnd: fn()
  },
} satisfies Meta<typeof СalendarInterval>;

export default meta;
type Story = StoryObj<typeof meta>;

let dateStart = new Date()
dateStart.setDate(1)
let d = new Date()
let dateEnd = new Date(d.setMonth(dateStart.getMonth()+1))
let year = dateStart.getFullYear()

export const simpleСalendarIntervals: Story = {
  args: {
    selectedDateStart: dateStart,
    selectedDateEnd: dateEnd,
    year: year,
  }
};