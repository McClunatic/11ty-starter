module.exports = {
  eleventyNavigation: {
    key: data => data.title?.toLowerCase().replaceAll(' ', '-'),
    title: data => data.title,
    parent: data => data.parent,
    order: data => data.order || 0,
  },
}