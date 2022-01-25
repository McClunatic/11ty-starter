let collection = await fetch("/index.json")
  .then(response => response.json())

collection = collection.map(entry => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(entry.templateContent, "text/html")
    return {...entry, content: doc.body.innerText.replace(/\n/, ' ')}
  })

const idx = lunr(function() {
  this.ref("id")
  this.field("url")
  this.field("title")
  this.field("templateContent")
  this.field("content")

  this.metadataWhitelist = ["position"]

  for (const entry of collection) {
    this.add(entry, this)
  }
})

function logMatches(event) {
  event.preventDefault()
  const input = event.target.children['site-search']
  const results = idx.search(`content:${input.value}`)
  results.forEach(res => {
    for ( const [key, value] of Object.entries(res.matchData.metadata)) {
      const url = collection[res.ref].url
      for (const [start, end] of value.content.position) {
        console.log(`${key}: ${url}: ...${collection[res.ref].content.slice(
          Math.max(0, start - 20),
          start + end + 20,
        )}...`)
      }
    }
  })
  input.value = ''
}

export default logMatches
