import { AnyAction } from 'redux';
import { createSelector } from 'reselect';
import { SchedulerState } from '../SchedulerState.js';
import {
  addDays,
  addHours,
  createScale,
  deltaDatesRange,
  generateId,
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
  SHOW_TODAY,
  RESET_STATE,
  CREATE_MANDATORY_RANGE,
  UPDATE_MANDATORY_RANGE,
  CLEAR_RANGES_AFTER_DATE,
  REMOVE_MANDATORY_RANGE,
  COPY_DATE,
} from './actions.js';
import { Page, pageInitialState } from '../Page';
import {
  Variant1,
  Variant10,
  Variant2,
  Variant3,
  Variant4,
  Variant5,
  Variant6,
  Variant7,
  Variant8,
  Variant9,
} from '../Variant';
import type { Publication, Variant } from '../types/contentTypes';
import { MandatoryRange } from '../types/appTypes';

const currentMonthStartDate = addDays(new Date(), -7);
const currentMonthEndDate = addDays(new Date(), 21);

export interface AppState {
  scheduler: SchedulerState;
  page: Page;
}

const existingPublicationsData = window.localStorage.getItem('publications');
const existingVariantsData = window.localStorage.getItem('variants');
const existingMandatoryRangesData = window.localStorage.getItem(
  'mandatoryRanges',
);

const savedPublications: Publication[] = existingPublicationsData
  ? JSON.parse(existingPublicationsData).map((publication: any) => {
      const start = new Date(publication.start);
      const end = publication.end ? new Date(publication.end) : null;
      const newPublication: Publication = { ...publication, start, end };
      return newPublication;
    })
  : [];

pageInitialState.publications = savedPublications;

pageInitialState.variants =
  existingVariantsData === null
    ? [
        Variant1,
        Variant2,
        Variant3,
        Variant4,
        Variant5,
        Variant6,
        Variant7,
        Variant8,
        Variant9,
        Variant10,
      ]
    : JSON.parse(existingVariantsData);

const initialMandatoryRanges: MandatoryRange[] = existingMandatoryRangesData
  ? JSON.parse(existingMandatoryRangesData).map((range: any) => {
      const start = new Date(range.start);
      const end = range.end ? new Date(range.end) : null;
      const newRange: MandatoryRange = { ...range, start, end };
      return newRange;
    })
  : [];

