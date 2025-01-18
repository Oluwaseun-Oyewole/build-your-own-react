const container = document.getElementById("root");
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children?.map(child => typeof child === "object" ? child : createTextNode(child))
    }
  };
}
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
function render(element, container) {
  const domNode = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
  Object.keys(element.props).filter(key => key !== "children").forEach(name => {
    domNode[name] = element.props[name];
  });
  element.props.children.forEach(child => {
    render(child, domNode);
  });
  container.appendChild(domNode);
}
const MiniReactLibrary = {
  createElement,
  render
};

/** @jsx MiniReactLibrary.createElement */
const element = MiniReactLibrary.createElement("div", {
  id: "foo"
}, MiniReactLibrary.createElement("a", null, "Hello world"), MiniReactLibrary.createElement("h1", null, "Testing the new react feature"));
MiniReactLibrary.render(element, container);