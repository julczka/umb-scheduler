import { css, html, LitElement } from 'lit';
import { resetState } from '../../redux/actions';
import { store } from '../../redux/store';

export class UmbSchedulerFooterElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        padding: 1.2rem;
        border-top: 0.5px solid var(--uui-interface-border);
        background: var(--uui-interface-surface);
      }

      uui-button:first-child {
        margin-right: 1em;
      }
    `,
  ];

  private _schedule() {
    this.dispatchEvent(
      new CustomEvent('schedule', { bubbles: true, composed: true }),
    );
  }

  private _close() {
    this.dispatchEvent(
      new CustomEvent('close', { bubbles: true, composed: true }),
    );
    store.dispatch(resetState());
  }

  render() {
    return html`<uui-button
        @click=${this._close}
        title="Close scheduler without saving changes"
        >Close</uui-button
      >
      <uui-button
        look="positive"
        title="Schedule your publications"
        @click=${this._schedule}
        >Schedule</uui-button
      >`;
  }
}
