/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, css, LitElement } from 'lit';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { connect } from 'pwa-helpers';
import {
  checkIfEqualDates,
  checkIfInRange,
  checkIfTheSameDay,
  isToday,
} from '../../utils/utils.js';
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
  variantsWithPublicationsSelector,
} from '../../redux/reducer.js';
import { Publication, Variant } from '../../types/contentTypes.js';
import { UmbPublicationElement } from '../umb-publication/umb-publication.element.js';

type Vector = 1 | -1;
export class UmbCalendarElement extends connect(store)(LitElement) {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        align-items: stretch;
        background-color: #f6f4f4;
      }

      #tickContainer {
        box-sizing: border-box;
        width: 90vw;
        display: flex;
        position: relative;
        align-items: stretch;
        border: 1px solid purple;
        box-sizing: border-box;
      }

      #variants {
        position: absolute;
        left: 0;
        right: 0;
        top: 15%;
        height: 80%;
        scrollbar-width: thin;
        scrollbar-color: var(--uui-interface-contrast-disabled)
          var(--uui-interface-background-alt);
        border: 1px solid yellow;
        box-sizing: border-box;
        /* pointer-events: none; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      #variants::-webkit-scrollbar {
        width: 5px;
      }

      #variants::-webkit-scrollbar-track {
        background: var(--uui-interface-background-alt);
        border-radius: 12px;
      }
      #variants::-webkit-scrollbar-thumb {
        background-color: var(--uui-interface-contrast-disabled);
        border-radius: 12px;
      }

      .variant-container {
        border: 1px solid fuchsia;
        box-sizing: border-box;
        position: relative;
        min-height: 10vh;
      }

      umb-tick:first-of-type {
        --umb-tick-month-visibility: visible;
      }
    `,
  ];

  private currentPublication: string = '';

  private currentDate: Date | null = null;

  static invertDate(
    scale: ScaleLinear<number, number, never>,
    date: number,
  ): number {
    return scale.invert(date) as any;
  }

  stateChanged(schedulerState: AppState) {
    this.startDate = schedulerState.scheduler.startDate;
    this.endDate = schedulerState.scheduler.endDate;
    this.scale = scaleSelector(schedulerState);
    this.scaleInverted = reversedScaleSelector(schedulerState);
    this.scaleRange = scaleRangeSelector(schedulerState);
    this.publications = schedulerState.page.publications;
    this.variants = schedulerState.page.variants;
    this.variantsWithPublications = variantsWithPublicationsSelector(
      schedulerState,
    );
  }

  @state()
  protected startDate: Date | null = null;

  @state()
  protected variants: Variant[] = [];

  @state()
  protected variantsWithPublications: Variant[] = [];

  @state()
  protected publications: Publication[] = [];

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

  private ctrPressed = false;

  @state()
  hasPopup: boolean = false;

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

  constructor() {
    super();
    this.addEventListener('close-popup', this.closePopUp);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('resize', () => {
      this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
    });
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'z') {
        this.ctrPressed = true;
      }
    });
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'z') {
        this.ctrPressed = false;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', () => {
      this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
    });
    document.removeEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'z') {
        this.ctrPressed = true;
      }
    });
    document.removeEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'z') {
        this.ctrPressed = false;
      }
    });
  }

  firstUpdated() {
    this.calculateTicks(this.getBoundingClientRect().width / this.tickWidth);
  }

  protected handleWheelEvent(e: WheelEvent) {
    if (e.deltaX === 0 && this.ctrPressed) {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.zoomIn();
        return;
      }
      this.zoomOut();
    }
    if (e.deltaY === 0) {
      e.preventDefault();
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

  // eslint-disable-next-line class-methods-use-this
  public openPopUp(e: MouseEvent) {
    if (this.hasPopup) return;
    if (!this.hasPopup) this.hasPopup = true;
    if (e.target instanceof UmbPublicationElement) {
      this.currentPublication = e.target.id;
      this.currentDate = e.target.startDate;
      console.log('clicked on bar', e.target);
      return;
    }
    console.log('clicked outside of bar', e.target);
    if (this.scale) {
      // this.currentDate = e.target.date ? e.target.date : null;
      // e.target instanceof UmbTickElement
      this.currentDate = this.scale.invert(
        (e.offsetX * 100) / this.getBoundingClientRect().width,
      );
    }

    this.currentPublication = '';

    this.requestUpdate();
  }

  public closePopUp() {
    this.hasPopup = false;
    this.currentPublication = '';
    this.currentDate = null;
  }

  protected ticksTemplate() {
    return html` ${this.ticks.map(
      tick =>
        html`<umb-tick
          @click=${this.openPopUp}
          .date=${tick}
          ?show-month=${tick.getDate() === 1}
          ?today=${isToday(tick)}
        ></umb-tick>`,
    )}`;
  }

  // eslint-disable-next-line class-methods-use-this
  altClickTEST(e: MouseEvent) {
    if (this.scale)
      console.log(
        this.scale.invert(
          (e.offsetX * 100) / this.getBoundingClientRect().width,
        ),
      );
  }

  protected varinatsTemplate() {
    return html`
      ${this.variantsWithPublications.map(
        variant => html`<div class="variant-container" id=${variant.id}>
          ${this.publications
            .filter(publication => publication.variantId === variant.id)
            .map(
              publication => html`<umb-publication
                .id=${publication.id}
                .scale=${this.scaleInverted}
              ></umb-publication>`,
            )}
        </div>`,
      )}
    `;
  }

  render() {
    return html` <umb-cal-navigation
        @zoom-in=${this.zoomIn}
        @zoom-out=${this.zoomOut}
        @move-back=${this.prev}
        @move-forward=${this.next}
      ></umb-cal-navigation>
      ${this.hasPopup
        ? html`<umb-publication-popup
            .variants=${this.variants}
            .publicationId=${this.currentPublication}
            .date=${this.currentDate}
          ></umb-publication-popup>`
        : ''}
        </div>
      </div>`;
  }
}

// ${repeat(
//   this.publications,
//   publication => publication.id,
//   publication => html`<umb-publication
//     @click=${this.openPopUp}
//     .id=${publication.id}
//     .scale=${this.scaleInverted}
//   ></umb-publication>`,
// )}
