const navigation = require("@11ty/eleventy-navigation")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const toc = require("eleventy-plugin-toc")
const md = require("markdown-it")().use(require("markdown-it-anchor"))

module.exports = function(eleventyConfig) {

  ["sans", "sans-mono", "sans-jp", "serif", "serif-jp"].map(suffix => {
    const src = `node_modules/@fontsource/noto-${suffix}`
    const dst = `css/fonts/noto-${suffix}`
    eleventyConfig.addPassthroughCopy({[src]: dst})
  })
  const prismSrc = 'node_modules/prismjs/themes'
  const prismDst = 'css/prismjs'
  eleventyConfig.addPassthroughCopy({[prismSrc]: prismDst})

  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addPlugin(navigation)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(toc)

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
