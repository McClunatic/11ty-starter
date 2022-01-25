function highlightTerms() {
  const params = (new URL(document.location)).searchParams
  if (!params.has('highlight'))
    return

  const terms = params.get('highlight').split(',')
  const instance = new Mark(document.querySelector('body > div'))
  instance.mark(terms, { className: 'highlight' })
}

export default highlightTerms
