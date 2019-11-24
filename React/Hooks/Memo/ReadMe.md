After click button, parent title changed and child component also re-rendered, which is not necessary. since prop is not change.

```
import React from "react";

function Child(props) {
  console.log(props.name)
  return <h1>{props.name}</h1>
}

export default React.memo(Child)
``

Use React.memo wrap the child componet to avoid the re-render. 
