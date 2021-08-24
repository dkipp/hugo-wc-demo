// @ts-nocheck
customElements.define('my-alpine-counter', class extends HTMLElement {

  constructor() {
    super();
    this.count = 0;
    this.template = document.createElement('template');
    {{ with resources.Get "components/MyAlpineCounter/template.html" }}
    this.template.innerHTML = `{{- .Content -}}`;
    {{ end }}
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
  }
});