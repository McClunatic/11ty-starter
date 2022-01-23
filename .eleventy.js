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
  const lunrDst = 'js/lunr.min.js'
  eleventyConfig.addPassthroughCopy({[lunrSrc]: lunrDst})

  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addPlugin(navigation)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(toc)

  eleventyConfig.addFilter('indexify', collection => {
    const idx = lunr(function() {
      this.ref("id")
      this.field("url")
      this.field("title")
      this.field("content")

      this.metadataWhitelist = ["position"]

      let id = 0
      for (const entry of collection) {
        content = HTMLParser.parse(entry.templateContent).rawText
          .replace(/\n/g, '\\n')
          .replace(/"/g, String.raw`\"`)

        this.add({
          id: id,
          url: entry.url,
          title: entry.data.title,
          content: content,
        }, this)
        id += 1
      }
    })
    return JSON.stringify(idx)
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
