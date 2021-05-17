import { AnyAction } from 'redux';
import { createSelector } from 'reselect';
import { SchedulerState } from '../SchedulerState.js';
import {
  addDays,
  addHours,
  createReverseScale,
  createScale,
  deltaDatesRange,
} from '../utils/utils.js';
import {
  ZOOM_OUT_HOURS,
  ZOOM_IN_HOURS,
  ZOOM_OUT_DAYS,
  ZOOM_IN_DAYS,
  SHIFT_SCALE_DAYS,
  SHIFT_SCALE_HOURS,
} from './actions.js';

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
    case ZOOM_IN_HOURS: {
      return {
        ...state,
        startDate: addHours(state.startDate, 1),
        endDate: addHours(state.endDate, -1),
      };
    }

    case ZOOM_OUT_HOURS: {
      return {
        ...state,
        startDate: addHours(state.startDate, -1),
        endDate: addHours(state.endDate, 1),
      };
    }

    case ZOOM_IN_DAYS: {
      return {
        ...state,
        startDate: addDays(state.startDate, 1),
        endDate: addDays(state.endDate, -1),
      };
    }

    case ZOOM_OUT_DAYS: {
      return {
        ...state,
        startDate: addDays(state.startDate, -1),
        endDate: addDays(state.endDate, 1),
      };
    }

    case SHIFT_SCALE_DAYS: {
      return {
        ...state,
        startDate: addDays(state.startDate, action.days),
        endDate: addDays(state.endDate, action.days),
      };
    }

    case SHIFT_SCALE_HOURS: {
      return {
        ...state,
        startDate: addHours(state.startDate, action.hours),
        endDate: addHours(state.endDate, action.hours),
      };
    }

    default:
      return state;
  }
};

const getStartDate = (state: SchedulerState) => state.startDate;
const getEndDate = (state: SchedulerState) => state.endDate;
const getRange = (state: SchedulerState) => state.range;

const getStartDateValue = (state: SchedulerState) => state.startDate.valueOf();
const getEndDateValue = (state: SchedulerState) => state.endDate.valueOf();

export const timeScaleDomain = createSelector(
  getStartDate,
  getEndDate,
  (startDate, endDate) => [startDate, endDate]
);

export const reverseScaleRange = createSelector(
  getStartDateValue,
  getEndDateValue,
  (startDateValue, endDateValue) => [startDateValue, endDateValue]
);

export const scaleSelector = createSelector(
  [getRange, timeScaleDomain],
  (range, domain) => createScale(domain, range)
);

export const reversedScaleSelector = createSelector(
  [getRange, reverseScaleRange],
  (range, domain) => createReverseScale(range, domain)
);

export const scaleRangeSelector = createSelector(
  getStartDate,
  getEndDate,
  (startDate, endDate) => deltaDatesRange(startDate, endDate)
);
