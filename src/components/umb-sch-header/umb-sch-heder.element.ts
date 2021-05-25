import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';

// eslint-disable-next-line import/extensions

export class UmbSchedulerHeaderElement extends connect(store)(LitElement) {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--uui-interface-chosen);
        color: var(--uui-interface-chosen-contrast);
        padding: 1rem;
        font-weight: bold;
      }

      #page-name {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
      }

      #icon {
        display: inline-block;
        fill: var(--uui-interface-chosen-contrast);
        width: 32px;
        margin-right: 0.4em;
      }
    `,
  ];

  @property()
  pageName = 'Your page name';

  render() {
    return html`<div id="page-name">
        <div id="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M263.41 386.509c17.477-2.091 40.142-6.242 62.914-12.162-30.231-4.022-59.352-9.399-81.375-14.323-14.129-3.204-25.182-6.129-32.441-8.78-34.009-12.411-54.3-45.603-54.219-80.923 0-10.789 1.863-21.889 5.803-32.7 5.938-16.382 16.336-28.894 29.073-36.739 2.518-1.553 5.135-2.895 7.785-4.104-5.103-4.088-9.812-8.244-13.949-12.364 0 0-17.789-28.629-26.161-92.382-5.348-40.678-55.904-49.182-76.113-28.939-33.241 33.259-30.102 46.959-30.102 46.959s26.748-6.312 33.911-2.161c12.443 7.162 9.55 57.966-3.957 126.851-9.826 50.299-.065 97.88 101.654 123.942 2.256 3.106 4.757 5.983 7.439 8.666 7.604 11.133 22.041 30.968 34.992 41.039l-6.427 25.804-58.715 11.148 4.203 22.042 63.064-11.967 45.896 13.963 6.542-21.473-38.377-11.654 6.427-25.835c5.428-5.461 9.204-15.272 12.133-23.908zm192.235-51.57c-3.76-5.101-9.809-11.248-17.428-17.723-15.323-12.98-36.89-27.256-59.633-40.632-45.391-26.766-96.274-50.407-112.82-56.376-10.155-3.713-20.601-5.678-30.299-5.678-11.119 0-21.11 2.521-29.138 7.526-8.027 5.032-14.486 12.457-18.804 24.129-2.927 8.048-4.315 16.223-4.315 24.134.082 26.1 14.683 49.12 37.852 57.527 5.166 1.896 15.842 4.806 29.365 7.847 13.539 3.043 30.136 6.312 48.038 9.253 35.776 5.969 76.917 10.796 109.42 10.757 12.134 0 23.041-.686 31.771-2.075 8.766-1.357 15.273-3.645 18.28-5.671 1.995-1.342 2.323-2.097 2.422-2.292.031-.196.064-.359.097-.719.098-1.013-.949-4.888-4.808-10.007z"
            />
          </svg>
        </div>
        <span>${this.pageName}</span>
      </div>
      <div>Schedule publishing</div>`;
  }
}
