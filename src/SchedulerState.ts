import { MandatoryRange } from './types/appTypes';

export class SchedulerState implements SchedulerState {
  startDate: Date;

  endDate: Date;

  range: [number, number];

  mandatoryRanges: MandatoryRange[];

  constructor(
    startDate: Date,
    endDate: Date,
    range: [number, number],
    mandatoryRanges: MandatoryRange[],
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.range = range;
    this.mandatoryRanges = mandatoryRanges;
  }
}
