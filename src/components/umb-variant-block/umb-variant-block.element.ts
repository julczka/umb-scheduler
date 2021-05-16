import { property, state } from 'lit/decorators.js';
import { ScaleTime } from 'd3-scale';
import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export class UmbVariantBlockElement extends LitElement {
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
  publishDate: Date | null = new Date('2021-05-17, 00:00');

  @property({ type: Object, attribute: false })
  unpublishDate: Date | null = new Date('2021-06-22, 00:00');

  static invertDate(
    scale: ScaleTime<number, number, never>,
    date: number
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
        UmbVariantBlockElement.invertDate(
          this.scale,
          this.unpublishDate.valueOf()
        ) -
        UmbVariantBlockElement.invertDate(
          this.scale,
          this.publishDate.valueOf()
        );
      console.log(width);
      return width;
    }
    return 0;
  }

  private calculateTransform() {
    if (
      this.scale !== null &&
      this.unpublishDate !== null &&
      this.publishDate !== null
    ) {
      const transform = UmbVariantBlockElement.invertDate(
        this.scale,
        this.publishDate.valueOf()
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
  private changeStartDate(e: Event) {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
    this.publishDate = new Date(input.value);
  }

  private changeEndDate(e: Event) {
    const input = e.target as HTMLInputElement;
    this.unpublishDate = new Date(input.value);
  }

  render() {
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html`<div id="content-bar" style=${styleMap(this.dynamicStyles())}>
      <div>
        ${this.publishDate?.toLocaleString()} <br />
        ${this.unpublishDate?.toLocaleString()} in date<input
          type="datetime-local"
          @input=${this.changeStartDate}
        />
        out date<input type="datetime-local" @input=${this.changeEndDate} />
      </div>
    </div>`;
  }
}
