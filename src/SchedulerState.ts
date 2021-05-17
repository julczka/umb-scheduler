export class SchedulerState implements SchedulerState {
  startDate: Date;

  endDate: Date;

  range: [number, number];

  constructor(startDate: Date, endDate: Date, range: [number, number]) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.range = range;
  }
}
