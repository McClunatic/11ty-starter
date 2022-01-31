---
layout: base.html
tags: page
title: Site search
parent: details
order: 6
---

# Site search

Site search on public sites is often powered by external options like
[Algolia](https://www.algolia.com/). To ensure our site will be
searchable even in offline (air-gapped) environments, we've used
a simpler alternative: [lunr.js](https://lunrjs.com/).

## Adding site search

Adding site search with
[lunr.js](https://lunrjs.com/) is a bit of a process. Let's walk
through the steps.

### Preparing data for a Lunr index

Lunr requires you to create an index to enable search, which we will
do at build time rather than runtime. This site uses `lunr.liquid`
as a template in its `src/` files with the following contents:

```liquid
---
permalink: /index.json
---
{{ collections.page | indexify }}
```

This [permalink](https://www.11ty.dev/docs/permalinks/)
serves to aggregate the data needed to build a Lunr index into
a site `/index.json` file. Note here that the index will include
references to all pages in the site's `page` collection. The `indexify`
filter is a custom filter in our `.eleventy.js`:

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

### Creating a Lunr index

With `/index.json` is prepared at build time, the work
to build the Lunr index is left to run time. We can add `lunr.min.js`
as a runtime asset by first installing lunr.js:

```shell-session
$ npm i -D lunr
```

And then adding it as a developer dependency for pass through copy
in `.eleventy.js`:

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

With it available as an asset, we'll make sure its available at
run time by  embedding it the `base.html` layout:

```html
    <script src="/js/external/lunr.min.js"></script>
```

We've got what we need to create the index. The remainder of the
work is left to site-custom JavaScript added to the project.
We add that JavaScript as asset in our `.eleventy.js`:

```js
module.exports = function(eleventyConfig) {
  // snip
  eleventyConfig.addPassthroughCopy({'src/js': 'js'})
  // snip
}
```

We load it in  our `.base.html`:

```html
      <script type="module" src="/js/main.js"></script>
```

And *finally*, we can create our index. In `src/js/main.js`:

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

Interested to learn more about the main `lunr()` function? Be sure
to check out the
[Lunr Getting Started Guide](https://lunrjs.com/guides/getting_started.html)!

### Adding search to the site

Site search is added to our `base.html` as a form:

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
with help from [mark.js](https://markjs.io/). We add that to our
package by running:

```shell-session
$ npm i -D mark.js
```

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

And... that's it! We're through our first site with Eleventy!
