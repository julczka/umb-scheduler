import { property } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
import { AppState } from '../../redux/reducer';
import { store } from '../../redux/store';
import { Publication, Variant } from '../../types/contentTypes';

export class UmbScheduler extends connect(store)(LitElement) {
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

  stateChanged(appState: AppState) {
    this.variants = appState.page.variants;
    this.publications = appState.page.publications;
  }

  protected variants: Variant[] = [];

  protected publications: Publication[] = [];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.localStorage.setItem(
      'publications',
      JSON.stringify(this.publications),
    );
    window.localStorage.setItem('variants', JSON.stringify(this.variants));
  }

  protected schedulePublications() {
    window.localStorage.setItem(
      'publications',
      JSON.stringify(this.publications),
    );
    window.localStorage.setItem('variants', JSON.stringify(this.variants));
    console.log('scheduled!');
  }

  render() {
    return html`
      <umb-sch-header></umb-sch-header>
      <umb-calendar></umb-calendar>
      <umb-sch-footer @schedule=${this.schedulePublications}></umb-sch-footer>
    `;
  }
}
