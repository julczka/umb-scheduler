import { property, state } from 'lit/decorators.js';
import { ScaleTime } from 'd3-scale';
import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export class UmbPublicationElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 10vh;
      }

      #content-bar {
        background-color: yellow;
        height: 100%;
        position: relative;
        font-size: 0.7rem;
        /* resize: horizontal;
        overflow: auto; */
        /* transition: width 300ms ease-out;
        transition: left 300ms ease-out; */
      }
    `,
  ];

  @property({ type: Object, attribute: false })
  publishDate: Date | null = null;

  @property({ type: Object, attribute: false })
  unpublishDate: Date | null = null;

  static invertDate(
    scale: ScaleTime<number, number, never>,
    date: number,
  ): number {
    return scale.invert(date) as any;
  }

  private calculateWidth(): number {
    if (
      this.scale !== null &&
      this.unpublishDate !== null &&
      this.publishDate !== null
    ) {
      const width =
        UmbPublicationElement.invertDate(
          this.scale,
          this.unpublishDate.valueOf(),
        ) -
        UmbPublicationElement.invertDate(
          this.scale,
          this.publishDate.valueOf(),
        );
      console.log(width);
      return width;
    }

    if (
      this.scale !== null &&
      this.unpublishDate === null &&
      this.publishDate !== null
    ) {
      const width =
        100 -
        UmbPublicationElement.invertDate(
          this.scale,
          this.publishDate.valueOf(),
        );
      console.log(width);
      return width;
    }

    return 0;
  }

  private calculateTransform() {
    if (this.scale !== null && this.publishDate !== null) {
      const transform = UmbPublicationElement.invertDate(
        this.scale,
        this.publishDate.valueOf(),
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
      changedProperties.has('publishDate') ||
      changedProperties.has('unpublishDate') ||
      changedProperties.has('scale')
    ) {
      this.width = this.calculateWidth();
      this.transform = this.calculateTransform();
    }
  }

  @state()
  protected scale: ScaleTime<number, number, never> | null = null;

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
        ${this.publishDate?.toLocaleString()} <br />
        ${this.unpublishDate?.toLocaleString()} in date
      </div>
    </div>`;
  }
}
