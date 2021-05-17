import { AnyAction } from 'redux';
import { SchedulerState } from '../SchedulerState.js';

const currentMonthStartDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
);
const currentMonthendDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
);

const INITIAL_STATE = new SchedulerState(
  currentMonthStartDate,
  currentMonthendDate,
  [0, 100]
);

export const reducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
