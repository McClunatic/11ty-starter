---
layout: base.html
tags: page
title: Fonts
parent: details
order: 3
---

# Fonts

Fonts are often obtained from a CDN. To allow for easier offline use,
this site instead leans on local assets, courtesy of
[Fontsource](https://fontsource.org/). Adding fonts as developer
dependencies is well documented at the
[Fontsource Getting Started](https://fontsource.org/docs/getting-started)
page. This site includes the assets for five:

* Noto Sans
* Noto Sans Mono
* Noto Sans JP
* Noto Serif
* Noto Serif JP

To make the CSS and fonts files available in the distribution, the
site `.eleventy.js` configuration includes:

```js
module.exports = function(eleventyConfig) {
  /* clip */

  ["sans", "sans-mono", "sans-jp", "serif", "serif-jp"].map(suffix => {
    const src = `node_modules/@fontsource/noto-${suffix}`
    const dst = `css/fonts/noto-sans${suffix}`
    eleventyConfig.addPassthroughCopy({[src]: dst})
  })

  /* clip */
```

Next up: [syntax highlighting!](/syntax/)
