---
layout: base.html
tags: page
title: Navigation
parent: details
order: 5
---

# Navigation

Site navigation can come in two flavors: site level and page level.
This site demonstrates both.

## Adding site navigation

For site navigation, Eleventy users need look no further than its official
[11ty navigation plugin](https://www.11ty.dev/docs/plugins/navigation/#navigation-plugin).
You can add it as a developer dependency by running:

```shell-session
npm i -D @11ty/eleventy-nagivation
```

Adding the plugin to our `.eleventy.js` looks just like our
snippet for syntax highlighting:

```js
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
};
```

With the plugin available, you'll have access to several handy filters
for use site templates. An example of use from our site, which uses
**Liquid** as its template language is below.

```html
    <!-- snip -->
  <body>
    <nav>
      {{ collections.page | eleventyNavigation | eleventyNavigationToHtml }}
    </nav>
    <main class="markdown">
      {{ content }}
    </main>
  </body>
    <!-- snip -->
```

Here, all pages that include the `page` tag will be added inside the
navigation element, with the `eleventyNavigation` filter picking out
navvigation content and the `eleventyNavigationToHtml` filter rendering
that content as HTML.

## Adding breadcrumbs

The same plugin supports breadcrumbs too! Again, the following example
from this site uses **Liquid** syntax:

```html
    <!-- snip -->
    <nav class="breadcrumbs flex col-span-full p-4">
      {% assign crumbs = collections.page | eleventyNavigationBreadcrumb: eleventyNavigation.key %}
      {{ crumbs | eleventyNavigationToHtml }}
    </nav>
```

Note too, the `eleventyNavigationBreadcrumb` filter supports further options,
allowing for example for you to include or exclude the current page
in the breadcrumbs list.

## Adding page level navigation

Navigation within a page is often offered to visitors in the form of a
table of contents. There's no official plugin for this, but the community
has a great option:
[eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc).

This plugin requires your headings to have anchor IDs. This site uses
Markdown, so it ensures headings are given anchors by adding a couple
extra packages to its dependencies:

* [markdown-it](https://github.com/markdown-it/markdown-it)
* [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor)

You can install them all by running:

```shell-session
npm i -D @11ty/eleventy-nagivation
npm i -D markdown-it
npm i -D markdown-it-anchor
```

Updating the `.eleventy.js` configuration is more involved here, but
the documentation is helpful:

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

Once added to `.eleventy.js`, you'll have access to another filter,
`toc`, that's demonstrated in our site with a usage like this:

```html
    <!-- snip -->
  <aside>
    <p>On this page</p>
    {{ content | toc }}
  </aside>
    <!-- snip -->
```

Our navigation is up and running! Only one more feature to demonstrate,
and its the most ambitious yet: [site search](/search/)!
