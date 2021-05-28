import { css, html } from 'lit';

export abstract class UmbSchedulerIcons {
  static styles = [
    css`
      .icon {
        display: inline-flex;
        width: 1.5em;
        aspect-ratio: 1;
        margin: 0 0.2em;
        fill: currentColor;
      }
    `,
  ];

  static calendarIconTemplate() {
    return html`<div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M342.391 352.428h-44.879v44.865h44.879v-44.865zm-63.234-120.071h-44.849v44.853h44.849v-44.853zm63.234 60.034h-44.879v44.859h44.879v-44.859zm63.174-60.034h-44.854v44.853h44.854v-44.853zm-126.408 60.034h-44.849v44.859h44.849v-44.859zm63.234-60.034h-44.879v44.853h44.879v-44.853zm63.174 60.034h-44.854v44.859h44.854v-44.859zm-252.803 60.037h-44.856v44.865h44.856v-44.865zm0-60.037h-44.856v44.859h44.856v-44.859zM394.024 74.208v19.691c7.737 6.847 12.642 16.825 12.642 27.969 0 20.634-16.732 37.367-37.369 37.367-20.642 0-37.367-16.733-37.367-37.367 0-11.147 4.903-21.124 12.643-27.969V74.208H169.97v19.691c7.739 6.847 12.643 16.825 12.643 27.969 0 20.634-16.732 37.367-37.369 37.367-20.64 0-37.367-16.733-37.367-37.367 0-11.147 4.904-21.124 12.642-27.969V74.208h-83.27v397.644h436.668V74.208h-79.893zm40.011 357.759H77.131V183.544h356.904v248.423zm-218.047-199.61h-44.881v44.853h44.881v-44.853zm0 120.071h-44.881v44.865h44.881v-44.865zm63.169 0h-44.849v44.865h44.849v-44.865zm-63.169-60.037h-44.881v44.859h44.881v-44.859zM145.245 143.64c10.273 0 18.603-8.326 18.603-18.599V58.035c0-10.267-8.329-18.6-18.603-18.6-10.274 0-18.602 8.333-18.602 18.6v67.006c0 10.272 8.328 18.599 18.602 18.599zm224.054 0c10.272 0 18.601-8.326 18.601-18.599V58.035c0-10.267-8.328-18.6-18.601-18.6-10.274 0-18.604 8.333-18.604 18.6v67.006c0 10.272 8.329 18.599 18.604 18.599z"
        />
      </svg>
    </div>`;
  }

  static clockIconTemplate() {
    return html`<div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M255.169 37.716c120.399 0 217.999 97.602 217.999 217.999 0 120.394-97.6 217.996-217.999 217.996-120.397 0-217.998-97.603-217.998-217.996 0-120.398 97.601-217.999 217.998-217.999m0 66.173c-83.716 0-151.826 68.108-151.826 151.826 0 83.715 68.11 151.826 151.826 151.826s151.826-68.111 151.826-151.826c0-83.718-68.11-151.826-151.826-151.826zm39.456 219.541l-58.234-60.113V142.313c0-10.371 8.405-18.775 18.779-18.775 10.371 0 18.78 8.405 18.78 18.775l-.005 105.793 47.654 49.194c7.217 7.447 7.03 19.334-.424 26.553a18.716 18.716 0 0 1-13.064 5.289 18.706 18.706 0 0 1-13.486-5.712z"
        />
      </svg>
    </div>`;
  }

  static infinityIconTemplate() {
    return html`<div
      class="icon"
      title="This publication does not have end date"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M144.192 365.176c-30.411.028-58.092-12.29-77.808-32.163-19.769-19.823-31.875-47.417-31.855-77.495.006-30.666 13.191-58.16 33.137-77.709 19.949-19.572 47.099-31.912 76.526-31.964 21.957-.063 41.812 5.919 58.365 15.51 16.62 9.567 30.071 22.332 41.774 35.899 4.18 4.885 8.168 9.896 12.011 14.953 2.728-3.65 5.52-7.273 8.397-10.841 14.787-18.177 32.267-35.504 55.794-46.071 13.375-5.997 28.59-9.476 44.9-9.444 59.838.165 109.449 48.753 109.666 109.667-.027 30.944-13.744 58.391-33.771 77.801-20.084 19.418-46.949 31.766-75.895 31.857h-.395c-21.291 0-40.588-6.099-56.568-15.703-16.146-9.646-29.146-22.399-40.549-35.914-4.016-4.809-7.868-9.729-11.59-14.703a358.626 358.626 0 0 1-8.685 11.013c-15.163 18.261-33.293 35.575-57.458 46.005-13.735 5.928-29.285 9.33-45.996 9.302m0-50.078c13.286-.059 23.464-3.195 33.416-8.849 9.887-5.654 19.406-14.249 28.803-25.169 6.63-7.616 13.056-16.305 19.557-25.554-5.619-8.004-11.186-15.582-16.897-22.414-12.52-15.151-25.101-26.172-38.647-31.945-7.807-3.329-16.09-5.213-26.23-5.236-15.042-.046-30.208 6.55-41.445 17.607-11.251 11.088-18.148 25.896-18.137 41.979.112 33.131 26.018 59.493 59.58 59.581m159.404-36.982c12.309 15.229 24.549 26.246 37.32 31.886 7.362 3.254 15.051 5.062 24.518 5.096 14.094.092 29.533-6.506 41.008-17.709 11.523-11.221 18.6-26.081 18.576-41.871-.008-16.369-6.722-31.133-17.706-42.08-11.005-10.909-25.895-17.519-41.878-17.507-12.384.069-21.808 3.066-31.295 8.636-9.406 5.588-18.658 14.185-27.88 25.158-6.534 7.687-12.916 16.467-19.427 25.813 5.612 8.06 11.135 15.698 16.764 22.578z"
        />
      </svg>
    </div>`;
  }

  static pasteIconTemplate() {
    return html`<div class="icon" title="Paste date">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M380.295 95.092h-68.479a54.17 54.17 0 0 0 .097-3.321c0-30.805-24.948-55.743-55.722-55.743-30.803 0-55.756 24.938-55.756 55.743 0 1.112.065 2.208.098 3.321h-68.446v57.766h248.208V95.092zm-124.104 21.76c-13.865-.033-25.049-11.232-25.079-25.081.03-13.862 11.214-25.081 25.079-25.1 13.834.019 25.083 11.237 25.083 25.1 0 13.848-11.249 25.047-25.083 25.081zm149.053 13.787v48.676H107.172v-48.676H79.537v345.078h353.307V130.639h-27.6z"
        />
      </svg>
    </div>`;
  }
}