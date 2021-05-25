import { property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

export class UmbTickElement extends LitElement {
  static styles = [
    css`
      :host {
        flex: 1;
        font-size: 9px;
        /* height: 100%; */
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      #line-container {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: stretch;
      }

      #line {
        flex: 1;
        max-width: 1px;
        background-color: pink;
      }
    `,
  ];

  @property({ type: Object, attribute: false })
  public date: Date | null = null;

  render() {
    return html`<div id="date-container">
        ${this.date ? this.date.toLocaleString() : ''}
      </div>
      <div id="line-container">
        <div id="line"></div>
      </div>`;
  }
}
