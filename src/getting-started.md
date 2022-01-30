---
layout: base.html
tags: page
title: Getting started
order: 2
---

# Getting started

## Eleventy from scratch

If you'd like to get started with Eleventy from scratch, start by
creating a project directory:

```shell-session
$ mkdir new-project
$ cd new-project
```

Once in the project directory, create a `package.json` and
install `@11ty/eleventy` with **npm**:

```shell-session
$ npm init -y
$ npm install --save-dev @11ty/eleventy
```

## Running Eleventy

You don't need content to run Eleventy for the first time. You
can confirm that it installed correctly by running:

```shell-session
$ npx @11ty/eleventy
```

*If you haven't seen* `npx`
*before, it lets you run arbitrary npm package commands from*
locally *rather than just* globally *installed packages.*

## Creating templates

You can create template files in a variety of formats. To start
with a HTML and Markdown examples, copy the following into
`index.html`:

```html
<!doctype html>
<html>
  <head>
    <title>HTML title</title>
  </head>
  <body>
    <p>Hi!</p>
  </body>
</html>
```

And the following into `markdown.md`:

```md
# Markdown title
And hello!
```

With the template files created, try running Eleventy once more:

```shell-session
$ npx @11ty/eleventy
```

You should see two files processed!

## Serving your first templates

You can start up a hot-reloading web server with Eleventy by running:

```shell-session
$ npx @11ty/eleventy --serve
```

In your browser, navigate to
<http://localhost:8080/> or
<http://localhost:8080/markdown/> to see your first Eleventy site!
And since this server handles hot-reloading, you can make changes to
the HTML file and see those changes reflected in the browser
automatically.

*Note: Markdown files won't refresh automatically, but you*
*can change that! You'll just need to set up a* Layout,
*wrapping Markdown template content in a* `<body>` *tag.*
