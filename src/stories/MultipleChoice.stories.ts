import type { Meta, StoryObj, Description  } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import MultipleChoice from '../components/MultipleChoice/multipleСhoice';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/MultipleChoice',
  component: MultipleChoice,
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
  args: { onChange: fn() },
} satisfies Meta<typeof MultipleChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

const arrayDepartment  = [
    {
        "id": 15,
        "name": "Отдел 1.1",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 18,
        "name": "Отдел 1.2",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 20,
        "name": "Отдел 1.3",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 24,
        "name": "Отдел 1.4",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 34,
        "name": "Отдел 1.5",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 37,
        "name": "Отдел 1.6",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 42,
        "name": "Отдел 1.7",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 43,
        "name": "Отдел 1.8",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 46,
        "name": "Отдел 1.9",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 100,
        "name": "Отдел 1.10",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 153,
        "name": "Отдел 1.11",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 154,
        "name": "Отдел 1.12",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 157,
        "name": "Отдел 1.13",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 158,
        "name": "Отдел 1.14",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 200,
        "name": "Отдел 1.15",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 201,
        "name": "Отдел 1.16",
        "parrentId": 1,
        "parrentName": "Глава 1",
        "check": false
    },
    {
        "id": 8,
        "name": "Отдел 2.1",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 28,
        "name": "Отдел 2.2",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 32,
        "name": "Отдел 2.3",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 35,
        "name": "Отдел 2.4",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 39,
        "name": "Отдел 2.5",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 47,
        "name": "Отдел 2.6",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 48,
        "name": "Отдел 2.7",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 53,
        "name": "Отдел 2.8",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 152,
        "name": "Отдел 2.9",
        "parrentId": 2,
        "parrentName": "Глава 2",
        "check": false
    },
    {
        "id": 1,
        "name": "Отдел 3.1",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 2,
        "name": "Отдел 3.2",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 3,
        "name": "Отдел 3.3",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 4,
        "name": "Отдел 3.4",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 5,
        "name": "Отдел 3.5",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 10,
        "name": "Отдел 3.6",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 11,
        "name": "Отдел 3.7",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 14,
        "name": "Отдел 3.8",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 19,
        "name": "Отдел 3.9",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 21,
        "name": "Отдел 3.10",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 57,
        "name": "Отдел 3.11",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 160,
        "name": "Отдел 3.12",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 205,
        "name": "Отдел 3.13",
        "parrentId": 4,
        "parrentName": "Глава 3",
        "check": false
    },
    {
        "id": 159,
        "name": "Отдел 4.1",
        "parrentId": 5,
        "parrentName": "Глава 4",
        "check": false
    },
    {
        "id": 203,
        "name": "Отдел 5.1",
        "parrentId": 6,
        "parrentName": "Глава 5",
        "check": false
    },
    {
        "id": 204,
        "name": "Отдел 5.2",
        "parrentId": 6,
        "parrentName": "Глава 5",
        "check": false
    }
]

export const Primary: Story = {
  args: {
        placeholder: 'Поиск',
        autoChosen: [-1],
        list: arrayDepartment,
        isChoosingAll: true,
        isChoosingAllValue: false,
        open: true,
        errorText: 'Выберите хотя бы один филиал для отображения полей',
  },
};