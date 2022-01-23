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

export { collection, idx }
