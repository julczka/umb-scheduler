/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import { property, state } from 'lit/decorators.js';
import { ScaleLinear } from 'd3-scale';
import { html, css, LitElement } from 'lit';
import { connect } from 'pwa-helpers';
import { styleMap } from 'lit/directives/style-map.js';
import { Publication, Variant, Version } from '../../types/contentTypes';
import { store } from '../../redux/store';
import { AppState, mandatoryRangesSelector } from '../../redux/reducer';
import { UmbSchedulerIcons } from '../../UmbSchedulerIcons';
import { MandatoryRange } from '../../types/appTypes';
import { copyDate } from '../../redux/actions';

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
        font-size: inherit;
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
        font-size: 150%;
      }

      #variant-name {
        justify-content: flex-start;
        font-weight: bold;
      }

      #version-name {
        justify-content: space-between;
      }

      #start-date,
      #end-date {
        flex: 1;
        display: flex;
        align-items: flex-start;
      }

      #start-button-elements,
      #end-button-elements {
        display: flex;
        align-items: flex-end;
      }

      #end-date {
        justify-content: flex-end;
        margin-right: 1em;
      }

      uui-tag {
        margin: 0;
      }

      @media screen and (max-height: 950px) {
        #content-bar {
          flex-direction: row;
        }
        #name-container {
          flex: none;
        }
      }
    `,
  ];

  stateChanged(appState: AppState) {
    this.mandatoryRanges = mandatoryRangesSelector(appState);
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
  protected mandatoryRanges: MandatoryRange[] = [];

  @state()
  private mandatoryRange: MandatoryRange = {
    id: '',
    start: null,
    end: null,
  };

  @state()
  endDate: Date | null = null;

  @state()
  variant: Variant | null = null;

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

    if (changedProperties.has('variant') && this.variant) {
      this.mandatory = this.variant?.mandatory;
    }
  }

  updated() {
    this.validateThyself();
  }

  validateThyself() {
    console.log('here some day will be validation!');
  }

  @state()
  protected scale: ScaleLinear<number, number, never> | null = null;

  @state()
  protected width: number = 0;

  @state()
  protected transform: number = 0;

  protected dynamicStyles() {
    return { width: `${this.width}%`, left: `${this.transform}%` };
  }

  public copyDate(e: MouseEvent) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    console.log(target.id);
    if (
      target.id === 'start-button-elements' ||
      target.id === 'start-date-button'
    )
      store.dispatch(copyDate(this.startDate));
    if (target.id === 'end-button-elements' || target.id === 'end-date-button')
      store.dispatch(copyDate(this.endDate));
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
          <uui-button
            compact
            look="primary"
            id="start-date-button"
            @click=${this.copyDate}
            title="Click to copy date"
          >
            <div id="start-button-elements">
              ${UmbSchedulerIcons.calendarIconTemplate()}
              ${this.startDate?.toLocaleDateString()}
              ${UmbSchedulerIcons.clockIconTemplate()}
              ${this.startDate?.toLocaleTimeString()}
            </div>
          </uui-button>
        </div>
        <div id="end-date">
          <uui-button
            compact
            look="primary"
            id="end-date-button"
            ?disabled=${!this.endDate}
            @click=${this.copyDate}
            title=${!this.endDate ? '' : 'Click to copy date'}
          >
            <div id="end-button-elements">
              ${this.endDate
                ? html`${UmbSchedulerIcons.calendarIconTemplate()}
                  ${this.endDate?.toLocaleDateString()}
                  ${UmbSchedulerIcons.clockIconTemplate()}
                  ${this.endDate?.toLocaleTimeString()}`
                : UmbSchedulerIcons.infinityIconTemplate()}
            </div>
          </uui-button>
        </div>
      </div>
    </div>`;
  }
}
