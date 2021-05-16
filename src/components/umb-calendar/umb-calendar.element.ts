/* eslint-disable no-console */
import { property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import {
  NumberValue,
  ScaleLinear,
  scaleLinear,
  ScaleTime,
  scaleTime,
} from 'd3-scale';
import { repeat } from 'lit/directives/repeat.js';

export class UmbCalendarElement extends LitElement {
  static styles = [
    css`
      #tickContainer {
        width: 90vw;
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

  public static addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  protected static createScale(
    domain: Iterable<Date | NumberValue>,
    range: Iterable<number>
  ) {
    return scaleTime().domain(domain).nice().rangeRound(range).clamp(true);
  }

  protected static createReverseScale(
    domain: Iterable<number>,
    range: Iterable<number>
  ) {
    return scaleLinear().domain(domain).rangeRound(range).clamp(true);
  }

  @property({ type: Object, attribute: false })
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  @property({ type: Object, attribute: false })
  endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  @property({ type: Number })
  tickWidth = 70;

  @state()
  protected domain: Iterable<Date | NumberValue> = [
    this.startDate,
    this.endDate,
  ];

  @state()
  protected range: Iterable<number> = [0, 100];

  @state()
  protected scale: ScaleTime<number, number, never> | null = null;

  @state()
  protected scaleInverted: ScaleLinear<number, number, never> | null = null;

  @state()
  protected ticks: Date[] = [];

  public defineScales() {
    this.scale = UmbCalendarElement.createScale(this.domain, this.range);
    this.scaleInverted = UmbCalendarElement.createReverseScale(this.range, [
      this.startDate.valueOf(),
      this.endDate.valueOf(),
    ]);
  }

  protected calculateTicks(number: number) {
    if (this.scale !== null) this.ticks = this.scale.ticks(number);
  }

  public static checkIfTheSameDay(startDate: Date, endDate: Date) {
    if (endDate < startDate)
      throw new Error('you cannot end before you start!');
    const deltaDates = endDate.valueOf() - startDate.valueOf();
    const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
    if (deltaDates < DAY_IN_MILISECONDS) return true;
    return false;
  }

  public zoomIn() {
    if (this.endDate < this.startDate) return;
    if (UmbCalendarElement.checkIfTheSameDay(this.startDate, this.endDate)) {
      console.log('same day!');
      this.startDate = UmbCalendarElement.addHours(this.startDate, 1);
      this.endDate = UmbCalendarElement.addHours(this.endDate, -1);
    }
    this.startDate = UmbCalendarElement.addDays(this.startDate, 1);
    this.endDate = UmbCalendarElement.addDays(this.endDate, -1);
  }

  public zoomOut() {
    this.startDate = UmbCalendarElement.addDays(this.startDate, -1);
    this.endDate = UmbCalendarElement.addDays(this.endDate, 1);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('startDate') ||
      changedProperties.has('endDate')
    ) {
      this.domain = [this.startDate, this.endDate];
      this.defineScales();
      this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
    }

    // if (changedProperties.has('scale') && this.scale !== null) {
    // }
  }

  connectedCallback() {
    super.connectedCallback();
    this.defineScales();
  }

  firstUpdated() {
    this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
  }

  protected zoomOnWheel(e: WheelEvent) {
    e.preventDefault();
    if (e.deltaY > 0) {
      this.zoomIn();
      return;
    }
    this.zoomOut();
  }

  render() {
    return html` <button @click=${this.zoomIn}>ZOOM IN</button>
      <button @click=${this.zoomOut}>ZOOM OUT</button>
      <br />
      ${this.startDate.toLocaleString()}
      <br />
      ${this.endDate.toLocaleString()}

      <div id="tickContainer" @wheel=${this.zoomOnWheel}>
        ${repeat(
          this.ticks,
          tick => tick.valueOf(),
          tick => html`<div class="tick">${tick.toLocaleString()}</div>`
        )}
        <umb-variant-block
          id="content-bar"
          .scale=${this.scaleInverted}
        ></umb-variant-block>
      </div>`;
  }
}

// ${this.ticks.map(
//   tick => html`<div class="tick">${tick.toLocaleDateString()}</div>`
// )}
