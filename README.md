This repo teaches you how to build your own react

The question why should I build my own react?. The answer "Why not".

Overview
`React behind the screen is just creating and attaching NODES to the DOM. That is as simple as it's create.`

````
    Let use JS to create an H1 element
    let h1 = document.createElement("h1")
    h1.setAttributes("title", "Heading")
    h1.setAttributes("textContent", "Hello World")

```
```
    let h1 = React.createElement("h1", {title:"Heading"}, "Hello World");
```

How does rendering to the DOM happens
For JS - ```document.body.appendChild(h1) ```
For React - ```ReactDOM.createRoot(document.getElementById("root")).render(h1) ```

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

Yes. I used recursion.
The rendering will recurse until there isn't an element with props.children.
