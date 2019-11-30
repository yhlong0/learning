import React from "react";

function Child(props) {
  console.log(props.name)
  return <h1>{props.name}</h1>
}

export default Child
