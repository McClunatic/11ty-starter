# Eleventy: A Demo

This repo follows the steps of 11ty's
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
*will serve from* `dist/` *as the root*. I therefore set `href` to
`/output.css`, so that when we run

```bash
$ npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

the server picks up the CSS properly. I could alternatively have
`tailwindcss` write the output in the `src/` tree and use

```js
  eleventyConfig.addPassthroughCopy("css/output.css");
```

in `.eleventy.js`, but having `tailwindcss` handle relocation to `dist/`
directory seems more straightforward.
