{
  /* <div className="parent">
  <div className="child">
    <h1>tag 1</h1>
    <h2>tag 2</h2>
  </div>
</div> */
}

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello from React"
);

const thisRender = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "tag 1"),
    React.createElement("h2", {}, "tag 2"),
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(thisRender);
