import { LitElement, html, css } from 'lit';

export class UmbScheduler extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      width: 90vw;
      box-sizing: border-box;

      position: absolute;
      top: 0;
      right: 0;
      -webkit-box-shadow: -3px 0px 15px -2px rgba(0, 0, 0, 0.42);
      box-shadow: -3px 0px 15px -2px rgba(0, 0, 0, 0.42);
      /* display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      color: #1a2b42; */

      /* margin: 0 auto;
      text-align: center; */
    }
  `;

  render() {
    return html`
      <umb-sch-header></umb-sch-header>
      <umb-calendar></umb-calendar>
    `;
  }
}
