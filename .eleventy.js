const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")

module.exports = function(eleventyConfig) {

  ["sans", "sans-mono", "sans-jp", "serif", "serif-jp"].map(suffix => {
    const src = `node_modules/@fontsource/noto-${suffix}`
    const dst = `css/fonts/noto-${suffix}`
    eleventyConfig.addPassthroughCopy({[src]: dst})
  })
  eleventyConfig.addPassthroughCopy('src/assets')

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
