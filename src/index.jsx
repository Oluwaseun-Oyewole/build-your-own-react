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

// function render(element, container) {
//   const domNode =
//     element.type === "TEXT_ELEMENT"
//       ? document.createTextNode("")
//       : document.createElement(element.type);

//   Object.keys(element.props)
//     .filter((key) => key !== "children")
//     .forEach((name) => {
//       domNode[name] = element.props[name];
//     });

//   element.props.children.forEach((child) => {
//     render(child, domNode);
//   });

//   container.appendChild(domNode);
// }

let nextUnitOfWork = null;
let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performNextUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

function createDom() {}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

requestIdleCallback(workLoop);

function performNextUnitOfWork(fiber) {
  //  let's create a new node and append it to the DOM
  // We keep track of the DOM node in the fiber.dom property.
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // for each node we create a new fibre
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // And we add it to the fiber tree setting it either as a child or as a sibling,
    // depending on whether it’s the first child or not.

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  if (fiber.child) {
    return fiber.child;
  }

  // Finally we search for the next unit of work. We first try with the child, then with the sibling,
  // then with the uncle, and so on.

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const MiniReactLibrary = { createElement, render };

/** @jsx MiniReactLibrary.createElement */
const element = (
  <div id="foo">
    <a>Hello world</a>
    <h1>Testing the new react feature</h1>
  </div>
);

MiniReactLibrary.render(element, container);
