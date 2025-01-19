This repo teaches you how to build your own react

The question why should I build my own react?. The answer "Why not".

Overview
`React behind the screen is just creating and attaching NODES to the DOM. That is as simple as it's create.`

Let's create an H1 element with Vanilla JS and ReactJS

````let h1 = document.createElement("h1")
 h1.setAttributes("title", "Heading")
 h1.setAttributes("textContent", "Hello World")```

 ```let h1 = React.createElement("h1", {title:"Heading"}, "Hello World");```

How does rendering to the DOM happens
For JS - `document.body.appendChild(h1)`
For React - `ReactDOM.createRoot(document.getElementById("root")).render(h1)`

Rendering has evolved over the years with React. Pre React-18,rendering was this single, synchronous,uninterruptible tasks that happens on the main thread. What this means is that once rendering starts it can't be stopped.
The side effect is that if your rendering takes long the UI freeze until rendering finishes.

So what happens to high priority tasks like handling user's Input, or animation through the DOM.
You guessed right.

Picture the rendering function this way

````

    function rendering(element, container) {
    const domNode = document.createElement(element.type);
    element.props.children.forEach((child) => {
        rendering(child, domNode);
    });
    container.appendChild(domNode);

}

```

Yes. Recursion !!! (Developer nightmare).
The rendering will recurse until there isn't an element within the props.children.

So it's safe to say we have two rendering types in react which are:

1. Synchronous
2. Concurrent rendering

With concurrent rendering, React can work on multiple tasks simultaneously. So rendering move from this synchronous and un-interruptive update to breaking tasks into priority updates (Low and high priority tasks.)
High priority tasks like user interactions, animations are handle on the main thread, while low priority tasks can be deferred for later updates.

How concurrent?.

1. requestIdleCallback()
2. Fiber Reconciler.
```

Fiber is a plain javascript object. It have a one to relationship with an instance. It has a to/from pointer to it's parent, child and sibling nodes.
