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

        border: 1px solid green;
        position: absolute;
        pointer-events: none;
      }

      :host([hidden]) {
        display: none;
      }

      #content-bar {
        background-color: yellow;
        height: 100%;
        position: relative;
        font-size: 0.7rem;
        pointer-events: auto;
        /* resize: horizontal;
        overflow: auto; */
        /* transition: width 300ms ease-out;
        transition: left 300ms ease-out; */
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
      console.log(width);
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
      console.log(width);
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
      console.log(transform);
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

  // eslint-disable-next-line class-methods-use-this

  render() {
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html`<div id="content-bar" style=${styleMap(this.dynamicStyles())}>
      <div>
        <h3 style="margin: 0">${this.id}</h3>
        ${this.variant?.name} ${this.version?.name}<br />
        START ${this.startDate?.toLocaleString()} <br />
        END ${this.endDate?.toLocaleString()}
      </div>
    </div>`;
  }
}
