
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Child from './child'

function App() {
  const [title, setTitle] = useState("This is a title")

  return (
    <div className="App">
      <h1>{ title }</h1>
      <button onClick={() => setTitle("title changed")}>Change Name</button>
      <Child name="TT"></Child>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
