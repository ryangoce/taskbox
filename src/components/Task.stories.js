
import Task from './Task.vue';

import { action } from '@storybook/addon-actions';


import { userEvent, waitFor, within, fireEvent } from '@storybook/testing-library';

import { expect } from '@storybook/jest';

export default {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
  //👇 Our events will be mapped in Storybook UI
  argTypes: {
    onPinTask: {},
    onArchiveTask: {},
  },
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onPinTask: action('pin-task'),
  onArchiveTask: action('archive-task'),
};

export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task 2',
      state: 'TASK_INBOX',
    },
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByLabelText('Test Task 2')

    await expect(element).toBeVisible()
  }
};

export const Pinned = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    },
  }
};

export const Archived = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    },
  },
};
