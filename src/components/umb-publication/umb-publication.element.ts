/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import { property, state } from 'lit/decorators.js';
import { ScaleLinear } from 'd3-scale';
import { html, css, LitElement } from 'lit';
import { connect } from 'pwa-helpers';
import { styleMap } from 'lit/directives/style-map.js';
import { Publication, Variant, Version } from '../../types/contentTypes';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';
import { UmbSchedulerIcons } from '../../UmbSchedulerIcons';
import { MandatoryRange } from '../../types/appTypes';
import { generateId } from '../../utils/utils';
import {
  createMandatoryRange,
  removeMandatoryRange,
  updateMandatoryRange,
} from '../../redux/actions';

// TODO validate: Option and Variant must be chosen before dates!

export class UmbPublicationElement extends connect(store)(LitElement) {
  static styles = [
    UmbSchedulerIcons.styles,
    css`
      :host {
        left: 0;
        right: 0;
        /* border: 1px solid green; */
        position: absolute;
        pointer-events: none;
        color: var(--uui-interface-chosen-contrast);
      }

      :host([hidden]) {
        display: none;
      }

      #content-bar {
        background-color: var(--uui-interface-select);
        padding: 0.6em 0;
        box-sizing: border-box;
        position: relative;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        height: 8vh;
        max-height: 8vh;
        overflow: hidden;
        border-radius: var(--uui-size-border-radius);
        box-shadow: var(--uui-shadow-depth-2);
      }

      :host([mandatory]) #content-bar {
        background-color: var(--uui-interface-chosen);
      }

      :host([error]) #content-bar {
        box-shadow: 0px 0px 5px 4px var(--uui-color-maroon-flush);
      }

      #name-container,
      #date-container {
        display: flex;
        align-items: center;
        margin-left: 1em;
        flex: 1;
      }

      #date-container {
        flex: 1;
      }

      #variant-name,
      #version-name {
        margin-right: 1em;
        font-size: var(--uui-size-medium);
      }

      #variant-name {
        justify-content: flex-start;
        font-weight: bold;
      }

      #version-name {
        font-weight: 200;
        justify-content: space-between;
      }

      #start-date,
      #end-date {
        flex: 1;
        display: flex;
        align-items: flex-start;
      }

      #end-date {
        justify-content: flex-end;
        margin-right: 1em;
      }

      uui-tag {
        margin: 0;
      }
    `,
  ];

  stateChanged(appState: AppState) {
    this.mandatoryRanges = appState.scheduler.mandatoryRanges.sort(
      (a, b) => b.start.valueOf() - a.start.valueOf(),
    );
    if (this.mandatoryRanges.length === 1)
      this.mandatoryRange = this.mandatoryRanges[0];

    const pub = appState.page.publications.find(
      p => p.id === this.id,
    ) as Publication;
    if (pub !== undefined) {
      this.startDate = pub.start ? pub.start : null;
      this.endDate = pub.end;
      this.variant = appState.page.variants.find(
        v => v.id === pub.variantId,
      ) as Variant;
      this.version = appState.page.variants
        .find(v => v.id === pub.variantId)
        ?.versions.find(v => v.id === pub.versionId) as Version;
    }

    // this.figureOutRanges(pub.start, pub.end);
    // this.requestUpdate();
  }

  @property()
  id = '';

