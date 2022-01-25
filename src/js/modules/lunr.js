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

function logSearchResults(event) {
  event.preventDefault()
  const input = event.target.children['search-input']
  const results = idx.search(`content:${input.value}`)
  results.forEach(res => {
    for (const [key, value] of Object.entries(res.matchData.metadata)) {
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

function setSearchResults(event) {
  event.preventDefault()
  const input = event.target.children['search-input']
  const ul = document.querySelector('#search-results')

  ul.innerHTML = ''

  const results = idx.search(`content:${input.value}`)

  if (results.length === 0) {
      const li = document.createElement('li')
      const text = document.createTextNode('No results found')
      li.appendChild(text)
      ul.appendChild(li)
  }

  results.forEach(res => {
    const page = collection[res.ref]
    for (const [term, value] of Object.entries(res.matchData.metadata)) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      const params = new URLSearchParams({
        highlight: [input.value, term]
      })
      a.setAttribute('href', `${page.url}?${params.toString()}`)
      const count = value.content.position.length
      const text = document.createTextNode(
        `${page.title}: ${count} match${count === 1 ? '' : 'es'}`
      )
      a.appendChild(text)
      li.appendChild(a)
      ul.appendChild(li)
    }
  })

  document.querySelector('#search-dialog').showModal()
  document.querySelector('body > div').classList.add('modal-open')
}

export { logSearchResults, setSearchResults }
