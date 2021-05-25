/* eslint-disable lit-a11y/no-invalid-change-handler */
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import {
  createPublication,
  removePublication,
  updatePublication,
} from '../../redux/actions.js';
import { AppState, getVariantsSelector } from '../../redux/reducer.js';
import { store } from '../../redux/store.js';
import { Publication, Variant, Version } from '../../types/contentTypes';
import { generateId } from '../../utils/utils.js';

// TODO validate: Option and Variant must be chosen before dates!

export class UmbPublicationPopupElement extends connect(store)(LitElement) {
  static styles = [
    css`
      :host {
        position: fixed;
        top: 50%;

        background: white;
        height: 200px;
        padding: 1em;
        z-index: 100;
        bottom: 50%;
        box-sizing: border-box;
        padding: 1em;
        box-shadow: var(--uui-shadow-depth-3);
      }

      :host([error]) {
        background: coral;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.getPublicationFromState();
    console.log('popup-connected', this.publicationId);
  }

  disconnectedCallback() {
    this.cleanState();
    console.log('popup-disconnected', this.publicationId);
  }

  stateChanged(schedulerState: AppState) {
    this.variants = getVariantsSelector(schedulerState);
    this.pageTitle = schedulerState.page.pageTitle;
  }

  private getPublicationFromState() {
    if (this.publicationId) {
      this.publication = store
        .getState()
        .page.publications.find(
          p => p.id === this.publicationId,
        ) as Publication;
      this.publishDate = this.publication.start;
      this.unpublishDate = this.publication.end;
      this.variant = this.variants.find(
        v => v.id === this.publication.variantId,
      ) as Variant;
      console.log(this.variant);
    }
  }

  @property()
  publicationId = '';

  @state()
  variants: Variant[] = [];

  @property({ type: Object, attribute: false })
  variant: Variant | null = null;

  @property()
  pageTitle = '';

  @state()
  versions: Version[] = [];

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Object, attribute: false })
  version: Version | null = null;

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    // if (changedProperties.has('variants') && this.variant !== null) {
    //   this.versions = this.variants[
    //     this.variants.indexOf(this.variant)
    //   ].versions;
    // }

    if (changedProperties.has('variant') && this.variant !== null) {
      this.versions = this.variants[
        this.variants.indexOf(this.variant)
      ].versions;
      this.publication.variantId = this.variant.id;
    }

    if (changedProperties.has('version') && this.version !== null) {
      this.publication.versionId = this.version.id;
    }

    if (changedProperties.has('publicationId')) {
      this.getPublicationFromState();
    }

    if (changedProperties.has('date')) {
      this.publishDate = this.date;
      this.publication.start = this.date;
    }

    if (this.version !== null && this.variant !== null) {
      this.error = false;
    }
  }

  @property({ type: Object, attribute: false })
  date: Date | null = null;

  @property({ type: Object, attribute: false })
  publishDate: Date | null = null;

  @property({ type: Object, attribute: false })
  unpublishDate: Date | null = null;

  private initId = generateId();

  @state()
  publication: Publication = {
    id: '',
    start: null,
    end: null,
    variantId: '',
    versionId: '',
  };

  private changeStartDate(e: Event) {
    if (e.target instanceof HTMLButtonElement) {
      this.publishDate = null;
      this.publication.start = null;
      store.dispatch(removePublication(this.publication.id));
      this.cleanState();
      this.dispatchEvent(
        new CustomEvent('close-popup', { bubbles: true, composed: true }),
      );
      return;
    }
    const input = e.target as HTMLInputElement;
    this.publication.start = new Date(input.value);
    this.updateOrCreatePublication();
  }

  private changeEndDate(e: Event) {
    if (
      e.target instanceof HTMLButtonElement &&
      this.publication.end === null &&
      this.unpublishDate === null
    ) {
      this.requestUpdate();
      console.log('nope');
      return;
    }

    if (e.target instanceof HTMLButtonElement) {
      this.unpublishDate = null;
      this.publication.end = null;
      this.updateOrCreatePublication();
      console.log('updateme');
      return;
    }

    const input = e.target as HTMLInputElement;
    this.publication.end = new Date(input.value);
    this.updateOrCreatePublication();
  }

  private updateOrCreatePublication() {
    console.log(this.publication.id);
    if (this.publication.id === '') {
      this.publication.id = this.initId;
      store.dispatch(createPublication(this.publication));
      console.log(this.publication.id);
    }

    store.dispatch(updatePublication(this.publication.id, this.publication));
  }

  private setVariant(e: Event) {
    const target = e.target as HTMLInputElement;
    this.variant = this.variants.find(el => el.id === target.value) as Variant;
    this.publication.variantId = this.variant.id;
    this.updateOrCreatePublication();
  }

  private setVersion(e: Event) {
    const target = e.target as HTMLInputElement;
    this.version = this.versions.find(el => el.id === target.value) as Version;
    if (this.version !== null) this.publication.versionId = this.version.id;
    this.updateOrCreatePublication();
  }

  private cleanState() {
    this.publicationId = '';
    this.publication = {
      id: '',
      start: null,
      end: null,
      variantId: '',
      versionId: '',
    };
    this.publishDate = null;
    this.unpublishDate = null;
    this.version = null;
    this.variant = null;
  }

  private validateOnClose() {
    if (this.publication.variantId === '') {
      this.error = true;
      return;
    }

    if (this.publication.versionId === '') {
      this.error = true;
      return;
    }

    this.dispatchEvent(
      new CustomEvent('close-popup', { bubbles: true, composed: true }),
    );
  }

  private static _serializeDateforInput(date: Date) {
    return date
      .toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(' ', 'T');
  }

  render() {
    return html` <h2>${this.pageTitle}</h2>
      <h3>${this.publication.id} ${this.publicationId}</h3>
      <h4>${this.publication.variantId} ${this.publication.versionId}</h4>
      <umb-select @change=${this.setVariant} .options=${this.variants}>
      </umb-select>
      <umb-select @change=${this.setVersion} .options=${this.versions}>
      </umb-select>
      in date<uui-textfield
        type="datetime-local"
        .value=${this.publishDate
          ? UmbPublicationPopupElement._serializeDateforInput(this.publishDate)
          : ''}
        @input=${this.changeStartDate}
        .max=${this.unpublishDate
          ? UmbPublicationPopupElement._serializeDateforInput(
              this.unpublishDate,
            )
          : ''}
      ></uui-textfield>
      <uui-button look="danger" @click=${this.changeStartDate}>X</uui-button>
      out date<uui-textfield
        type="datetime-local"
        .value=${this.unpublishDate
          ? UmbPublicationPopupElement._serializeDateforInput(
              this.unpublishDate,
            )
          : ''}
        @input=${this.changeEndDate}
        .min=${this.publishDate
          ? UmbPublicationPopupElement._serializeDateforInput(this.publishDate)
          : ''}
      ></uui-textfield
      ><uui-button look="danger" @click=${this.changeEndDate}>X</uui-button
      ><uui-button @click=${this.validateOnClose}>close</uui-button>`;
  }
}
