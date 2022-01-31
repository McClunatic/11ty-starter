---
layout: base.html
tags: page
title: Syntax highlighting
parent: details
order: 4
---

# Syntax highlighting

A popular syntax highlighter is [PrismJS](https://prismjs.com/index.html):
a lightweight and extensible option with modern web standards in mind.

## Adding PrismJS

Eleventy has a list of official [plugins](https://www.11ty.dev/docs/plugins/)
that introduce custom code for a variety of features. One such plugin
does the heavy lifting for adding syntax highlighting:
[eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight).

You can add it as a developer dependency by running:

```shell-session
npm i -D @11ty/eleventy-plugin-syntaxhighlight
```

The site makes use of the plugin by adding it to its `.eleventy.js`
configuration:

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
};
```

## Selecting a theme

This plugin doesn't add [PrismJS](https://prismjs.com/index.html) themes
for you, but using PrismJS in concert with Tailwind CSS means the
site only needs a single line added to its `input.css`. This site
uses the Okaidia theme:

```css
@import url("prismjs/prism-okaidia.min.css");
```

With styles, fonts, and syntax highighting, the site has all the basics!
Next we'll see another plugin, this time to introduce
[navigation](/navigation/).
