/* eslint-disable class-methods-use-this */
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
        z-index: 100;
        bottom: 50%;
      }

      #popup-wrapper {
        background: var(--uui-interface-surface);
        padding: 2em;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
      }

      :host([error]) #popup-wrapper {
        outline: 1px solid var(--uui-color-maroon-flush);
        box-shadow: 0px 0px 5px 4px var(--uui-color-maroon-flush);
      }

      #icon {
        display: inline-block;
        fill: currentColor;
        width: 32px;
        margin-right: 0.4em;
      }

      #page-title {
        font-size: 2rem;
        font-weight: bold;
        vertical-align: middle;
        margin-bottom: 1em;
      }

      .select-wrappper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5em;
      }

      #start-date-input-wrapper {
        margin-top: 3em;
      }

      .date-input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5em;
      }

      .input-label {
        flex: 1;
        font-weight: bold;
      }

      #variant {
        font-size: 21px;
        font-weight: bold;
      }

      .input-flex {
        flex: 2;
        vertical-align: middle;
        display: flex;
      }

      .select-flex {
        display: block;
        flex: 1;
      }

      uui-textfield {
        flex: 1;
      }

      #close-button {
        position: absolute;
        top: 0;
        right: 0;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.getPublicationFromState();
  }

  disconnectedCallback() {
    this.cleanState();
  }

  stateChanged(schedulerState: AppState) {
    this.variants = getVariantsSelector(schedulerState);
    this.pageTitle = schedulerState.page.pageTitle;
  }

  private getPublicationFromState() {
    if (this.publicationId !== '') {
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
      this.version =
        this.publication.versionId !== ''
          ? (this.variant.versions.find(
              version => version.id === this.publication.versionId,
            ) as Version)
          : null;
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

  @state()
  publication: Publication = {
    id: '',
    start: null,
    end: null,
    variantId: '',
    versionId: '',
  };

  private sortByName(a: Variant, b: Variant) {
    const nameA = a.name ? a.name.toUpperCase() : '';
    const nameB = b.name ? b.name.toUpperCase() : '';
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  get sortedVariants() {
    const mandatoryVariants = this.variants
      .filter(variant => variant.mandatory)
      .sort(this.sortByName);
    const otherVariants = this.variants
      .filter(variant => !variant.mandatory)
      .sort(this.sortByName);
    return [...mandatoryVariants, ...otherVariants];
  }

  get mandatoryVariants() {
    return this.variants
      .filter(variant => variant.mandatory)
      .sort(this.sortByName);
  }

  private changeStartDate(e: Event) {
    const target = e.target as HTMLElement;

    if (target.nodeName === 'UUI-BUTTON') {
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
    const target = e.target as HTMLElement;
    if (
      target.nodeName === 'UUI-BUTTON' &&
      this.publication.end === null &&
      this.unpublishDate === null
    ) {
      this.requestUpdate();
      console.log('nope');
      return;
    }

    if (target.nodeName === 'UUI-BUTTON') {
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

  private _tempId = '';

  private updateOrCreatePublication() {
    const isVariantMandatory = () => {
      if (this.variant !== null) {
        return this.mandatoryVariants.some(
          variant => variant.id === this.variant?.id && variant.mandatory,
        );
      }
      return false;
    };

    if (this.publication.id === '' && isVariantMandatory()) {
      console.log('mandaory variantg chosen');

      if (this.variant !== null && this.variant.id) {
        store.dispatch(
          createPublication({
            ...this.publication,
            variantId: this.variant.id,
            id: this._tempId,
          }),
        );
        this.publicationId = this._tempId;
        this._tempId = '';
      }

      if (this.addAllMandatory) {
        this.mandatoryVariants
          .filter(variant => variant.id !== this?.variant?.id)
          .forEach((variant: Variant) => {
            store.dispatch(
              createPublication({
                ...this.publication,
                variantId: variant.id,
                id: generateId(),
              }),
            );
          });
      }

      return;
    }

    if (this.publication.id === '' && !isVariantMandatory()) {
      this.publication.id = generateId();
      store.dispatch(createPublication(this.publication));
      return;
    }

    store.dispatch(updatePublication(this.publication.id, this.publication));
  }

  private setVariant(e: Event) {
    const target = e.target as HTMLInputElement;
    this.variant = this.variants.find(el => el.id === target.value) as Variant;
    this.publication.variantId = this.variant.id;
    if (this.publicationId === '') this._tempId = generateId();
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
    if (this.publication.variantId === '' && this.publication.versionId === '')
      this.dispatchEvent(
        new CustomEvent('close-popup', { bubbles: true, composed: true }),
      );

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

  @state()
  addAllMandatory = false;

  private _setAllMandatory(e: Event) {
    const target = e.target as any;
    this.addAllMandatory = target?.checked;
    console.log(this.addAllMandatory);
  }

  chooseVariantTemplate() {
    return html`<div class="select-wrappper">
        <span class="input-label">Choose variant</span>
        <umb-select
          @change=${this.setVariant}
          .options=${this.sortedVariants}
          class="select-flex"
          .value=${this.variant ? this.variant.id : ''}
        >
        </umb-select>
      </div>
      ${!this.publicationId
        ? html`<div class="select-wrappper">
            <span class="input-label">Add all mandatory variants?</span>
            <input
              type="checkbox"
              @change=${this._setAllMandatory}
              ?checked=${this.addAllMandatory}
            />
          </div>`
        : ''}`;
  }

  choseVersionTemplate() {
    return html`<div class="select-wrappper">
      <span class="input-label">Choose version</span>
      <umb-select
        ?disabled=${!this.variant}
        @change=${this.setVersion}
        .options=${this.versions}
        class="select-flex"
        .value=${this.version ? this.version.id : ''}
      >
      </umb-select>
    </div>`;
  }

  chooseVariantAndVersionTemplate() {
    return html`${this.chooseVariantTemplate()}${this.choseVersionTemplate()}`;
  }

  showVersionAndVariantTemplate() {
    return html`<div class="select-wrappper">
        <span id="variant" class="input-label"
          >${this.variant ? this.variant.name : ''}</span
        >${this.variant?.mandatory
          ? html`<uui-tag look="warning">Mandatory</uui-tag>`
          : ''}
      </div>
      ${this.choseVersionTemplate()}`;
  }

  render() {
    return html` <div id="popup-wrapper">
      <div id="page-title">
        <div id="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M263.41 386.509c17.477-2.091 40.142-6.242 62.914-12.162-30.231-4.022-59.352-9.399-81.375-14.323-14.129-3.204-25.182-6.129-32.441-8.78-34.009-12.411-54.3-45.603-54.219-80.923 0-10.789 1.863-21.889 5.803-32.7 5.938-16.382 16.336-28.894 29.073-36.739 2.518-1.553 5.135-2.895 7.785-4.104-5.103-4.088-9.812-8.244-13.949-12.364 0 0-17.789-28.629-26.161-92.382-5.348-40.678-55.904-49.182-76.113-28.939-33.241 33.259-30.102 46.959-30.102 46.959s26.748-6.312 33.911-2.161c12.443 7.162 9.55 57.966-3.957 126.851-9.826 50.299-.065 97.88 101.654 123.942 2.256 3.106 4.757 5.983 7.439 8.666 7.604 11.133 22.041 30.968 34.992 41.039l-6.427 25.804-58.715 11.148 4.203 22.042 63.064-11.967 45.896 13.963 6.542-21.473-38.377-11.654 6.427-25.835c5.428-5.461 9.204-15.272 12.133-23.908zm192.235-51.57c-3.76-5.101-9.809-11.248-17.428-17.723-15.323-12.98-36.89-27.256-59.633-40.632-45.391-26.766-96.274-50.407-112.82-56.376-10.155-3.713-20.601-5.678-30.299-5.678-11.119 0-21.11 2.521-29.138 7.526-8.027 5.032-14.486 12.457-18.804 24.129-2.927 8.048-4.315 16.223-4.315 24.134.082 26.1 14.683 49.12 37.852 57.527 5.166 1.896 15.842 4.806 29.365 7.847 13.539 3.043 30.136 6.312 48.038 9.253 35.776 5.969 76.917 10.796 109.42 10.757 12.134 0 23.041-.686 31.771-2.075 8.766-1.357 15.273-3.645 18.28-5.671 1.995-1.342 2.323-2.097 2.422-2.292.031-.196.064-.359.097-.719.098-1.013-.949-4.888-4.808-10.007z"
            />
          </svg>
        </div>
        <span>${this.pageTitle}</span>
      </div>
      ${this.publicationId
        ? this.showVersionAndVariantTemplate()
        : this.chooseVariantAndVersionTemplate()}
      <div class="date-input-wrapper" id="start-date-input-wrapper">
        <span class="input-label">Publish on</span>
        <div class="input-flex">
          <uui-textfield
            ?disabled=${!this.version}
            type="datetime-local"
            .value=${this.publishDate
              ? UmbPublicationPopupElement._serializeDateforInput(
                  this.publishDate,
                )
              : ''}
            @input=${this.changeStartDate}
            .min=${UmbPublicationPopupElement._serializeDateforInput(
              new Date(),
            )}
            .max=${this.unpublishDate
              ? UmbPublicationPopupElement._serializeDateforInput(
                  this.unpublishDate,
                )
              : ''}
          ></uui-textfield
          ><uui-button
            title="Remove publication"
            look="danger"
            @click=${this.changeStartDate}
            >x</uui-button
          >
        </div>
      </div>
      <div class="date-input-wrapper">
        <span class="input-label">Unpublish on</span>
        <div class="input-flex">
          <uui-textfield
            ?disabled=${!this.version}
            type="datetime-local"
            .value=${this.unpublishDate
              ? UmbPublicationPopupElement._serializeDateforInput(
                  this.unpublishDate,
                )
              : ''}
            @input=${this.changeEndDate}
            .min=${this.publishDate
              ? UmbPublicationPopupElement._serializeDateforInput(
                  this.publishDate,
                )
              : ''}
          ></uui-textfield
          ><uui-button look="danger" @click=${this.changeEndDate}>x</uui-button>
        </div>
      </div>
      <uui-button id="close-button" @click=${this.validateOnClose}
        >x</uui-button
      >
    </div>`;
  }
}
