import { collection, idx } from './modules/lunr-idx.js'

const form = document.querySelector('form')
form.addEventListener('submit', function(event) {
  const input = event.target.children['site-search']
  const results = idx.search(`content:${input.value}`)
  results.forEach(res => {
    for ( const value of Object.values(res.matchData.metadata)) {
      const url = collection[res.ref].url
      for (const [start, end] of value.content.position) {
        console.log(`${url}: ...${collection[res.ref].content.slice(
          Math.max(0, start - 20),
          start + end + 20,
        )}...`)
      }
    }
  })
  input.value = ''
  event.preventDefault()
})
