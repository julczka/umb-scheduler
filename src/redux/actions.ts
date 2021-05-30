import { MandatoryRange } from '../types/appTypes';
import { Publication } from '../types/contentTypes';

export const ZOOM_IN_HOURS = 'ZOOM_IN_HOURS';
export const ZOOM_OUT_HOURS = 'ZOOM_OUT_HOURS';
export const ZOOM_IN_DAYS = 'ZOOM_IN_DAYS';
export const ZOOM_OUT_DAYS = 'ZOOM_OUT_DAYS';
export const SHIFT_SCALE_DAYS = 'SHIFT_SCALE_DAYS';
export const SHIFT_SCALE_HOURS = 'SHIFT_SCALE_HOURS';
export const CREATE_PUBLICATION = 'CREATE_PUBLICATION';
export const UPDATE_PUBLICATION = 'UPDATE_PUBLICATION';
export const REMOVE_PUBLICATION = 'REMOVE_PUBLICATION';
export const SHOW_TODAY = 'SHOW_TODAY';
export const RESET_STATE = 'RESET_STATE';
export const CREATE_MANDATORY_RANGE = 'CREATE_MANDATORY_RANGE';
export const UPDATE_MANDATORY_RANGE = 'UPDATE_MANDATORY_RANGE';
export const CLEAR_RANGES_AFTER_DATE = 'CLEAR_RANGES_AFTER_DATE';
export const REMOVE_MANDATORY_RANGE = 'REMOVE_MANDATORY_RANGE';
export const COPY_DATE = 'COPY_DATE';

export const zoomInHours = () => ({
  type: ZOOM_IN_HOURS,
});

export const zoomOutHours = () => ({
  type: ZOOM_OUT_HOURS,
});

export const zoomInDays = () => ({
  type: ZOOM_IN_DAYS,
});

export const zoomOutDays = () => ({
  type: ZOOM_OUT_DAYS,
});

export const shiftScaleDays = (days: number) => ({
  type: SHIFT_SCALE_DAYS,
  days,
});

export const shiftScaleHours = (hours: number) => ({
  type: SHIFT_SCALE_HOURS,
  hours,
});

export const showToday = () => ({
  type: SHOW_TODAY,
});

export const createPublication = (publication: Publication) => ({
  type: CREATE_PUBLICATION,
  publication,
});

export const updatePublication = (
  publicationId: string,
  publication: Publication,
) => ({
  type: UPDATE_PUBLICATION,
  publicationId,
  publication,
});

export const removePublication = (publicationId: string) => ({
  type: REMOVE_PUBLICATION,
  publicationId,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const createMandatoryRange = (mandatoryRange: MandatoryRange) => ({
  type: CREATE_MANDATORY_RANGE,
  mandatoryRange,
});

export const removeMandatoryRange = (mandatoryRangeId: string) => ({
  type: REMOVE_MANDATORY_RANGE,
  mandatoryRangeId,
});

export const updateMandatoryRange = (
  mandatoryRangeId: string,
  mandatoryRange: MandatoryRange,
) => ({
  type: UPDATE_MANDATORY_RANGE,
  mandatoryRangeId,
  mandatoryRange,
});

export const clearRangesAfterDate = (start: Date) => ({
  type: CLEAR_RANGES_AFTER_DATE,
  start,
});

export const copyDate = (date: Date) => ({ type: COPY_DATE, date });
