import { state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { UmbSchedulerIcons } from '../../UmbSchedulerIcons';

export class UmbCalendarNavigationElement extends LitElement {
  static styles = [
    UmbSchedulerIcons.styles,
    css`
      :host {
        display: flex;
        justify-content: space-between;
        border: 1px solid aliceblue;
        padding: 1em;
        background-color: var(--uui-interface-surface);
        border-bottom: 0.5px solid var(--uui-interface-border);
      }

      #date {
        font-weight: bold;
      }

      .icon {
        margin-left: 1em;
      }

      #nav-date-container {
        display: flex;
        align-items: center;
      }
    `,
  ];

  private fireEvent(eventName: string) {
    const event = new CustomEvent(eventName, { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  protected previous() {
    this.fireEvent('move-back');
  }

  protected next() {
    this.fireEvent('move-forward');
  }

  protected zoomIn() {
    this.fireEvent('zoom-in');
  }

  protected zoomOut() {
    this.fireEvent('zoom-out');
  }

  protected today() {
    this.fireEvent('go-to-today');
  }

  connectedCallback() {
    super.connectedCallback();
    setInterval(() => {
      this.nowDate = new Date();
    }, 1000);
  }

  @state()
  nowDate = new Date();

  render() {
    return html`<div id="nav-date-container">
        <uui-button-group
          ><uui-button look="outline" @click=${this.previous}
            >Previous</uui-button
          ><uui-button look="outline" @click=${this.today}>Today</uui-button
          ><uui-button look="outline" @click=${this.next}
            >Next</uui-button
          ></uui-button-group
        >

        ${UmbSchedulerIcons.calendarIconTemplate()}<span id="date"
          >${this.nowDate.toLocaleDateString()}</span
        >${UmbSchedulerIcons.clockIconTemplate()}<span id="date"
          >${this.nowDate.toLocaleTimeString()}</span
        >
      </div>
      <uui-button-group
        title="To zoom with mouse press Z on keyboard and use your wheel"
        ><uui-button look="outline" @click=${this.zoomIn}>Zoom in</uui-button
        ><uui-button look="outline" @click=${this.zoomOut}
          >Zoom out</uui-button
        ></uui-button-group
      >`;
  }
}
