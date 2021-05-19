/* eslint-disable lit-a11y/no-invalid-change-handler */
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import { createPublication, updatePublication } from '../../redux/actions.js';
import { AppState, getVariantsSelector } from '../../redux/reducer.js';
import { store } from '../../redux/store.js';
import { Publication, Variant, Version } from '../../types/contentTypes';
import { generateId } from '../../utils/utils.js';

// TODO validate: Option and Variant must be chosen before dates!

export class UmbPublicationPopupElement extends connect(store)(LitElement) {
  static styles = [
    css`
      :host {
        position: absolute;
        background: white;
        height: 200px;
        padding: 1em;
        z-index: 100;
        bottom: 0;
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
    const input = e.target as HTMLInputElement;
    this.publication.start = new Date(input.value);
    this.updateOrCreatePublication();
  }

  private changeEndDate(e: Event) {
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

  render() {
    return html`<h3>${this.publication.id} ${this.publicationId}</h3>
      <h4>${this.publication.variantId} ${this.publication.versionId}</h4>
      <select @change=${this.setVariant}>
        <option value="" ?disabled=${this.publication.variantId !== ''}>
          --Please choose an option--
        </option>
        ${this.variants.map(
          variant =>
            html`<option
              value=${variant.id}
              ?selected=${variant.id === this.publication.variantId}
            >
              ${variant.name}
            </option>`,
        )}
      </select>
      <select @change=${this.setVersion}>
        <option value="" ?disabled=${this.publication.versionId !== ''}>
          --Please choose an option--
        </option>
        ${this.versions.map(
          version =>
            html`<option
              value=${version.id}
              ?selected=${version.id === this.publication.versionId}
            >
              ${version.name}
            </option>`,
        )}
      </select>
      in date<input
        type="datetime-local"
        .value=${this.publishDate
          ? this.publishDate.toISOString().slice(0, 19)
          : ''}
        @input=${this.changeStartDate}
        .max=${this.unpublishDate?.toISOString().slice(0, 19) as string}
      />
      out date<input
        type="datetime-local"
        .value=${this.unpublishDate
          ? this.unpublishDate.toISOString().slice(0, 19)
          : ''}
        @input=${this.changeEndDate}
        .min=${this.publishDate?.toISOString().slice(0, 19) as string}
      /><button @click=${this.validateOnClose}>close</button>`;
  }
}