  @property({ type: Boolean, reflect: true })
  hidden = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean, reflect: true })
  mandatory = false;

  @state()
  startDate: Date | null = null;

  @state()
  endDate: Date | null = null;

  @state()
  variant: Variant | null = null;

  private mandatoryRanges: MandatoryRange[] = [];

  private mandatoryRange: MandatoryRange = {
    id: '',
    start: null,
    end: null,
  };

  private _version: Version | null = null;

  set version(newVal) {
    const oldVal = this._version;
    this._version = newVal;
    this.error = this._version === undefined;
    this.requestUpdate('version', oldVal);
  }

  @state()
  get version() {
    return this._version;
  }

  static invertDate(
    scale: ScaleLinear<number, number, never>,
    date: number,
  ): number {
    return scale.invert(date) as any;
  }

  private calculateWidth(): number {
    if (
      this.scale !== null &&
      this.startDate !== null &&
      this.endDate !== null
    ) {
      const width =
        UmbPublicationElement.invertDate(this.scale, this.endDate.valueOf()) -
        UmbPublicationElement.invertDate(this.scale, this.startDate.valueOf());
      return width;
    }

    if (
      this.scale !== null &&
      this.endDate === null &&
      this.startDate !== null
    ) {
      const width =
        100 -
        UmbPublicationElement.invertDate(this.scale, this.startDate.valueOf());
      return width;
    }

    return 0;
  }

  private calculateTransform() {
    if (this.scale !== null && this.startDate !== null) {
      const transform = UmbPublicationElement.invertDate(
        this.scale,
        this.startDate.valueOf(),
      );
      return transform;
    }
    return 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.width = this.calculateWidth();
    this.transform = this.calculateTransform();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.mandatoryRanges.length === 1) {
      console.log('Disconnected', this.mandatoryRanges.length);
      store.dispatch(removeMandatoryRange(this.mandatoryRange.id));
      // this.mandatoryRange = { id: '', start: null, end: null };
    }
  }

  firstUpdated() {
    this.width = this.calculateWidth();
    this.transform = this.calculateTransform();
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (
      changedProperties.has('startDate') ||
      changedProperties.has('endDate') ||
      changedProperties.has('scale')
    ) {
      this.width = this.calculateWidth();
      this.transform = this.calculateTransform();
      if (this.width <= 0) this.hidden = true;
      else this.hidden = false;
    }

    // if (
    //   changedProperties.has('startDate') ||
    //   changedProperties.has('endDate') ||
    //   changedProperties.has('mandatoryRanges')
    // ) {
    //   this.figureOutRanges(this.startDate, this.endDate);
    // }

    if (changedProperties.has('variant') && this.variant) {
      this.mandatory = this.variant?.mandatory;
    }
  }

  // figureOutRanges(start: Date, end: Date | null) {
  //   console.log('figureOutRanges', start, end);

  //   // if there is no mandatory range create one
  //   if (this.mandatoryRanges.length === 0) {
  //     console.log('no T, create: 270');
  //     const id = generateId();
  //     store.dispatch(createMandatoryRange({ start, end, id }));
  //     this.mandatoryRange = { start, end, id };
  //     return;
  //   }

  //   // if (this.mandatoryRanges.length === 1 && end === null) {
  //   //   console.log('278');
  //   //   this.mandatoryRange = { ...this.mandatoryRange, start, end };
  //   //   store.dispatch(
  //   //     updateMandatoryRange(this.mandatoryRange.id, this.mandatoryRange),
  //   //   );
  //   //   return;
  //   // }

  //   // if there is aonly one and pub becomes shorter shorten the range
  //   // if (this.mandatoryRanges.length === 1 && this.mandatoryRange.end === null) {
  //   //   console.log('279');
  //   //   this.mandatoryRange = { ...this.mandatoryRange, start, end };
  //   //   store.dispatch(
  //   //     updateMandatoryRange(this.mandatoryRange.id, this.mandatoryRange),
  //   //   );
  //   //   return;
  //   // }

  //   // if (this.mandatoryRanges.length === 1) {
  //   //   this.mandatoryRange = { ...this.mandatoryRange, start, end };
  //   //   store.dispatch(
  //   //     updateMandatoryRange(this.mandatoryRange.id, this.mandatoryRange),
  //   //   );
  //   //   return;
  //   // }

  //   for (const [index, range] of this.mandatoryRanges.entries()) {
  //     console.log('enter loop');
  //     const isRangeInfinite = range.end === null;

  //     if (isRangeInfinite && start > range.start) {
  //       if (range.id === this.mandatoryRange.id) {
  //         if (start > range.start && this.mandatoryRange.end === null) {
  //           console.log('loop 316');
  //           return;
  //         }

  //         console.log('loop 314');
  //         this.mandatoryRange = { ...this.mandatoryRange, start };
  //         store.dispatch(updateMandatoryRange(range.id, this.mandatoryRange));
  //         return;
  //       }

  //       console.log('loop 300');
  //       this.mandatoryRange = range;
  //       return;
  //     }

  //     if (isRangeInfinite && start < range.start) {
  //       console.log('loop 306');
  //       this.mandatoryRange = { ...range, start };
  //       store.dispatch(updateMandatoryRange(range.id, this.mandatoryRange));
  //       return;
  //     }

  //     if (isRangeInfinite && start.valueOf() === range.start.valueOf()) {
  //       if (end !== null && range.id === this.mandatoryRange.id) {
  //         if (
  //           this.mandatoryRange.end === null &&
  //           start > this.mandatoryRange.start
  //         ) {
  //           console.log('loop 335');
  //           return;
  //         }

  //         // console.log('loop 334');
  //         // this.mandatoryRange = { ...this.mandatoryRange, end };
  //         // store.dispatch(updateMandatoryRange(range.id, this.mandatoryRange));
  //         // return;
  //       }

  //       console.log('loop 313');
  //       this.mandatoryRange = range;
  //       return;
  //     }

  //     if (!isRangeInfinite) {
  //       console.log('loop 319');
  //       // const outOfRange = start > range.end || end < range.start;
  //       const startsInRange = start < range.end && start > range.start;
  //       const endsInRange = end < range.end && end > range.start;
  //       const isInRange = startsInRange && endsInRange;

  //       if (
  //         start.valueOf() === range.start.valueOf() &&
  //         end.valueOf() === range.end.valueOf()
  //       ) {
  //         console.log('loop 329');
  //         this.mandatoryRange = range;
  //         return;
  //       }

  //       if (isInRange) {
  //         console.log('loop 335');
  //         this.mandatoryRange = range;
  //         return;
  //       }

  //       if (startsInRange) {
  //         console.log('loop 341');
  //         this.mandatoryRange = { ...range, end };
  //         store.dispatch(updateMandatoryRange(range.id, this.mandatoryRange));
  //         return;
  //       }

  //       if (endsInRange) {
  //         console.log('loop 348');
  //         this.mandatoryRange = { ...range, start };
  //         store.dispatch(updateMandatoryRange(range.id, this.mandatoryRange));
  //         return;
  //       }

  //       console.log(index, 'in the loop');
  //     }
  //   }

  //   console.log('out');

  //   // *OK

  //   // if infinite publication overwrite all ranges after its start date
  //   // if (end === null) {
  //   //   // return mandatory range with the earliest startDate and null. Overwrite all mandatory ranges?
  //   //   const startDatesOfInfiniteRanges = this.mandatoryRanges
  //   //     .filter(r => r.end === null)
  //   //     .map(r => r.start?.valueOf()) as number[];
  //   //   const earliest = new Date(
  //   //     Math.min.apply(null, startDatesOfInfiniteRanges),
  //   //   );
  //   //   this.mandatoryRange = { start: earliest, end: null, id: generateId() };
  //   //   store.dispatch(clearRangesAfterDate(start));
  //   //   store.dispatch(createMandatoryRange(this.mandatoryRange));
  //   //   console.log('end === null', start, end);
  //   //   return;
  //   // }

  //   // console.log('nowe T, bo start wiekszy od wszystkich finalow');
  //   // this.mandatoryRange = { start, end, id: generateId() };
  //   // store.dispatch(createMandatoryRange(this.mandatoryRange));
  // }

  @state()
  protected scale: ScaleLinear<number, number, never> | null = null;

  @state()
  protected width: number = 0;

  @state()
  protected transform: number = 0;

  protected dynamicStyles() {
    return { width: `${this.width}%`, left: `${this.transform}%` };
  }

  render() {
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html`<div
      id="content-bar"
      title="Click to modify this publication"
      style=${styleMap(this.dynamicStyles())}
    >
      <div id="name-container">
        <span>
          <span id="variant-name">${this.variant?.name}</span
          ><span id="version-name">${this.version?.name}</span> </span
        >${this.variant?.mandatory
          ? html`<uui-tag look="warning">Mandatory</uui-tag>`
          : ''}${this.error ? html`<uui-tag look="danger">Error</uui-tag>` : ''}
      </div>
      <div id="date-container">
        <div id="start-date">
          ${UmbSchedulerIcons.calendarIconTemplate()}
          ${this.startDate?.toLocaleDateString()}
          ${UmbSchedulerIcons.clockIconTemplate()}
          ${this.startDate?.toLocaleTimeString()}
        </div>
        <div id="end-date">
          ${this.endDate
            ? html`${UmbSchedulerIcons.calendarIconTemplate()}
              ${this.endDate?.toLocaleDateString()}
              ${UmbSchedulerIcons.clockIconTemplate()}
              ${this.endDate?.toLocaleTimeString()}`
            : UmbSchedulerIcons.infinityIconTemplate()}
        </div>
      </div>
    </div>`;
  }
}
