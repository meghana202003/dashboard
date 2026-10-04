import { createElement, render, useState } from "./myReact.js";


const h = createElement;

function Counter() {
  const [count, setCount] = useState(0);

  return h(
    "div",
    { className: "counter-card" },
    h("h2", null, "Custom useState()"),
    h("p", { className: "count" }, `Count: ${count}`),
    h(
      "div",
      { className: "button-row" },
      h(
        "button",
        { onClick: () => setCount(count - 1) },
        "−"
      ),
      h(
        "button",
        { onClick: () => setCount(0), className: "reset" },
        "Reset"
      ),
      h(
        "button",
        { onClick: () => setCount(count + 1) },
        "+"
      )
    )
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return h(
    "main",
    {
      className: darkMode ? "app dark" : "app"
    },
    h(
      "section",
      { className: "hero" },
      h("span", { className: "badge" }, "Built From Scratch"),
      h("h1", null, "My Tiny React"),
      h(
        "p",
        null,
        "A miniature React-like library implementing Virtual DOM, Components, Props, Events and useState."
      ),
      h(
        "button",
        {
          className: "theme-button",
          onClick: () => setDarkMode(value => !value)
        },
        darkMode ? "☀ Switch to Light" : "🌙 Switch to Dark"
      )
    ),
    h(Counter, null),
    h(
      "section",
      { className: "features" },
      h("h2", null, "What this project implements"),
      h(
        "ul",
        null,
        h("li", null, "createElement() → Virtual DOM objects"),
        h("li", null, "render() → Browser DOM creation"),
        h("li", null, "Function components"),
        h("li", null, "Props and nested children"),
        h("li", null, "Event listeners"),
        h("li", null, "Custom useState() hook")
      )
    )
  );
}

render(h(App, null), document.getElementById("root"));
