import { html, fixture, expect } from '@open-wc/testing';

import { UmbScheduler } from '../src/UmbScheduler.js';
import '../src/umb-scheduler.js';

describe('UmbScheduler', () => {
  let element: UmbScheduler;
  beforeEach(async () => {
    element = await fixture(html`<umb-scheduler></umb-scheduler>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
