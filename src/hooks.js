let React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initialValue) {
    let state = hooks[idx] || initialValue;
    const index = idx;
    let setState = (newValue) => (hooks[index] = newValue);
    idx++;
    return [state, setState];
  }
  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }

  function useEffect(callback, dependencyArray) {
    const oldDep = hooks[idx];
    let hasChanged = true;

    if (oldDep) {
      hasChanged = dependencyArray.some(
        (dep, index) => !Object.is(dep, oldDep[index])
      );
    }

    if (hasChanged) callback();
    hooks[idx] = dependencyArray;
    idx++;
  }
  return { useState, render, useEffect };
})();

function AppComponent() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(() => {
    console.log("Learn React");
  }, []);
  return {
    render: () => console.log({ count, text }),
    handleClick: () => setCount(5),
    type: (word) => setText(word),
  };
}

let App = React.render(AppComponent);
App.handleClick();
App = React.render(AppComponent);
App.type("Seun");
App = React.render(AppComponent);
