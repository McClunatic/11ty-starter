---
layout: base.html
tags: page
title: Styles
parent: details
order: 2
---

# Styles

Eleventy asks that users bring their own styles, though there are a wealth
of [Starter Projects](https://www.11ty.dev/docs/starter/) that can save
developers the trouble of starting out on their own! This site instead
creates its own simple theme, using
[Tailwind CSS](https://tailwindcss.com/).

## Adding Tailwind

You can install `tailwindcss` via **npm** as suggested in the
[Tailwind CSS installation guidance](https://tailwindcss.com/docs/installation).
This site follows that guidance closely, making small adjustments:

1. We locate the main CSS file in `src/css/input.css`.
2. We specify the stylesheet `href` as `/css/output.css`.

Our site uses `src/` and `dist/` as its input and output directories,
and these adjustments ensure that Eleventy and Tailwind output their
content to consistent directories when running:

```shell-session
$ # Shell session 1
$ npx @11ty/eleventy --serve
```

```shell-session
$ # Shell session 2
$ npx tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch
```

Read on to see how Tailwind's CSS is used to
[add fonts](/fonts/)!
