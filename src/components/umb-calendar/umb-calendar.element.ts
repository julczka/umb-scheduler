/* eslint-disable no-console */
import { property } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { NumberValue, ScaleLinear, ScaleTime } from 'd3-scale';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';
import {
  addDays,
  addHours,
  checkIfEqualDates,
  checkIfTheSameDay,
  createReverseScale,
  createScale,
  deltaDatesRange,
} from '../../utils/utils.js';
import { store } from '../../redux/store.js';
import { SchedulerState } from '../../types/appTypes.js';
import {
  shiftScaleDays,
  zoomInDays,
  zoomInHours,
  zoomOutDays,
} from '../../redux/actions.js';

type Vector = 1 | -1;
export class UmbCalendarElement extends connect(store)(LitElement) {
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

  stateChanged(state: SchedulerState) {
    this.startDate = state.startDate;
    this.endDate = state.endDate;
  }

  @property({ type: Object, attribute: false })
  startDate: Date | null = null;

  @property({ type: Object, attribute: false })
  endDate: Date | null = null;

  @property({ type: Number })
  tickWidth = 70;

  @property()
  protected domain: Iterable<Date | NumberValue> = [
    this.startDate ? this.startDate : 0,
    this.endDate ? this.endDate : 0,
  ];

  @property()
  protected range: Iterable<number> = [0, 100];

  @property()
  protected scale: ScaleTime<number, number, never> | null = null;

  @property()
  protected scaleInverted: ScaleLinear<number, number, never> | null = null;

  @property()
  protected ticks: Date[] = [];

  @property()
  protected scaleRange = '';

  protected defineScales() {
    if (this.startDate && this.endDate) {
      this.scale = createScale(this.domain, this.range);
      this.scaleInverted = createReverseScale(this.range, [
        this.startDate.valueOf(),
        this.endDate.valueOf(),
      ]);
      this.scaleRange = deltaDatesRange(this.startDate, this.endDate);
      console.log(this.scaleRange);
    }
  }

  protected calculateTicks(number: number) {
    if (this.scale !== null) this.ticks = this.scale.ticks(number);
  }

  public zoomIn() {
    if (this.startDate && this.endDate) {
      if (this.endDate < this.startDate) return;
      if (checkIfTheSameDay(this.startDate, this.endDate)) {
        console.log('same day!');
        if (checkIfEqualDates(this.startDate, this.endDate)) return;
        store.dispatch(zoomInHours());
      }
      store.dispatch(zoomInDays());
    }
  }

  public zoomOut() {
    if (this.startDate && this.endDate) {
      store.dispatch(zoomOutDays());
    }
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('startDate') ||
      changedProperties.has('endDate')
    ) {
      if (this.startDate && this.endDate) {
        this.domain = [this.startDate, this.endDate];
      }
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

  protected handleWheelEvent(e: WheelEvent) {
    e.preventDefault();
    console.log(e);
    if (e.deltaX === 0) {
      if (e.deltaY > 0) {
        this.zoomIn();
        return;
      }
      this.zoomOut();
    }
    if (e.deltaY === 0) {
      if (e.deltaX > 0) {
        this.next();
        return;
      }
      this.prev();
    }
  }

  protected shiftScaleHours(hours: number): void {
    if (this.startDate && this.endDate) {
      this.startDate = addHours(this.startDate, hours);
      this.endDate = addHours(this.endDate, hours);
    }
  }

  protected shiftScaleDays(days: number): void {
    if (this.startDate && this.endDate) {
      this.startDate = addDays(this.startDate, days);
      this.endDate = addDays(this.endDate, days);
    }
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
        store.dispatch(shiftScaleDays(vector * 1));
        // this.shiftScaleDays(vector * 1);
        break;
      }

      case 'TWO_WEEKS': {
        store.dispatch(shiftScaleDays(vector * 3));
        break;
      }

      case 'MONTH': {
        store.dispatch(shiftScaleDays(vector * 7));
        break;
      }

      case 'QUATER': {
        store.dispatch(shiftScaleDays(vector * 14));
        break;
      }

      case 'HALF_YEAR': {
        store.dispatch(shiftScaleDays(vector * 30));
        break;
      }

      case 'YEAR': {
        store.dispatch(shiftScaleDays(vector * 90));
        break;
      }

      default: {
        store.dispatch(shiftScaleDays(vector * 7));
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
      ${this.startDate ? this.startDate.toLocaleString() : ''}
      <br />
      ${this.endDate ? this.endDate.toLocaleString() : ''}

      <div id="tickContainer" @wheel=${this.handleWheelEvent}>
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
