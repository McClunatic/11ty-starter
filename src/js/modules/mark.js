function highlightTerms() {
  const params = (new URL(document.location)).searchParams
  if (!params.has('highlight'))
    return

  const term = params.get('highlight')
  const instance = new Mark(document.querySelector('body > div'))
  instance.mark(term, { className: 'highlight' })
}

export default highlightTerms
