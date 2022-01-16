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

Adding fonts as developer dependencies is simple, and well documented at
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
