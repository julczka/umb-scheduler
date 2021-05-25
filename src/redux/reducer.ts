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
  CREATE_PUBLICATION,
  UPDATE_PUBLICATION,
  REMOVE_PUBLICATION,
} from './actions.js';
import { Page, pageInitialState } from '../Page';
import { Variant1, Variant2 } from '../Variant';

const currentMonthStartDate = new Date(addDays(new Date(), 14));
const currentMonthendDate = new Date(addDays(new Date(), -14));

export interface AppState {
  scheduler: SchedulerState;
  page: Page;
}

pageInitialState.variants = [Variant1, Variant2];

const INITIAL_STATE = {
  scheduler: new SchedulerState(currentMonthStartDate, currentMonthendDate, [
    0,
    100,
  ]),
  page: pageInitialState,
};

export const reducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ZOOM_IN_HOURS: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: addHours(state.scheduler.startDate, 1),
          endDate: addHours(state.scheduler.endDate, -1),
        },
      };
    }

    case ZOOM_OUT_HOURS: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: addHours(state.scheduler.startDate, -1),
          endDate: addHours(state.scheduler.endDate, 1),
        },
      };
    }

    case ZOOM_IN_DAYS: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: addDays(state.scheduler.startDate, 1),
          endDate: addDays(state.scheduler.endDate, -1),
        },
      };
    }

    case ZOOM_OUT_DAYS: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: addDays(state.scheduler.startDate, -1),
          endDate: addDays(state.scheduler.endDate, 1),
        },
      };
    }

    case SHIFT_SCALE_DAYS: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: addDays(state.scheduler.startDate, action.days),
          endDate: addDays(state.scheduler.endDate, action.days),
        },
      };
    }

    case SHIFT_SCALE_HOURS: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: addHours(state.scheduler.startDate, action.hours),
          endDate: addHours(state.scheduler.endDate, action.hours),
        },
      };
    }

    case CREATE_PUBLICATION: {
      console.log(action.type);
      return {
        ...state,
        page: {
          ...state.page,
          publications: [...state.page.publications, action.publication],
        },
      };
    }

    case UPDATE_PUBLICATION: {
      console.log(action.type);
      return {
        ...state,
        page: {
          ...state.page,
          publications: state.page.publications.map(publication =>
            publication.id === action.publicationId
              ? action.publication
              : publication,
          ),
        },
      };
    }

    case REMOVE_PUBLICATION: {
      console.log(action.type);
      return {
        ...state,
        page: {
          ...state.page,
          publications: state.page.publications.filter(
            publication => publication.id !== action.publicationId,
          ),
        },
      };
    }

    default:
      return state;
  }
};

const getStartDate = (state: AppState) => state.scheduler.startDate;
const getEndDate = (state: AppState) => state.scheduler.endDate;
const getRange = (state: AppState) => state.scheduler.range;

export const getVariantbyId = (state: AppState, variantId: string) =>
  state.page.variants.find(variant => variant.id === variantId);

export const getVersionbyId = (
  state: AppState,
  variantId: string,
  versionId: string,
) =>
  state.page.variants
    .find(variant => variant.id === variantId)
    ?.versions.find(version => version.id === versionId);

const getStartDateValue = (state: AppState) =>
  state.scheduler.startDate.valueOf();

const getEndDateValue = (state: AppState) => state.scheduler.endDate.valueOf();

export const getVariants = (state: AppState) => state.page.variants;

export const getVariantsSelector = createSelector([getVariants], variants => [
  ...variants,
]);

export const timeScaleDomain = createSelector(
  getStartDate,
  getEndDate,
  (startDate, endDate) => [startDate, endDate],
);

export const reverseScaleRange = createSelector(
  getStartDateValue,
  getEndDateValue,
  (startDateValue, endDateValue) => [startDateValue, endDateValue],
);

export const scaleSelector = createSelector(
  [getRange, timeScaleDomain],
  (range, domain) => createScale(domain, range),
);

export const reversedScaleSelector = createSelector(
  [getRange, reverseScaleRange],
  (range, domain) => createReverseScale(range, domain),
);

export const scaleRangeSelector = createSelector(
  getStartDate,
  getEndDate,
  (startDate, endDate) => deltaDatesRange(startDate, endDate),
);
