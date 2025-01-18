const container = document.getElementById("root");
function createElement(type, props, ...children) {
  console.log("children", children);
  console.log("props", props);
  return {
    type,
    props: {
      ...props,
      children: children?.map(child => typeof child === "object" ? child : createTextNode(child))
    }
  };
}
function createTextNode(text) {
  console.log("text node -- ", text);
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
  console.log("dom node", domNode);
  console.log("Object keys", Object.keys(element));
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
MiniReactLibrary.createElement("div", {
  id: "foo"
}, MiniReactLibrary.createElement("a", {}, "Hello world"));

// /** @jsx MiniReactLibrary.createElement */
const element = MiniReactLibrary.createElement("div", {
  id: "foo"
}, MiniReactLibrary.createElement("a", null, "Hello world"));
MiniReactLibrary.render(element, container);