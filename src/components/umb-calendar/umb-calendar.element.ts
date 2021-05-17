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
import {
  addDays,
  addHours,
  checkIfEqualDates,
  checkIfTheSameDay,
  deltaDatesRange,
} from '../../utils/utils.js';

type Vector = 1 | -1;
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

  @state()
  protected scaleRange = '';

  protected defineScales() {
    this.scale = UmbCalendarElement.createScale(this.domain, this.range);
    this.scaleInverted = UmbCalendarElement.createReverseScale(this.range, [
      this.startDate.valueOf(),
      this.endDate.valueOf(),
    ]);
    this.scaleRange = deltaDatesRange(this.startDate, this.endDate);
    console.log(this.scaleRange);
  }

  protected calculateTicks(number: number) {
    if (this.scale !== null) this.ticks = this.scale.ticks(number);
  }

  public zoomIn() {
    if (this.endDate < this.startDate) return;
    if (checkIfTheSameDay(this.startDate, this.endDate)) {
      console.log('same day!');
      if (checkIfEqualDates(this.startDate, this.endDate)) return;
      this.startDate = addHours(this.startDate, 1);
      this.endDate = addHours(this.endDate, -1);
    }
    this.startDate = addDays(this.startDate, 1);
    this.endDate = addDays(this.endDate, -1);
  }

  public zoomOut() {
    this.startDate = addDays(this.startDate, -1);
    this.endDate = addDays(this.endDate, 1);
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
  }

  connectedCallback() {
    super.connectedCallback();
    this.defineScales();
    window.addEventListener('resize', () => {
      this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', () => {
      this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
    });
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

  protected shiftScaleHours(hours: number): void {
    this.startDate = addHours(this.startDate, hours);
    this.endDate = addHours(this.endDate, hours);
  }

  protected shiftScaleDays(days: number): void {
    this.startDate = addDays(this.startDate, days);
    this.endDate = addDays(this.endDate, days);
  }

  protected shiftScale(vector: Vector) {
    switch (this.scaleRange) {
      case 'HOUR': {
        this.shiftScaleHours(vector * 1);
        break;
      }

      case 'DAY': {
        this.shiftScaleHours(vector * 12);
        break;
      }

      case 'WEEK': {
        this.shiftScaleDays(vector * 1);
        break;
      }

      case 'TWO_WEEKS': {
        this.shiftScaleDays(vector * 3);
        break;
      }

      case 'MONTH': {
        this.shiftScaleDays(vector * 7);
        break;
      }

      case 'QUATER': {
        this.shiftScaleDays(vector * 14);
        break;
      }

      case 'HALF_YEAR': {
        this.shiftScaleDays(vector * 30);
        break;
      }

      case 'YEAR': {
        this.shiftScaleDays(vector * 90);
        break;
      }

      default: {
        this.shiftScaleDays(vector * 7);
        break;
      }
    }
  }

  protected next() {
    this.shiftScale(1);
  }

  protected prev() {
    this.shiftScale(-1);
  }

  render() {
    return html` <button @click=${this.zoomIn}>ZOOM IN</button>
      <button @click=${this.zoomOut}>ZOOM OUT</button>
      <button @click=${this.prev}>PREV</button>
      <button @click=${this.next}>NEXT</button>
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
