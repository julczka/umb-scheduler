import { Publication } from '../types/contentTypes';

export const ZOOM_IN_HOURS = 'ZOOM_IN_HOURS';
export const ZOOM_OUT_HOURS = 'ZOOM_OUT_HOURS';
export const ZOOM_IN_DAYS = 'ZOOM_IN_DAYS';
export const ZOOM_OUT_DAYS = 'ZOOM_OUT_DAYS';
export const SHIFT_SCALE_DAYS = 'SHIFT_SCALE_DAYS';
export const SHIFT_SCALE_HOURS = 'SHIFT_SCALE_HOURS';
export const CREATE_PUBLICATION = 'CREATE_PUBLICATION';

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

export const createPublication = (publication: Publication) => ({
  type: CREATE_PUBLICATION,
  publication,
});
