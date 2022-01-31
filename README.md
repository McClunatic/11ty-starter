# Eleventy: A Demo

This repo follows the steps of **11ty**'s
[getting started](https://www.11ty.dev/docs/getting-started/)
documentation.

# Beyond Getting Started

## Configuring input and output directories

This was pretty simple. I just added an `.eleventy.js`
file to the repository root and added the following code:

```js
module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
};
```

This reflects my preference to have the site source content in
`src` and the output written to `dist`.

## Adding Tailwind CSS

I installed `tailwindcss` via **npm** as suggested in the
[Tailwind CSS installation guidance](https://tailwindcss.com/docs/installation).
I made only one adjustment to the modifications they suggested to source
code files: in `src/index.html`, the `href` is documented to refer
to `/dist/output.css`. This `dist/` prefix aligns with our choice of output
directory [above](#configuring-input-and-output-directories), but
running

```bash
$ npx @11ty/eleventy --serve
```
*will serve from* `dist/` *as the root*. I chose set `href` to
`/css/output.css` and to similarly nest `input.css` at
`src/css/input.css`, so that when we run

```bash
$ npx tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch
```

the server picks up the CSS properly. I could alternatively have
`tailwindcss` write the output in the `src/` tree and use

```js
  eleventyConfig.addPassthroughCopy("css/output.css");
```

in `.eleventy.js`, but having `tailwindcss` handle relocation to `dist/`
directory seems more straightforward.

## Getting VS Code to Recognize Tailwind's `@apply`

Visual Studio (VS) Code won't recognize `@apply` out of the box. Instead,
you'll see a warning from the CSS Language Server:
`Unknown at rule @apply css(unknownAtRules)`. Fortunately, VS Code
supports
[Custom Data for its CSS Language Service](https://github.com/Microsoft/vscode-css-languageservice/blob/main/docs/customData.md). In this repository, I committed settings in a `.vscode/`
directory to specify a custom data file that defines three Tailwind CSS
directives:

* `@tailwind`
* `@layer`
* `@apply`

## Adding fonts using `@fontsource` packages

Adding fonts as developer dependencies is well documented at
the [Fontsource Getting Started](https://fontsource.org/docs/getting-started)
page. I selected five fonts:

* Noto Sans
* Noto Sans Mono
* Noto Sans JP
* Noto Serif
* Noto Serif JP

However, **11ty** does not do bundling. To make the CSS and fonts
files available in the distribution, I updated `.eleventy.js` to
include:

```js
  /* clip */

  ["sans", "sans-mono", "sans-jp", "serif", "serif-jp"].map(suffix => {
    const src = `node_modules/@fontsource/noto-${suffix}`
    const dst = `css/fonts/noto-sans${suffix}`
    eleventyConfig.addPassthroughCopy({[src]: dst})
  })

  /* clip */
```

## Adding navigation

I leaned on the official
[11ty navigation plugin](https://www.11ty.dev/docs/plugins/navigation/#navigation-plugin)
for this. Setup was simple. Installation:

```bash
npm i -D @11ty/eleventy-nagivation
```

Addition to `.eleventy.js`:

```js
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
};
```

From there, I just adjusted my base layout (`base.html`) to arrange the
`<body>` like this:

```html
    <!-- snip -->
  <body>
    <nav>
      {{ collections.all | eleventyNavigation | eleventyNavigationToHtml }}
    </nav>
    <main class="markdown">
      {{ content }}
    </main>
  </body>
    <!-- snip -->
```

# Adding a table of contents

Not on the official plugins list, I used
[eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc)
to add a table of contents to the page. Note, headings will need to have
anchor IDs for this to work, so I used
[markdown-it](https://github.com/markdown-it/markdown-it) and
[markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) too:


```js
const toc = require("eleventy-plugin-toc")
const anchor = require("markdown-it-anchor")
const md = require("markdown-it")().use(anchor, {
  permalink: anchor.permalink.headerLink()
})

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', md)
  eleventyConfig.addPlugin(toc)
};
```

Once added to `.eleventy.js`, I added a table of contents to the
base layout (`base.html`) like this:

```html
    <!-- snip -->
  <aside>
    <p>On this page</p>
    {{ content | toc }}
  </aside>
    <!-- snip -->
```

## Adding syntax highlighting

Another job for another official plugin, I added
[eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight)
to `.eleventy.js`:

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
};
```

This plugin doesn't add [PrismJS](https://prismjs.com/index.html) themes
for you, so I added that to the package as well, and selected
Okaidia as my theme in `input.css`:

```css
@import url("prismjs/prism-okaidia.min.css");
```

## Adding site search

This was a bit of a trick! I decided to use
[lunr.js](https://lunrjs.com/) for this.

### Preparing data for a Lunr index

Lunr requires you to create an index to enable search, and I decided to
do that at build time rather than a runtime. I added `lunr.liquid`
as a template to my `src/` files with the following contents:

```liquid
---
permalink: /index.json
---
{{ collections.page | indexify }}
```

I elected to aggregate the data needed to build a Lunr index into
a site `/index.json` file. Note here that my index will include
references to all pages in my `page` collection. The `indexify`
filter is a custom filter I added to `.eleventy.js`:

```js
module.exports = function(eleventyConfig) {
  // snip
  eleventyConfig.addFilter('indexify', collection => {
    return JSON.stringify(collection.map((entry, id) => (
      {
        id: id,
        url: entry.url,
        title: entry.data.title,
        templateContent: entry.templateContent,
      }
    )))
  })
  // snip
}
```

## Creating a Lunr index

With `/index.json` is prepared at build time, I left the work
to build the Lunr index to run time. I added `lunr.min.js` as
a runtime asset by adding it as a developer dependency for
pass through copy in `.eleventy.js`:

```js
module.exports = function(eleventyConfig) {
  // snip
  const lunrSrc = 'node_modules/lunr/lunr.min.js'
  const lunrDst = 'js/external/lunr.min.js'
  eleventyConfig.addPassthroughCopy({[lunrSrc]: lunrDst})
  eleventyConfig.addPassthroughCopy({'src/js': 'js'})
  // snip
}
```

I then embedded it the `base.html` layout in the `<body>`:

```html
      <script src="/js/external/lunr.min.js"></script>
```

The remainder of the work is left to custom JavaScript
added to the project. In `.eleventy.js`:

```js
module.exports = function(eleventyConfig) {
  // snip
  eleventyConfig.addPassthroughCopy({'src/js': 'js'})
  // snip
}
```

In `.base.html`:

```html
      <script type="module" src="/js/main.js"></script>
```

In `src/js/main.js`:

```js
import { setSearchResults } from './modules/lunr.js'
```

And finally in `src/js/modules/lunr.js`, `setSearchResults()`
handles index creation:

```js
let collection = await fetch("/index.json")
  .then(response => response.json())

collection = collection.map(entry => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(entry.templateContent, "text/html")
    return {...entry, content: doc.body.innerText.replace(/\n/, ' ')}
  })

const idx = lunr(function() {
  this.ref("id")
  this.field("url")
  this.field("title")
  this.field("templateContent")
  this.field("content")

  this.metadataWhitelist = ["position"]

  for (const entry of collection) {
    this.add(entry, this)
  }
})
```

Note: The "whitelisting" of position makes available the location of
matches within searched content. It's not currently used in
this site but the data is captured so that it might be.

### Adding search to the site

Site search is added to the `base.html` as a form:

```html
  <form>
    <label for="search-input">Search</label>
    <input id="search-input" type="search" />
  </form>
```

In `src/js/modules/lunr.js`, search is implemented:

```js
function setSearchResults(event) {
  event.preventDefault()
  const input = event.target.children['search-input']
  const ul = document.querySelector('#search-results')
  ul.innerHTML = ''
  const results = idx.search(`content:${input.value}`)
  // snip
}
```

And finally in `src/js/main.js`:

```js
// snip
const form = document.querySelector('form')
form.addEventListener('submit', setSearchResults)
```

### Displaying search results

The `setSearchResults()` function also handles creation of
`<li>` elements; once all results are generated, it exposes
those results in a modal dialog for the user:

```js
function setSearchResults(event) {
  // snip
  document.querySelector('#search-dialog').showModal()
  document.querySelector('body > div').classList.add('modal-open')
}
```

In the `base.html` layout:

```html
  <dialog id="search-dialog">
    <button id="search-close">
    </button>
    <ul id="search-results"></ul>
  </dialog>
```

### Highlighting search results

As a little flourish, search results are highlighted on results pages
with help from [mark.js](https://markjs.io/).

The `setSearchResults()` function includes in results URLs
a `highlight` parameter via query string:

```js
  // snip
  for (const [term, value] of Object.entries(res.matchData.metadata)) {
    // snip
    const params = new URLSearchParams({
      highlight: [input.value, term]
    })
    a.setAttribute('href', `${page.url}?${params.toString()}`)
    // snip
```

That data is used in `src/js/modules/mark.js`:

```js
function highlightTerms() {
  const params = (new URL(document.location)).searchParams
  if (!params.has('highlight'))
    return

  const terms = params.get('highlight').split(',')
  const instance = new Mark(document.querySelector('body > div'))
  instance.mark(terms, { className: 'highlight' })
}
```

Where `highlightTerms()` is finally put to use in `src/js/main.js`:

```js
if(document.readyState !== 'loading') {
  highlightTerms()
} else {
  document.addEventListener('DOMContentLoaded', function() {
    highlightTerms()
  })
}
```
