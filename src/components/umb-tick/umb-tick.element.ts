import { property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

export class UmbTickElement extends LitElement {
  static styles = [
    css`
      :host {
        flex: 1;
        font-size: 9px;
        height: 30vh;
        border: 1px solid red;
      }
    `,
  ];

  @property({ type: Object, attribute: false })
  public date: Date | null = null;

  render() {
    return html`${this.date ? this.date.toLocaleString() : ''}`;
  }
}
