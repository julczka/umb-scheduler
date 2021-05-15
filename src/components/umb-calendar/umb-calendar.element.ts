/* eslint-disable no-console */
import { property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { NumberValue, ScaleTime, scaleTime } from 'd3-scale';

import { repeat } from 'lit/directives/repeat.js';
// year - 12
// quater - 13
// month - number of days in month 28-31
// week - 14
// day - 24

export class UmbCalendarElement extends LitElement {
  static styles = [
    css`
      #tickContainer {
        width: 100vw;
        display: flex;
        position: relative;
      }

      .tick {
        flex: 1;
        font-size: 9px;
        height: 30vh;
        border: 1px solid red;
      }
    `,
  ];

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  protected static createScale(
    dates: Iterable<Date | NumberValue>,
    range: Iterable<number>
  ) {
    return scaleTime().domain(dates).nice().rangeRound(range).clamp(true);
  }

  @property({ type: Object, attribute: false })
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  @property({ type: Object, attribute: false })
  endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  @state()
  protected domain: Iterable<Date | NumberValue> = [
    this.startDate,
    this.endDate,
  ];

  @state()
  protected range: Iterable<number> = [1, 100];

  @state()
  protected scale: ScaleTime<number, number, never> | null = null;

  @state()
  protected ticks: Date[] = [];

  public defineScale() {
    this.scale = UmbCalendarElement.createScale(this.domain, this.range);
  }

  protected calculateTicks(number: number) {
    if (this.scale !== null) this.ticks = this.scale.ticks(number);
    console.log(this.ticks.length);
  }

  public zoomIn() {
    if (this.endDate <= this.startDate) return;
    this.startDate = UmbCalendarElement.addDays(this.startDate, 1);
    this.endDate = UmbCalendarElement.addDays(this.endDate, -1);
  }

  public zoomOut() {
    // if (this.endDate <= this.startDate) return;
    this.startDate = UmbCalendarElement.addDays(this.startDate, -1);
    this.endDate = UmbCalendarElement.addDays(this.endDate, 1);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('startDate') ||
      changedProperties.has('endDate')
    ) {
      this.domain = [this.startDate, this.endDate];
      this.defineScale();
      this.calculateTicks(this.getBoundingClientRect().width / 120);
    }

    // if (changedProperties.has('scale') && this.scale !== null) {
    // }
  }

  connectedCallback() {
    super.connectedCallback();
    this.defineScale();
  }

  firstUpdated() {
    console.log(this.getBoundingClientRect().width);
    this.calculateTicks(this.getBoundingClientRect().width / 120);
  }

  render() {
    return html` <button @click=${this.zoomIn}>ZOOM IN</button>
      <button @click=${this.zoomOut}>ZOOM OUT</button>
      <br />
      ${this.startDate.toLocaleDateString()}
      <br />
      ${this.endDate.toLocaleDateString()}

      <div id="tickContainer">
        ${repeat(
          this.ticks,
          tick => tick.valueOf(),
          tick => html`<div class="tick">${tick.toLocaleString()}</div>`
        )}
      </div>`;
  }
}

// ${this.ticks.map(
//   tick => html`<div class="tick">${tick.toLocaleDateString()}</div>`
// )}
