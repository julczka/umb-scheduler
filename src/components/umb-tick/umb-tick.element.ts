import { property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { isToday } from '../../utils/utils';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export class UmbTickElement extends LitElement {
  static styles = [
    css`
      :host {
        flex: 1;

        /* height: 100%; */
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        color: var(--uui-interface-chosen);
        --umb-tick-month-visibility: hidden;
      }

      #date-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 1em;
      }

      #date {
        font-weight: bold;
      }

      #dow {
        font-size: 11px;
      }

      #line-container {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: stretch;
        position: relative;
      }

      #month {
        visibility: var(--umb-tick-month-visibility, hidden);
      }

      :host([show-month]) #month {
        visibility: visible;
      }

      #line {
        flex: 1;
        max-width: 1px;
        background-color: var(--uui-interface-border);
      }

      .circle {
        position: absolute;
        aspect-ratio: 1;
        background-color: #f6f4f4;
        width: 15px;
        box-sizing: border-box;
        border: 1px solid var(--uui-interface-border);
        border-radius: 100%;
      }

      .circle:first-of-type {
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      :host([today]) .circle:first-of-type {
        background-color: var(--uui-interface-chosen);
        border: none;
      }

      .today {
        width: 26px;
        background: transparent;
        transform: translateY(-50%);
        border: 1px solid var(--uui-interface-chosen);
      }

      .circle:last-of-type {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
      }
    `,
  ];

  @property({ type: Object, attribute: false })
  public date: Date | null = null;

  @property({ type: Boolean, reflect: true, attribute: 'show-month' })
  public showMonth: Boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'today' })
  public isToday: Boolean = false;

  render() {
    return html`<div id="date-container">
        ${this.date
          ? html`<span id="month"
                >${months[this.date.getMonth()].slice(0, 3)}</span
              ><span id="date">${this.date.getDate()}</span>
              <span id="dow">
                ${weekdays[this.date.getDay()].slice(0, 3)}
              </span> `
          : ''}
      </div>
      <div id="line-container">
        <span class="circle"></span>
        ${this.isToday ? html`<span class="circle today"></span>` : ''}
        <div id="line"></div>
        <span class="circle"></span>
      </div>`;
  }
}
