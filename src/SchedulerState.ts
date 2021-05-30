import { MandatoryRange } from './types/appTypes';

export class SchedulerState implements SchedulerState {
  startDate: Date;

  endDate: Date;

  range: [number, number];

  mandatoryRanges: MandatoryRange[];

  clipboardDate: Date | null;

  constructor(
    startDate: Date,
    endDate: Date,
    range: [number, number],
    mandatoryRanges: MandatoryRange[],
    clipboardDate: Date | null,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.range = range;
    this.mandatoryRanges = mandatoryRanges;
    this.clipboardDate = clipboardDate;
  }
}
