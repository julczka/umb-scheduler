import type { ScaleLinear, ScaleTime } from 'd3-scale';

export interface Miliseconds {
  HOUR: number;
  DAY: number;
  WEEK: number;
  TWO_WEEKS: number;
  MONTH: number;
  QUATER: number;
  HALF_YEAR: number;
  YEAR: number;
}

export type ScaleRange = keyof Miliseconds;

export interface MandatoryRange {
  start: Date | null;
  end: Date | null;
  id: string;
}

export interface SchedulerState {
  startDate: Date;
  endDate: Date;
  domain: [Date, Date];
  range: [number, number];
  scale: ScaleTime<number, number, never>;
  inverseScale: ScaleLinear<number, number, never>;
  scaleRange: ScaleRange;
  mandatoryRanges: MandatoryRange[];
  clipboardDate: Date | null;
}
