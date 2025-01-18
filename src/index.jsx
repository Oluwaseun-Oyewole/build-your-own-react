const container = document.getElementById("root");
let h1 = document.createElement("h1");
h1.setAttribute("title", "");
h1.textContent = "";

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children?.map((child) =>
        typeof child === "object" ? child : createTextNode(child)
      ),
    },
  };
}
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const domNode =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      domNode[name] = element.props[name];
    });

  element.props.children.forEach((child) => {
    render(child, domNode);
  });

  container.appendChild(domNode);
}

let nextUnitOfWork = null;

function workLoop(deadline) {}

const MiniReactLibrary = { createElement, render };

/** @jsx MiniReactLibrary.createElement */
const element = (
  <div id="foo">
    <a>Hello world</a>
    <h1>Testing the new react feature</h1>
  </div>
);

MiniReactLibrary.render(element, container);
