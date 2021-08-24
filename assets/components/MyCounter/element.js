// @ts-nocheck
customElements.define('my-counter', class extends HTMLElement {

  constructor() {
    super();
    this.count = 0;
    this.template = document.createElement('template');
    {{ with resources.Get "components/MyCounter/template.html" }}
    this.template.innerHTML = `{{- .Content -}}`;
    {{ end }}
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector('#inc').onclick = () => this.inc();
    this.querySelector('#dec').onclick = () => this.dec();
    this.update(this.count);
  }

  inc() {
    this.update(++this.count);
  }

  dec() {
    this.update(--this.count);
  }

  update(count) {
    this.querySelector('#count').innerHTML = count;
  }
});