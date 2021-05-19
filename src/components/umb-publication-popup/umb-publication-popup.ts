/* eslint-disable lit-a11y/no-invalid-change-handler */
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
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
    if (changedProperties.has('variants') && this.variant !== null) {
      this.versions = this.variants[
        this.variants.indexOf(this.variant)
      ].versions;
    }

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
  }

  private setVersion(e: Event) {
    const target = e.target as HTMLInputElement;
    this.version = this.versions.find(el => el.id === target.value) as Version;
    this.publication.versionId = this.version.id;
  }

  private validateOnClose() {
    if (this.variant === null || this.version === null) {
      this.error = true;
    } else
      this.dispatchEvent(
        new CustomEvent('close-popup', { bubbles: true, composed: true }),
      );
  }

  render() {
    return html` <select @change=${this.setVariant}>
        <option value="">--Please choose an option--</option>
        ${this.variants.map(
          variant => html`<option value=${variant.id}>${variant.name}</option>`,
        )}
      </select>
      <select @change=${this.setVersion}>
        <option value="">--Please choose an option--</option>
        ${this.versions.map(
          variant => html`<option value=${variant.id}>${variant.name}</option>`,
        )}
      </select>
      in date<input
        type="datetime-local"
        .value=${this.publishDate
          ? this.publishDate.toISOString().slice(0, 19)
          : ''}
        @input=${this.changeStartDate}
        max=${ifDefined(this.unpublishDate?.toISOString())}
      />
      out date<input
        type="datetime-local"
        .value=${this.unpublishDate
          ? this.unpublishDate.toISOString().slice(0, 19)
          : ''}
        @input=${this.changeEndDate}
        min=${ifDefined(this.publishDate?.toISOString())}
      /><button @click=${this.validateOnClose}>close</button>`;
  }
}
