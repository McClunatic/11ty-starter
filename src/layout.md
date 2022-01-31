---
layout: base.html
tags: page
title: Layout
parent: details
order: 1
---

# Layout

Eleventy includes a feature called **Layouts**, which are special
templates that can be used to wrap other content.

## Creating a layout

Layouts can contain any type of text. A common choice for static
sites will be to use HTML. A simple layout written using
[Liquid](https://www.11ty.dev/docs/languages/liquid/)
might look like this:

`awesome-layout.html`

```html
---
title: Awesome Site Great Job
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content }}
  </body>
</html>
```

The layout template will populate the `title` and `content` data with
child template content when used.

## Using a layout

We could wrap our first Markdown page by writing it like this:

```md
___
layout: awesome-layout.html
title: Title the Great
---
# {{ title }}
```

This combination would produce a page that looks like this:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title the Great</title>
  </head>
  <body>
    <h1>Title the Great</h1>
  </body>
</html>
```

For more information about layouts and about computed data, please be
sure to check out the
[Eleventy Documentation](https://www.11ty.dev/docs/)! Continue reading
to learn how [styles were applied](/styles/).
