/* eslint-disable no-undef */
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import { AppState } from '../../redux/reducer';
import { store } from '../../redux/store';
import { MandatoryRange } from '../../types/appTypes';
import { Publication, Variant } from '../../types/contentTypes';

export class UmbScheduler extends connect(store)(LitElement) {
  static styles = css`
    :host {
      min-height: 100vh;
      width: 90vw;
      box-sizing: border-box;
      font-size: inherit;
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
    this.mandatoryRanges = appState.scheduler.mandatoryRanges;
  }

  protected mandatoryRanges: MandatoryRange[] = [];

  protected variants: Variant[] = [];

  protected publications: Publication[] = [];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.localStorage.setItem(
      'publications',
      JSON.stringify(this.publications),
    );
    window.localStorage.setItem('variants', JSON.stringify(this.variants));
    window.localStorage.setItem(
      'mandatoryRanges',
      JSON.stringify(this.mandatoryRanges),
    );
  }

  protected schedulePublications() {
    window.localStorage.setItem(
      'publications',
      JSON.stringify(this.publications),
    );
    window.localStorage.setItem('variants', JSON.stringify(this.variants));
    window.localStorage.setItem(
      'mandatoryRanges',
      JSON.stringify(this.mandatoryRanges),
    );
    console.log('scheduled!');
    this.toggleOpen();
  }

  private _animation!: Animation;

  @property({ type: Boolean, reflect: true, attribute: 'open' })
  isOpen = false;

  firstUpdated() {
    this._animation = this.animate(this._keyframes, this._options);
    this._animation.pause();
  }

  private _keyframes = [
    { transform: 'translateX(110%)' },
    { transform: 'translateX(0%)' },
  ];

  private _options: KeyframeAnimationOptions = {
    duration: 250,
    fill: 'both',
    easing: 'ease',
  };

  public toggleOpen() {
    this.isOpen = !this.isOpen;
    this._animation.play();
    this._animation.finished.then(() => {
      this._animation.pause();
      this._animation.playbackRate = this.isOpen ? -1 : 1;
    });
  }

  render() {
    return html`
      <umb-sch-header></umb-sch-header>
      <umb-calendar></umb-calendar>
      <umb-sch-footer
        @schedule=${this.schedulePublications}
        @close=${this.toggleOpen}
      ></umb-sch-footer>
    `;
  }
}
