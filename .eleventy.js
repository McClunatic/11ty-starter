const navigation = require("@11ty/eleventy-navigation")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const toc = require("eleventy-plugin-toc")
const anchor = require("markdown-it-anchor")
const md = require("markdown-it")().use(anchor, {
  permalink: anchor.permalink.headerLink()
})
const lunr = require('lunr')
const HTMLParser = require('node-html-parser')

module.exports = function(eleventyConfig) {

  ["sans", "sans-mono", "sans-jp", "serif", "serif-jp"].map(suffix => {
    const src = `node_modules/@fontsource/noto-${suffix}`
    const dst = `css/fonts/noto-${suffix}`
    eleventyConfig.addPassthroughCopy({[src]: dst})
  })
  const prismSrc = 'node_modules/prismjs/themes'
  const prismDst = 'css/prismjs'
  eleventyConfig.addPassthroughCopy({[prismSrc]: prismDst})
  const lunrSrc = 'node_modules/lunr/lunr.min.js'
  const lunrDst = 'js/external/lunr.min.js'
  eleventyConfig.addPassthroughCopy({[lunrSrc]: lunrDst})
  const markSrc = 'node_modules/mark.js/dist/mark.min.js'
  const markDst = 'js/external/mark.min.js'
  eleventyConfig.addPassthroughCopy({[markSrc]: markDst})
  eleventyConfig.addPassthroughCopy({'src/js': 'js'})
  eleventyConfig.addPassthroughCopy({'src/img': 'img'})

  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addPlugin(navigation)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(toc)

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

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
