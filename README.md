# hugo-wc-demo
 
This is my aproach to building and useing WebComponents within a HUGO site.

Within the html head im looping all available components and combine theme to a single js file:

```
// layouts/_default/baseof.html
{{ "<!-- Components -->" | safeHTML }}
{{ $components := resources.Match "components/**.js" }}
{{ $components = $components | resources.Concat "temp.js" | resources.ExecuteAsTemplate "components.js" . }}
<script src="{{- $components.RelPermalink -}}"></script>
```

each component is a single javascript file or a folder with the javascript and optional resources like html and css

## Example 1: Counter component with resources:
```javascript
// assets/components/MyCounter/element.js
customElements.define('my-counter', class extends HTMLElement {

  constructor() {
    super();
    this.count = 0;
    this.template = document.createElement('template');

    // using hugo to add the elements html :-)
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
  // ...truncated
});
```

### Things to note:
 - In the above example, HUGO is used to build the component. In this case just adding the template html.
 - No shadow DOM is used. This allows  the components to use the sites global tailwindcss classes.

```html
// assets/components/MyCounter/template.html
<button id="dec">-</button>
<span id="count" ></span>
<button id="inc">+</button>

```

### Example 2: Counter component with alpinejs:
/assets/components/MyAlpineCounter is an example of how alpine can be used too.

### Example 3: Single File Counter component with shadowDOM:
/assets/components/MyAlpineCounter is an example using shadowDom.
The tailwind css has no effect on the component.


## ToDo

### 1. Enable relative paths
I'd like to get rid of the absolote resource path in the javascript file:
```
current:
{{ with resources.Get "components/MyCounter/template.html" }}

goal:
{{ with resources.Get "./template.html" }}

```
For this to work, hugos pipes in 'layouts/_default/baseof.html' need to be updated (but I dont know how) Currently all files are combined and afterwards processed as Template. With this the access to the current file location is lost and absolute paths are required.


## Tailwind JIT
this example uses tailwind with 'mode: "jit"'. the generated css is included in this repository. You dont need to generate it yourself. the 'npm run dev' works for me on Windows. you propably need to adjust it, if you update the classes in this example.


I hope this helps