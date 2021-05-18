import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined';

export class UmbPublicationPopupElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        background: white;
        height: 300px;
        padding: 3em;
      }
    `,
  ];

  @property({ type: Object, attribute: false })
  publishDate: Date | null = null;

  @property({ type: Object, attribute: false })
  unpublishDate: Date | null = null;

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
    return html`in date<input
        type="datetime-local"
        .value=${this.publishDate ? this.publishDate.toISOString() : ''}
        @input=${this.changeStartDate}
        max=${ifDefined(this.unpublishDate?.toISOString())}
      />
      out date<input
        type="datetime-local"
        .value=${this.unpublishDate ? this.unpublishDate.toISOString() : ''}
        @input=${this.changeEndDate}
        min=${ifDefined(this.publishDate?.toISOString())}
      />`;
  }
}
