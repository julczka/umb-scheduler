/* eslint-disable no-console */
import { property } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { scaleTime } from 'd3-scale';

export class UmbCalendarElement extends LitElement {
  static styles = [css``];

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  @property({ type: Object, attribute: false })
  startDate = new Date();

  @property({ type: Object, attribute: false })
  endDate = new Date();

  protected scale = scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
    .range([0, 960]);

  connectedCallback() {
    super.connectedCallback();
    console.log(this.scale.invert(67));
  }

  render() {
    return html`<div>
      ${this.startDate} ${UmbCalendarElement.addDays(this.endDate, 7)}
    </div>`;
  }
}
