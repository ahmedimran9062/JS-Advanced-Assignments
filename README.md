# Things To Do

A simple, single-page to-do app with a Swiss-meets-neo-brutalist look. Add tasks with a title and an optional due date, then search, sort, filter, edit and tick them off. Everything is saved in your browser, so your list is still there when you come back.

Built with plain HTML, CSS and JavaScript. No frameworks or libraries.

## Features

- **Add tasks** with a title and an optional date. An empty title is blocked with an inline message.
- **Mark tasks as done.** Completed tasks are struck through and their Edit button is disabled.
- **Edit in place.** Edit turns the task row into inputs, with Save and Cancel.
- **Delete with confirmation.** The first click on Delete asks "Confirm?", and the second click removes the task. If you don't confirm, it resets after a few seconds.
- **Search** tasks by title as you type.
- **Sort** by newest or oldest added.
- **Filter** by All, Pending or Completed.
- **Live task count** that adapts to the active view, with friendly messages when the list is empty.
- **Light and dark theme** with a toggle button.
- **Saved automatically** using `localStorage`.
- **Responsive layout** that works from phones to desktops.
- **Staggered fade-in** on page load, which respects the reduced-motion setting.

## Built with

- **HTML:** semantic structure, with each task as a list item.
- **CSS:** custom properties (variables) for colours and theming, Grid and Flexbox layout, `rem` units, and `clamp()` for the fluid main heading.
- **JavaScript:** vanilla JS. The task list lives in one array, and every change redraws the list from it.
- **Fonts:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Space Mono](https://fonts.google.com/specimen/Space+Mono) from Google Fonts.

## Getting started

1. Clone or download this repository.
2. Open `index.html` in your browser.

No install or build step is needed.

## Project structure

```
├── index.html
├── style.css
└── script.js
```

## How it works

Each task is an object with an id, title, date, done status and creation time. Adding, editing, ticking or deleting a task changes the array, saves it to `localStorage`, and redraws the list. Search, filter and sort are applied together in one function each time the list is drawn.
