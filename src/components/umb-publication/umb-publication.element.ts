/* eslint-disable class-methods-use-this */
import { property, state } from 'lit/decorators.js';
import { ScaleLinear } from 'd3-scale';
import { html, css, LitElement } from 'lit';
import { connect } from 'pwa-helpers';
import { styleMap } from 'lit/directives/style-map.js';
import { Publication, Variant, Version } from '../../types/contentTypes';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';

// TODO validate: Option and Variant must be chosen before dates!

export class UmbPublicationElement extends connect(store)(LitElement) {
  static styles = [
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

      .icon {
        display: flex;
        width: 1.5em;
        aspect-ratio: 1;
        margin: 0 0.2em;
        fill: currentColor;
      }

      uui-tag {
        margin: 0;
      }
    `,
  ];

  stateChanged(appState: AppState) {
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

    this.requestUpdate();
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

  @state()
  version: Version | null = null;

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

  @state()
  protected scale: ScaleLinear<number, number, never> | null = null;

  @state()
  protected width: number = 0;

  @state()
  protected transform: number = 0;

  protected dynamicStyles() {
    return { width: `${this.width}%`, left: `${this.transform}%` };
  }

  calendarIconTemplate() {
    return html`<div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M342.391 352.428h-44.879v44.865h44.879v-44.865zm-63.234-120.071h-44.849v44.853h44.849v-44.853zm63.234 60.034h-44.879v44.859h44.879v-44.859zm63.174-60.034h-44.854v44.853h44.854v-44.853zm-126.408 60.034h-44.849v44.859h44.849v-44.859zm63.234-60.034h-44.879v44.853h44.879v-44.853zm63.174 60.034h-44.854v44.859h44.854v-44.859zm-252.803 60.037h-44.856v44.865h44.856v-44.865zm0-60.037h-44.856v44.859h44.856v-44.859zM394.024 74.208v19.691c7.737 6.847 12.642 16.825 12.642 27.969 0 20.634-16.732 37.367-37.369 37.367-20.642 0-37.367-16.733-37.367-37.367 0-11.147 4.903-21.124 12.643-27.969V74.208H169.97v19.691c7.739 6.847 12.643 16.825 12.643 27.969 0 20.634-16.732 37.367-37.369 37.367-20.64 0-37.367-16.733-37.367-37.367 0-11.147 4.904-21.124 12.642-27.969V74.208h-83.27v397.644h436.668V74.208h-79.893zm40.011 357.759H77.131V183.544h356.904v248.423zm-218.047-199.61h-44.881v44.853h44.881v-44.853zm0 120.071h-44.881v44.865h44.881v-44.865zm63.169 0h-44.849v44.865h44.849v-44.865zm-63.169-60.037h-44.881v44.859h44.881v-44.859zM145.245 143.64c10.273 0 18.603-8.326 18.603-18.599V58.035c0-10.267-8.329-18.6-18.603-18.6-10.274 0-18.602 8.333-18.602 18.6v67.006c0 10.272 8.328 18.599 18.602 18.599zm224.054 0c10.272 0 18.601-8.326 18.601-18.599V58.035c0-10.267-8.328-18.6-18.601-18.6-10.274 0-18.604 8.333-18.604 18.6v67.006c0 10.272 8.329 18.599 18.604 18.599z"
        />
      </svg>
    </div>`;
  }

  clockIconTemplate() {
    return html`<div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M255.169 37.716c120.399 0 217.999 97.602 217.999 217.999 0 120.394-97.6 217.996-217.999 217.996-120.397 0-217.998-97.603-217.998-217.996 0-120.398 97.601-217.999 217.998-217.999m0 66.173c-83.716 0-151.826 68.108-151.826 151.826 0 83.715 68.11 151.826 151.826 151.826s151.826-68.111 151.826-151.826c0-83.718-68.11-151.826-151.826-151.826zm39.456 219.541l-58.234-60.113V142.313c0-10.371 8.405-18.775 18.779-18.775 10.371 0 18.78 8.405 18.78 18.775l-.005 105.793 47.654 49.194c7.217 7.447 7.03 19.334-.424 26.553a18.716 18.716 0 0 1-13.064 5.289 18.706 18.706 0 0 1-13.486-5.712z"
        />
      </svg>
    </div>`;
  }

  infinityIconTemplate() {
    return html`<div
      class="icon"
      title="This publication does not have end date"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M144.192 365.176c-30.411.028-58.092-12.29-77.808-32.163-19.769-19.823-31.875-47.417-31.855-77.495.006-30.666 13.191-58.16 33.137-77.709 19.949-19.572 47.099-31.912 76.526-31.964 21.957-.063 41.812 5.919 58.365 15.51 16.62 9.567 30.071 22.332 41.774 35.899 4.18 4.885 8.168 9.896 12.011 14.953 2.728-3.65 5.52-7.273 8.397-10.841 14.787-18.177 32.267-35.504 55.794-46.071 13.375-5.997 28.59-9.476 44.9-9.444 59.838.165 109.449 48.753 109.666 109.667-.027 30.944-13.744 58.391-33.771 77.801-20.084 19.418-46.949 31.766-75.895 31.857h-.395c-21.291 0-40.588-6.099-56.568-15.703-16.146-9.646-29.146-22.399-40.549-35.914-4.016-4.809-7.868-9.729-11.59-14.703a358.626 358.626 0 0 1-8.685 11.013c-15.163 18.261-33.293 35.575-57.458 46.005-13.735 5.928-29.285 9.33-45.996 9.302m0-50.078c13.286-.059 23.464-3.195 33.416-8.849 9.887-5.654 19.406-14.249 28.803-25.169 6.63-7.616 13.056-16.305 19.557-25.554-5.619-8.004-11.186-15.582-16.897-22.414-12.52-15.151-25.101-26.172-38.647-31.945-7.807-3.329-16.09-5.213-26.23-5.236-15.042-.046-30.208 6.55-41.445 17.607-11.251 11.088-18.148 25.896-18.137 41.979.112 33.131 26.018 59.493 59.58 59.581m159.404-36.982c12.309 15.229 24.549 26.246 37.32 31.886 7.362 3.254 15.051 5.062 24.518 5.096 14.094.092 29.533-6.506 41.008-17.709 11.523-11.221 18.6-26.081 18.576-41.871-.008-16.369-6.722-31.133-17.706-42.08-11.005-10.909-25.895-17.519-41.878-17.507-12.384.069-21.808 3.066-31.295 8.636-9.406 5.588-18.658 14.185-27.88 25.158-6.534 7.687-12.916 16.467-19.427 25.813 5.612 8.06 11.135 15.698 16.764 22.578z"
        />
      </svg>
    </div>`;
  }

  // eslint-disable-next-line class-methods-use-this

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
          ${this.calendarIconTemplate()} ${this.startDate?.toLocaleDateString()}
          ${this.clockIconTemplate()} ${this.startDate?.toLocaleTimeString()}
        </div>
        <div id="end-date">
          ${this.endDate
            ? html`${this.calendarIconTemplate()}
              ${this.endDate?.toLocaleDateString()} ${this.clockIconTemplate()}
              ${this.endDate?.toLocaleTimeString()}`
            : this.infinityIconTemplate()}
        </div>
      </div>
    </div>`;
  }
}
