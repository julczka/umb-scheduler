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
      -webkit-box-shadow: var(--uui-shadow-depth-5);
      box-shadow: var(--uui-shadow-depth-5);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;

      /* margin: 0 auto;
      text-align: center; */
    }
  `;

  render() {
    return html`
      <umb-sch-header></umb-sch-header>
      <umb-calendar></umb-calendar>
      <umb-sch-footer></umb-sch-footer>
    `;
  }
}
