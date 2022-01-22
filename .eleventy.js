const navigation = require("@11ty/eleventy-navigation")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {

  ["sans", "sans-mono", "sans-jp", "serif", "serif-jp"].map(suffix => {
    const src = `node_modules/@fontsource/noto-${suffix}`
    const dst = `css/fonts/noto-${suffix}`
    eleventyConfig.addPassthroughCopy({[src]: dst})
  })
  const prismSrc = 'node_modules/prismjs/themes'
  const prismDst = 'css/prismjs'
  eleventyConfig.addPassthroughCopy({[prismSrc]: prismDst})

  eleventyConfig.addPlugin(navigation)
  eleventyConfig.addPlugin(syntaxHighlight)

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
