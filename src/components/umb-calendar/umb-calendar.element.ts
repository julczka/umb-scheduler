/* eslint-disable no-console */
import { property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { NumberValue, ScaleTime, scaleTime } from 'd3-scale';

export class UmbCalendarElement extends LitElement {
  static styles = [css``];

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  protected static createScale(
    dates: Iterable<Date | NumberValue>,
    range: Iterable<number>
  ) {
    return scaleTime().domain(dates).range(range).clamp(true);
  }

  @property({ type: Object, attribute: false })
  startDate = new Date();

  @property({ type: Object, attribute: false })
  endDate = new Date('2021-12-31');

  @state()
  domain: Iterable<Date | NumberValue> = [];

  @state()
  range: Iterable<number> = [];

  @state()
  protected scale: ScaleTime<number, number, never> | null = null;

  @state()
  protected ticks: Date[] = [];

  public defineScale() {
    this.scale = UmbCalendarElement.createScale(this.domain, this.range);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('startDate') ||
      changedProperties.has('endDate')
    ) {
      this.domain = [this.startDate, this.endDate];
      this.defineScale();
    }

    if (changedProperties.has('scale') && this.scale !== null) {
      this.ticks = this.scale.ticks(31);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.scale = UmbCalendarElement.createScale(
      [this.startDate, this.endDate],
      [0, 100]
    );
    console.log(this.scale.ticks(31));
  }

  render() {
    return html`<div>
      ${this.startDate} ${UmbCalendarElement.addDays(this.endDate, 7)}
      ${this.ticks.map(tick => html`<div>${tick.toLocaleDateString()}</div>`)}
    </div>`;
  }
}
