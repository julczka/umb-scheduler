/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';
import { checkIfEqualDates, checkIfTheSameDay } from '../../utils/utils.js';
import { store } from '../../redux/store.js';
import {
  shiftScaleDays,
  shiftScaleHours,
  zoomInDays,
  zoomInHours,
  zoomOutDays,
} from '../../redux/actions.js';
import {
  AppState,
  reversedScaleSelector,
  scaleRangeSelector,
  scaleSelector,
} from '../../redux/reducer.js';

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

  stateChanged(schedulerState: AppState) {
    this.startDate = schedulerState.scheduler.startDate;
    this.endDate = schedulerState.scheduler.endDate;
    this.scale = scaleSelector(schedulerState);
    this.scaleInverted = reversedScaleSelector(schedulerState);
    this.scaleRange = scaleRangeSelector(schedulerState);
  }

  @state()
  protected startDate: Date | null = null;

  @state()
  protected endDate: Date | null = null;

  @property({ type: Number })
  tickWidth = 70;

  @state()
  protected scale: ScaleTime<number, number, never> | null = null;

  @state()
  protected scaleInverted: ScaleLinear<number, number, never> | null = null;

  @state()
  protected ticks: Date[] = [];

  @state()
  protected scaleRange = '';

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
      this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
    }
  }

  connectedCallback() {
    super.connectedCallback();
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

  protected shiftScale(vector: Vector) {
    switch (this.scaleRange) {
      case 'HOUR': {
        store.dispatch(shiftScaleHours(vector * 1));
        break;
      }

      case 'DAY': {
        store.dispatch(shiftScaleHours(vector * 12));
        break;
      }

      case 'WEEK': {
        store.dispatch(shiftScaleDays(vector * 1));
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
          tick => html`<div class="tick">${tick.toLocaleString()}</div>`,
        )}
        <umb-variant-block
          id="content-bar"
          .scale=${this.scaleInverted}
        ></umb-variant-block>
      </div>`;
  }
}
