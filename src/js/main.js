import { collection, idx } from './modules/lunr-idx.js'

const input = document.querySelector('#site-search')
input.addEventListener('change', function(event) {
  const results = idx.search(`content:${event.target.value}`)
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
  event.preventDefault()
})