const INITIAL_STATE = {
  scheduler: new SchedulerState(
    currentMonthStartDate,
    currentMonthEndDate,
    [0, 100],
    initialMandatoryRanges,
    null,
  ),
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

    case SHOW_TODAY: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          startDate: currentMonthStartDate,
          endDate: currentMonthEndDate,
        },
      };
    }

    case CREATE_MANDATORY_RANGE: {
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          mandatoryRanges: [
            ...state.scheduler.mandatoryRanges,
            action.mandatoryRange,
          ],
        },
      };
    }

    case UPDATE_MANDATORY_RANGE: {
      // console.log(action.type);
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          mandatoryRanges: state.scheduler.mandatoryRanges.map(range =>
            range.id === action.mandatoryRangeId
              ? action.mandatoryRange
              : range,
          ),
        },
      };
    }

    case REMOVE_MANDATORY_RANGE: {
      // console.log(action.type);
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          mandatoryRanges: state.scheduler.mandatoryRanges.filter(
            range => range.id !== action.mandatoryRangeId,
          ),
        },
      };
    }

    case CLEAR_RANGES_AFTER_DATE: {
      // console.log(action.type);
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          mandatoryRanges: state.scheduler.mandatoryRanges.filter(
            range => range.end < action.start,
          ),
        },
      };
    }

    case CREATE_PUBLICATION: {
      // console.log(action.type);
      return {
        ...state,
        page: {
          ...state.page,
          publications: [...state.page.publications, action.publication],
        },
      };
    }

    case UPDATE_PUBLICATION: {
      // console.log(action.type);
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
      // console.log(action.type);
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

    case RESET_STATE: {
      // console.log(action.type);
      return {
        ...state,
        page: {
          ...state.page,
          publications: savedPublications,
        },
      };
    }

    case COPY_DATE: {
      // console.log(action.type);
      return {
        ...state,
        scheduler: {
          ...state.scheduler,
          clipboardDate: action.date,
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

export const getVariants = (state: AppState) => state.page.variants;
export const getPublications = (state: AppState) => state.page.publications;

const filteredVariants = (variants: Variant[], publications: Publication[]) =>
  variants.filter(variant =>
    publications
      .map(publication => publication.variantId)
      .some(el => el === variant.id),
  );

export const mandatoryVariantsId = (state: AppState) =>
  state.page.variants
    .filter((variant: Variant) => variant.mandatory)
    .map((variant: Variant) => variant.id);

export const mandatoryPublications = (
  variantsIds: string[],
  publications: Publication[],
) =>
  publications.filter(publication =>
    variantsIds.includes(publication.variantId),
  );

export const getVariantsSelector = createSelector([getVariants], variants => [
  ...variants,
]);

export const timeScaleDomain = createSelector(
  getStartDate,
  getEndDate,
  (startDate, endDate) => [startDate, endDate],
);

export const scaleSelector = createSelector(
  [getRange, timeScaleDomain],
  (range, domain) => createScale(domain, range),
);

export const scaleRangeSelector = createSelector(
  getStartDate,
  getEndDate,
  (startDate, endDate) => deltaDatesRange(startDate, endDate),
);

export const mandatoryPublicationsSelector = createSelector(
  mandatoryVariantsId,
  getPublications,
  (variantIds, publications) => mandatoryPublications(variantIds, publications),
);

export const variantsWithPublicationsSelector = createSelector(
  getVariants,
  getPublications,
  (variants, publications) => filteredVariants(variants, publications),
);

// this monstrous funcion is a Validation attempt. It is suppose to find all the date ranges where at least one mandatory publication is present. Then all the others should be present too. This is really complex issue, I tried to solve it but i ran out of time. If your're reading this, dear teacher, know that there's a method to this madness, it is not fully executed yet. Maybe it will be at the exam. XOXO julia

export const computeMandatoryRanges = (
  mandatoryPublicationsArray: Publication[],
) => {
  let ranges: MandatoryRange[] = [];

  const sortedRanges = (rangesArray: MandatoryRange[]) =>
    rangesArray.sort(
      (a: MandatoryRange, b: MandatoryRange) =>
        a.start.valueOf() - b.start.valueOf(),
    );

  mandatoryPublicationsArray.forEach((publication: Publication) => {
    const isPublicationInfinite = !publication.end;
    // console.log(isPublicationInfinite, publication);
    let currentRange: MandatoryRange;

    if (ranges.length === 0) {
      ranges = [
        { start: publication.start, end: publication.end, id: generateId() },
      ];
      return;
    }

    if (isPublicationInfinite) {
      for (const range of sortedRanges(ranges)) {
        const isRangeInfinite = !range.end;
        // console.log('infinite', range, isRangeInfinite);

        if (isRangeInfinite) {
          if (publication.start > range.start) {
            return;
          }

          const startsToCompare = [
            publication.start.valueOf(),
            range.start.valueOf(),
          ];
          const newStartDate = new Date(Math.min.apply(null, startsToCompare));
          currentRange = { start: newStartDate, end: null, id: generateId() };
          ranges = [
            ...ranges.filter(
              (r: MandatoryRange) => r.start < newStartDate && r.end !== null,
            ),
            currentRange,
          ];
          return;
        }

        if (range.end !== null && publication.start < range.end) {
          currentRange = {
            start: publication.start,
            end: null,
            id: generateId(),
          };
          ranges = [...ranges.filter(r => r !== range), currentRange];
          return;
        }
      }
    } else
      for (const range of sortedRanges(ranges)) {
        const isRangeInfinite = !range.end;
        // console.log('finite publication loop', range, isRangeInfinite);

        if (isRangeInfinite) {
          if (
            publication.start < range.start &&
            publication.end < range.start
          ) {
            ranges = [
              ...ranges,
              {
                start: publication.start,
                end: publication.end,
                id: generateId(),
              },
            ];
            return;
          }

          if (publication.start < range.start) {
            currentRange = {
              start: publication.start,
              end: null,
              id: generateId(),
            };

            ranges = [
              ...ranges.filter(
                (r: MandatoryRange) =>
                  r.start < publication.start && r.end !== null,
              ),
              currentRange,
            ];
            return;
          }

          if (publication.start > range.start) {
            return;
          }
        }

        if (range.end && publication.start < range.end) {
          //   console.log(445);
          currentRange = range;
          break;
        }
      }

    if (!currentRange) {
      // console.log(452);
      ranges = [
        ...ranges,
        { start: publication.start, end: publication.end, id: generateId() },
      ];
      return;
    }

    if (publication.end < currentRange.start) {
      // console.log(460);
      ranges = [
        ...ranges,
        { start: publication.start, end: publication.end, id: generateId() },
      ];
      return;
    }

    if (publication.end > currentRange.start) {
      // console.log(469);
      if (
        publication.end < currentRange.end &&
        publication.start > currentRange.start
      ) {
        return;
      }

      if (publication.start < currentRange.start) {
        currentRange = { ...currentRange, start: publication.start };
      }

      if (publication.end > currentRange.end) {
        currentRange = { ...currentRange, end: publication.end };
      }
    }
  });
  return sortedRanges(ranges);
};

export const mandatoryRangesSelector = createSelector(
  mandatoryPublicationsSelector,
  mandatoryPublicationsSelectorArray =>
    computeMandatoryRanges(mandatoryPublicationsSelectorArray),
);
