import { css, html, LitElement } from 'lit';

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

  render() {
    return html`<uui-button>Close</uui-button>
      <uui-button look="positive" @click=${this._schedule}
        >Schedule</uui-button
      >`;
  }
}
